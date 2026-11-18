// src/components/Navbar.tsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu as MenuIcon, Plus } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { viewMode, setViewMode, setIsMenuOpen } = useViewMode();
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);


  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const isHome = location.pathname === '/';

  return (
    <>
      {/* Línea ultrafina superior de lectura */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[1100] origin-left opacity-90"
        style={{ scaleX }}
      />

      {/* Header fijo Plasticbionic Style */}
      <header className="fixed top-0 left-0 w-full h-[4.375rem] z-[1000] text-white pointer-events-none">
        {/* Fondo sutil con blur en scroll */}
        <div className="absolute inset-0 bg-[#090A0F]/80 backdrop-blur-md pointer-events-auto" />

        {/* Línea horizontal divisoria idéntica a Plasticbionic */}
        <div className="Line pointer-events-auto" />

        <div className="relative w-full h-full px-6 sm:px-10 flex items-center justify-between pointer-events-auto">
          
          {/* LOGO TIPOGRÁFICO PLASTICBIONIC STYLE */}
          <NavLink
            to="/"
            className="flex items-center gap-3 no-underline group"
            data-cursor="HOME"
          >
            <div className="font-display text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-white group-hover:text-stone-300 transition-colors">
              ALIENACIÓN<span className="text-cyan-400">.</span>SYS
            </div>
            <span className="hidden lg:inline-block font-mono-system text-[10px] text-stone-500 uppercase tracking-widest pl-2 border-l border-white/20">
              Creative Direction
            </span>
          </NavLink>

          {/* SELECTOR INTERACTIVO 'CHANGE VIEW +' (PLASTICBIONIC SIGNATURE) */}
          {isHome ? (
            <div className="relative hidden md:flex items-center">
              <button
                onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
                className="flex items-center gap-2 font-body text-xs sm:text-sm tracking-wide text-stone-300 hover:text-white px-3 py-1.5 rounded transition-colors cursor-pointer group"
                data-cursor="VIEW"
              >
                <span className="font-mono-system text-[11px] text-stone-400 group-hover:text-white">
                  Change view
                </span>
                <Plus
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    viewDropdownOpen ? 'rotate-45 text-white' : 'text-stone-400'
                  }`}
                />
              </button>

              {/* Selector de vistas: Fullscreen | Grid | List */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 flex items-center p-1 rounded-full bg-[#13161F]/90 backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 ${
                  viewDropdownOpen
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {(['fullscreen', 'grid', 'list'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setViewMode(mode);
                      setViewDropdownOpen(false);
                    }}
                    className={`px-3 py-1 text-xs font-mono-system tracking-wider uppercase rounded-full transition-all cursor-pointer ${
                      viewMode === mode
                        ? 'bg-white text-black font-semibold shadow-sm'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center font-mono-system text-[11px] uppercase tracking-widest text-stone-400">
              <span>Ensayo Filosófico Multimedia</span>
            </div>
          )}

          {/* NAVEGACIÓN DERECHA CON UNDERLINES ANIMADOS */}
          <nav className="flex items-center gap-6 sm:gap-8 font-body text-xs sm:text-sm text-stone-300">
            <NavLink
              to="/realidad-material"
              className={({ isActive }) =>
                `hidden sm:inline-block Underline --hover tracking-wide ${
                  isActive ? 'text-white font-semibold' : 'text-stone-400 hover:text-white'
                }`
              }
              data-cursor="01"
            >
              Realidad
            </NavLink>

            <NavLink
              to="/cuerpo-humano"
              className={({ isActive }) =>
                `hidden sm:inline-block Underline --hover tracking-wide ${
                  isActive ? 'text-white font-semibold' : 'text-stone-400 hover:text-white'
                }`
              }
              data-cursor="02"
            >
              Cuerpo
            </NavLink>

            <NavLink
              to="/integrantes"
              className={({ isActive }) =>
                `hidden sm:inline-block Underline --hover tracking-wide ${
                  isActive ? 'text-white font-semibold' : 'text-stone-400 hover:text-white'
                }`
              }
              data-cursor="03"
            >
              Autoría
            </NavLink>

            {/* Botón Menu idéntico a Plasticbionic */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 text-xs uppercase font-mono-system tracking-wider text-white hover:text-stone-300 cursor-pointer pl-2"
              data-cursor="OPEN"
            >
              <span className="hidden xs:inline-block">Menu</span>
              <MenuIcon className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};
