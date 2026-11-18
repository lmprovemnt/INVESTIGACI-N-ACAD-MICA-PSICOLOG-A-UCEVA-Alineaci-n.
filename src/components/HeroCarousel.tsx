// src/components/HeroCarousel.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight, Pause, Play, Sparkles } from 'lucide-react';
import type { SlideItem } from '../data/content';


interface HeroCarouselProps {
  slides: SlideItem[];
  autoPlayInterval?: number;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  autoPlayInterval = 6500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const currentSlide = slides[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slides.length - 1;
      if (next >= slides.length) next = 0;
      return next;
    });
    setProgress(0);
  };

  const jumpToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = 50;
    const step = (interval / autoPlayInterval) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          paginate(1);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [currentIndex, isPaused, autoPlayInterval]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.45 },
        scale: { duration: 0.45 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.94,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 28 },
        opacity: { duration: 0.35 },
      },
    }),
  };


  return (
    <div
      className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Contenedor de Slide con Drag */}
      <div className="relative min-h-[520px] md:min-h-[580px] w-full flex items-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) {
                paginate(1);
              } else if (info.offset.x > 60) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing flex flex-col justify-end p-6 sm:p-10 md:p-14"
          >
            {/* Imagen de fondo con efecto Ken Burns cinético */}
            <motion.div
              initial={{ scale: 1.05, filter: 'brightness(0.65)' }}
              animate={{
                scale: 1.15,
                filter: 'brightness(0.55)',
                transition: { duration: 8, ease: 'easeOut' },
              }}
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
            />

            {/* Degradado cinematográfico multidireccional */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/70 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F]/90 via-[#090A0F]/40 to-transparent pointer-events-none" />

            {/* Contenido curatorial sobre la imagen */}
            <div className="relative z-10 max-w-2xl text-left space-y-4">
              {/* Etiqueta y Badge de categoría */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono-system tracking-wider uppercase bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  {currentSlide.tag}
                </span>
                <span className="text-white/40 font-mono-system text-xs">
                  {currentIndex + 1} / {slides.length}
                </span>
              </div>

              {/* Título de la diapositiva */}
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                {currentSlide.title}
              </h3>

              {/* Subtítulo conceptual */}
              <p className="font-editorial italic text-2xl sm:text-3xl text-stone-200 font-normal">
                «{currentSlide.subtitle}»
              </p>


              {/* Descripción breve */}
              <p className="text-stone-300/90 text-sm sm:text-base font-body leading-relaxed max-w-xl">
                {currentSlide.description}
              </p>

              {/* Cita reflexiva si está presente */}
              {currentSlide.quote && (
                <div className="pt-2 pl-3 border-l-2 border-cyan-400/40 text-xs sm:text-sm text-cyan-200/80 italic font-editorial">
                  «{currentSlide.quote}» —{' '}
                  <span className="not-italic text-stone-400 font-mono-system text-[11px]">
                    {currentSlide.authorQuote}
                  </span>
                </div>
              )}

              {/* Botón de exploración directa */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(currentSlide.routeTarget);
                  }}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#090A0F] bg-white hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] cursor-pointer"
                >
                  <span>Explorar este eje</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <div className="hidden sm:flex items-center gap-2 text-white/50 text-xs font-mono-system">
                  <span>Arrastra para navegar</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Barra de progreso inferior y controles */}
      <div className="relative z-20 px-6 sm:px-10 py-4 bg-[#090A0F]/90 backdrop-blur-md border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Indicadores lineales interactivos */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-md">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => jumpToSlide(idx)}
              className="group flex-1 py-2 text-left cursor-pointer focus:outline-none"
              aria-label={`Ir a diapositiva ${idx + 1}`}
            >
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                {idx === currentIndex ? (
                  <motion.div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                ) : (
                  <div
                    className={`h-full transition-colors ${
                      idx < currentIndex ? 'bg-white/40' : 'bg-transparent group-hover:bg-white/20'
                    }`}
                  />
                )}
              </div>
              <span className="hidden sm:block text-[10px] font-mono-system text-white/50 mt-1 truncate group-hover:text-white/80 transition-colors">
                {slide.tag}
              </span>

            </button>
          ))}
        </div>

        {/* Botones de navegación prev/next y play/pause */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
            className="p-2 rounded-full text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => paginate(-1)}
            aria-label="Diapositiva anterior"
            className="p-2 rounded-full text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => paginate(1)}
            aria-label="Siguiente diapositiva"
            className="p-2 rounded-full text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
