// src/components/FullscreenMenu.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';
import { siteConfig } from '../data/content';

export const FullscreenMenu: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useViewMode();

  const menuLinks = [
    { path: '/', label: 'Portada', sub: 'Inicio // Perspectivas' },
    { path: '/realidad-material', label: 'Realidad Material', sub: 'Eje I // Desconexión Tangible' },
    { path: '/cuerpo-humano', label: 'El Cuerpo Humano', sub: 'Eje II // Salud Mental y Soledad' },
    { path: '/integrantes', label: 'Autoras de la Investigación', sub: 'Psicología // UCEVA' },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[1500] bg-[#07080B] text-white flex flex-col justify-between p-6 sm:p-12 md:p-16"
        >
          {/* Header dentro del menú con botón cerrar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-mono-system tracking-widest text-xs uppercase text-stone-400">
              NAVEGACIÓN // {siteConfig.institution}
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-mono-system text-stone-300 hover:text-white transition-colors cursor-pointer group"
            >
              <span>Cerrar</span>
              <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            </button>
          </div>

          {/* Links al centro */}
          <div className="my-auto py-8 space-y-4 sm:space-y-6">
            {menuLinks.map((link, idx) => (
              <div key={link.path} className="overflow-hidden">
                <NavLink
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 text-left no-underline"
                >
                  <span className="font-mono-system text-xs text-stone-500">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-white group-hover:text-stone-300 transition-colors title-bar-wrap">
                    {link.label}
                  </span>
                  <span className="font-mono-system text-xs uppercase tracking-wider text-stone-500 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                    {link.sub}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </NavLink>
              </div>
            ))}
          </div>

          {/* Footer del Menú */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10 font-mono-system text-xs text-stone-400">
            <div>
              {siteConfig.institution} • {siteConfig.program}
            </div>
            <div className="flex items-center gap-6">
              <span>Alineación Tecnológica // 2026</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
