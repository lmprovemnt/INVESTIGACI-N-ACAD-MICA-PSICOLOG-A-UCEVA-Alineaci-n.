// src/pages/Home.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { HeroCarousel } from '../components/HeroCarousel';
import { useViewMode } from '../context/ViewModeContext';
import { siteConfig, heroCarouselSlides } from '../data/content';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { viewMode, setViewMode } = useViewMode();
  const [hoveredProjectImage, setHoveredProjectImage] = useState<string | null>(null);

  // Proyectos / Ejes representados con las imágenes suministradas por el usuario
  const projects = [
    {
      id: 'proj-1',
      number: '01',
      title: 'La Jaula Óptica',
      subtitle: 'Confinamiento de la mirada en el haz lumínico',
      categories: ['Desconexión Tangible', 'Hiperrealidad', 'Eje I'],
      route: '/realidad-material',
      bgColor: '#0a0c12',
      imageUrl: '/images/alienacion-jaula.jpg',
    },
    {
      id: 'proj-2',
      number: '02',
      title: 'El Cuerpo Tras el Cristal',
      subtitle: 'Manos y silueta que no encuentran volumen vivo',
      categories: ['Atrofia Propioceptiva', 'Anestesia Motriz', 'Eje II'],
      route: '/cuerpo-humano',
      bgColor: '#141218',
      imageUrl: '/images/silueta-vidrio.jpg',
    },
    {
      id: 'proj-3',
      number: '03',
      title: 'Circuito y Aislamiento',
      subtitle: 'Miles de conexiones invisibles frente a la soledad física',
      categories: ['Simulacro', 'Topología', 'Investigación'],
      route: '/realidad-material',
      bgColor: '#090e18',
      imageUrl: '/images/circuito-presencia.jpg',
    },
    {
      id: 'proj-4',
      number: '04',
      title: 'El Huésped Sintético',
      subtitle: 'La convivencia muda con la máquina antropomórfica',
      categories: ['Autoría', 'Epistemología', 'Ficha Técnica'],
      route: '/integrantes',
      bgColor: '#0d1017',
      imageUrl: '/images/humano-androide.jpg',
    },
  ];

  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-[#07080B] text-white">
        
        {/* HERO EDITORIAL HEADER MINIMALISTA */}
        <section className="pt-8 sm:pt-16 md:pt-24 lg:pt-28 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto pb-10 sm:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-b border-white/10">
          <div className="space-y-3 sm:space-y-4 max-w-3xl">
            <span className="font-mono-system text-[10px] sm:text-[11px] uppercase tracking-widest text-cyan-400">
              INVESTIGACIÓN ACADÉMICA // PSICOLOGÍA UCEVA
            </span>
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-tight sm:leading-none break-words">
              Alineación<span className="text-cyan-400">.</span>
            </h1>

            <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-stone-300 font-light max-w-2xl leading-relaxed">
              «{siteConfig.subtitle}»
            </p>
          </div>

          {/* Selector de Vistas visible en móvil */}
          <div className="flex md:hidden items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 self-start">
            {(['fullscreen', 'grid', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-[10px] font-mono-system tracking-wider uppercase rounded-full ${
                  viewMode === mode ? 'bg-white text-black font-semibold' : 'text-stone-400'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="hidden lg:block text-right font-mono-system text-xs text-stone-400 space-y-1">
            <div>Perspectiva activa: <span className="uppercase text-white font-semibold">{viewMode}</span></div>
            <div className="text-[11px] text-stone-500">Alterna con el selector de 3 barras a la izquierda</div>
          </div>
        </section>

        {/* 1. MODO FULLSCREEN (SECCIONES MASIVAS 100VH) */}
        {viewMode === 'fullscreen' && (
          <div className="w-full">
            {projects.map((proj) => (
              <section
                key={proj.id}
                data-section
                data-cursor="EXPLORE"
                onClick={() => navigate(proj.route)}
                className="group relative w-full h-screen min-h-[620px] overflow-hidden flex items-center justify-center cursor-pointer select-none"
                style={{ backgroundColor: proj.bgColor }}
              >
                {/* Imagen de fondo con Parallax y filtro */}
                <div className="absolute inset-0 w-full h-full">
                  <motion.img
                    src={proj.imageUrl}
                    alt={proj.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1] group-hover:brightness-[0.75] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-[#07080B]/60" />
                </div>

                {/* Título gigante central con hover underline grueso */}
                <div className="relative z-10 text-center px-6 max-w-5xl space-y-3">
                  <div className="font-mono-system text-[11px] sm:text-xs md:text-sm text-cyan-300 tracking-widest uppercase mb-2">
                    {proj.number} // {proj.subtitle}
                  </div>

                  <h2 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight leading-tight sm:leading-none">
                    <span className="title-bar-wrap">
                      {proj.title}
                    </span>
                  </h2>

                  {/* Etiqueta revelada al hover idéntica a Plasticbionic */}
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-500 pt-3 flex flex-wrap justify-center gap-2">
                    {proj.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono-system uppercase tracking-wider text-stone-300 px-2.5 py-0.5 rounded bg-black/50 backdrop-blur-sm border border-white/10"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Indicador inferior de acceso */}
                <div className="absolute bottom-10 right-10 z-10 hidden sm:flex items-center gap-2 font-mono-system text-xs text-stone-400 group-hover:text-white transition-colors">
                  <span>Acceder a este eje</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </section>
            ))}
          </div>
        )}

        {/* 2. MODO GRID (CUADRÍCULA EDITORIAL CON LAS NUEVAS IMÁGENES) */}
        {viewMode === 'grid' && (
          <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <motion.div
                key={proj.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                onClick={() => navigate(proj.route)}
                className="group cursor-pointer space-y-4"
                data-cursor="VIEW"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden plastic-border bg-stone-900">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover filter brightness-80 group-hover:scale-105 group-hover:brightness-95 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 font-mono-system text-xs bg-black/70 px-3 py-1 rounded backdrop-blur-md">
                    {proj.number}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-2xl sm:text-3xl text-white font-bold group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="font-body text-xs text-stone-400">{proj.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 3. MODO LIST (LISTA CON PREVIEW FLOTANTE) */}
        {viewMode === 'list' && (
          <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16">
            <div className="border-t border-white/10">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => navigate(proj.route)}
                  onMouseEnter={() => setHoveredProjectImage(proj.imageUrl)}
                  onMouseLeave={() => setHoveredProjectImage(null)}
                  className="group py-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors hover:bg-white/[0.02] px-4"
                  data-cursor="READ"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono-system text-xs text-stone-500">
                      {proj.number}
                    </span>
                    <h3 className="font-display text-3xl sm:text-5xl text-white font-bold group-hover:text-stone-300 transition-colors title-bar-wrap">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="font-body text-sm text-stone-400 group-hover:text-white transition-colors">
                      {proj.subtitle}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-stone-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {/* Previsualización flotante para List View */}
            <AnimatePresence>
              {hoveredProjectImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed bottom-12 right-12 z-40 w-80 h-52 rounded-xl overflow-hidden plastic-border shadow-2xl pointer-events-none hidden lg:block"
                >
                  <img
                    src={hoveredProjectImage}
                    alt="Preview"
                    className="w-full h-full object-cover filter brightness-90"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* CARRUSEL CURATORIAL INTERACTIVO */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 py-24 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-10">
            <div>
              <span className="font-mono-system text-xs uppercase tracking-widest text-cyan-400">
                Curaduría Conceptual
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-white font-bold mt-1">
                Fragmentos de la Disolución
              </h2>
            </div>
            <p className="font-mono-system text-xs text-stone-400 max-w-sm">
              Navega las diapositivas para una síntesis visual y táctil de las 4 imágenes de investigación.
            </p>
          </div>

          <HeroCarousel slides={heroCarouselSlides} autoPlayInterval={6500} />
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-white/10 py-12 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono-system text-xs text-stone-400">
          <div>
            Alineación Tecnológica // Facultad de Psicología • UCEVA
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/realidad-material');
              }}
              className="Underline --hover text-white cursor-pointer"
            >
              01. Realidad Material →
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/cuerpo-humano');
              }}
              className="Underline --hover text-white cursor-pointer"
            >
              02. El Cuerpo Humano →
            </button>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};
