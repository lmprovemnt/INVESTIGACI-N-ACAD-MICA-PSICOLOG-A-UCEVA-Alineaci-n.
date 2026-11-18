// src/components/BeforeAfterSlider.tsx
import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal, Feather, Cpu } from 'lucide-react';
import type { ComparisonItem } from '../data/content';



interface BeforeAfterSliderProps {
  comparison: ComparisonItem;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ comparison }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full my-12 space-y-6">
      {/* Encabezado conceptual del interactivo */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <span className="font-mono-system text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            Laboratorio Fenomenológico // Contraste Táctil
          </span>
          <h4 className="font-editorial text-2xl sm:text-3xl text-white mt-1">
            {comparison.title}
          </h4>
        </div>
        <div className="text-stone-400 text-xs font-mono-system flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <MoveHorizontal className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Arrastra el divisor central para comparar</span>
        </div>
      </div>

      {/* Contenedor del Slider */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative h-[480px] sm:h-[540px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/15 shadow-2xl bg-[#090A0F]"
      >
        {/* Capa B: Hiperrealidad Digital (Lado Derecho / Fondo base) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={comparison.digitalDimension.imageUrl}
            alt={comparison.digitalDimension.title}
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-[#090A0F]/60" />
          <div className="absolute inset-0 bg-cyan-950/20" />

          {/* Tarjeta de información lado derecho (Digital) */}
          <div className="absolute bottom-6 right-6 max-w-xs sm:max-w-sm text-right p-5 rounded-xl glass-panel border border-cyan-500/30 shadow-lg pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-system tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 mb-2">
              <Cpu className="w-3 h-3 text-cyan-400" />
              {comparison.digitalDimension.label}
            </span>
            <h5 className="font-editorial text-xl text-white font-medium">
              {comparison.digitalDimension.title}
            </h5>
            <p className="text-xs text-stone-300 font-body mt-1 leading-relaxed">
              {comparison.digitalDimension.description}
            </p>
            <div className="mt-3 flex flex-wrap justify-end gap-1.5">
              {comparison.digitalDimension.sensoryTraits.map((trait, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono-system px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-200 border border-cyan-700/50"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Capa A: Realidad Material Tangible (Lado Izquierdo con clipPath / ancho relativo) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="absolute inset-0 h-full"
            style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
          >
            <img
              src={comparison.physicalDimension.imageUrl}
              alt={comparison.physicalDimension.title}
              className="w-full h-full object-cover filter brightness-[0.85] sepia-[0.25]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1817] via-transparent to-[#1A1817]/60" />
            <div className="absolute inset-0 bg-[#EAE3D9]/10" />

            {/* Tarjeta de información lado izquierdo (Físico) */}
            <div className="absolute bottom-6 left-6 max-w-xs sm:max-w-sm text-left p-5 rounded-xl bg-[#1A1817]/85 backdrop-blur-md border border-orange-500/30 shadow-lg pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-system tracking-wider uppercase bg-[#D95338]/20 text-orange-200 border border-orange-500/40 mb-2">
                <Feather className="w-3 h-3 text-orange-400" />
                {comparison.physicalDimension.label}
              </span>
              <h5 className="font-editorial text-xl text-[#EAE3D9] font-medium">
                {comparison.physicalDimension.title}
              </h5>
              <p className="text-xs text-stone-300 font-body mt-1 leading-relaxed">
                {comparison.physicalDimension.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {comparison.physicalDimension.sensoryTraits.map((trait, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono-system px-2 py-0.5 rounded bg-orange-950/60 text-orange-200 border border-orange-700/50"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divisor vertical arrastrable (Handle) */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Manija central flotante */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#090A0F] shadow-[0_0_20px_rgba(255,255,255,0.7)] flex items-center justify-center border-2 border-[#090A0F]">
            <MoveHorizontal className="w-5 h-5 text-[#090A0F]" />
          </div>

          {/* Líneas sutiles de extensión */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_orange]" />
        </div>
      </div>
    </div>
  );
};
