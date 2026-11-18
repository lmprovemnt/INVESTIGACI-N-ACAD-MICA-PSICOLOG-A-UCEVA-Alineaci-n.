// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu as MenuIcon, Maximize2, Grid, List, Compass, Layers, Activity, User } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { viewMode, setViewMode, setIsMenuOpen } = useViewMode();
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);

  // Línea vertical que mide el progreso de lectura
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });


  const navLinks = [
    { path: '/', label: 'Portada', code: '00', icon: Compass },
    { path: '/realidad-material', label: 'Realidad Material', code: '01', icon: Layers },
    { path: '/cuerpo-humano', label: 'Cuerpo Humano', code: '02', icon: Activity },
    { path: '/integrantes', label: 'Autoría & Studio', code: '03', icon: User },
  ];

  return (
    <>
      {/* SIDEBAR FIJA A LA IZQUIERDA */}
      <aside
        aria-label="Barra lateral de navegación"
        className="fixed top-0 bottom-0 left-0 w-16 sm:w-20 md:w-24 z-[1000] bg-[#07080B]/90 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between items-center py-5 sm:py-7 select-none"
      >
        {/* Línea vertical de progreso de lectura en el borde exterior derecho */}
        <motion.div
          className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-cyan-400 via-white to-rose-500 origin-top z-10"
          style={{ height: '100%', scaleY }}
        />

        {/* 1. TOP: LOGO TIPOGRÁFICO VERTICAL */}
        <div className="flex flex-col items-center gap-3">
          <NavLink
            to="/"
            className="group flex flex-col items-center gap-1.5 no-underline"
            data-cursor="HOME"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center text-white group-hover:border-cyan-400 transition-colors shadow-sm">
              <span className="font-display font-black text-xs tracking-tighter">ALN</span>
            </div>
            <span className="font-mono-system text-[9px] uppercase tracking-widest text-stone-400 group-hover:text-cyan-300 transition-colors hidden sm:block">
              .SYS
            </span>
          </NavLink>
        </div>

        {/* 2. CENTER: RUTAS Y EL SELECTOR DE LAS 3 BARRAS */}
        <div className="flex flex-col items-center gap-6 my-auto">
          
          {/* BOTÓN DE LAS 3 BARRAS / 3 VISTAS (SOLICITADO ESPECÍFICAMENTE POR EL USUARIO) */}
          <div className="relative">
            <button
              onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
              className="group relative p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white transition-all cursor-pointer flex flex-col items-center justify-center gap-1"
              data-cursor="VIEWS"
              title="Selector de vistas: Fullscreen | Grid | List"
            >
              {/* Icono de las 3 barras animadas */}
              <div className="flex flex-col gap-1 w-4 sm:w-5">
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    viewMode === 'fullscreen' ? 'w-full bg-cyan-400' : 'w-full bg-white/70'
                  }`}
                />
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    viewMode === 'grid' ? 'w-3/4 bg-cyan-400' : 'w-full bg-white/70'
                  }`}
                />
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    viewMode === 'list' ? 'w-1/2 bg-cyan-400' : 'w-full bg-white/70'
                  }`}
                />
              </div>

              <span className="text-[8px] font-mono-system uppercase tracking-widest text-stone-400 mt-1 hidden sm:block">
                3 Views
              </span>
            </button>

            {/* Flyout flotante con las 3 opciones hacia la derecha */}
            {viewDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                className="absolute left-full top-1/2 -translate-y-1/2 ml-4 p-2 rounded-2xl bg-[#11131A]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-1 min-w-[170px] z-50 text-left"
              >
                <div className="px-3 py-1.5 border-b border-white/10 text-[9px] font-mono-system uppercase tracking-widest text-stone-400 flex items-center justify-between">
                  <span>Perspectiva</span>
                  <span className="text-cyan-400 font-bold">Visual</span>
                </div>


                <button
                  onClick={() => {
                    setViewMode('fullscreen');
                    setViewDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono-system transition-colors cursor-pointer ${
                    viewMode === 'fullscreen'
                      ? 'bg-white text-black font-semibold'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>1. Fullscreen</span>
                </button>

                <button
                  onClick={() => {
                    setViewMode('grid');
                    setViewDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono-system transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-black font-semibold'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>2. Grid View</span>
                </button>

                <button
                  onClick={() => {
                    setViewMode('list');
                    setViewDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono-system transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white text-black font-semibold'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>3. List View</span>
                </button>
              </motion.div>
            )}
          </div>

          <div className="w-6 h-[1px] bg-white/10" />

          {/* LISTADO DE RUTAS VERTICALES CON TOOLTIP */}
          <nav className="flex flex-col items-center gap-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;

              return (
                <div key={link.path} className="relative group/nav">
                  <NavLink
                    to={link.path}
                    className={`relative p-2.5 sm:p-3 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/15 border border-white/25 shadow-lg'
                        : 'text-stone-400 hover:text-white hover:bg-white/5'
                    }`}
                    data-cursor={link.code}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-sidebar-pill"
                        className="absolute inset-0 rounded-xl bg-cyan-500/20 border border-cyan-400/40"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}

                    <div className="relative z-10 flex flex-col items-center gap-0.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-stone-400'}`} />
                      <span className="font-mono-system text-[9px] font-semibold">{link.code}</span>
                    </div>
                  </NavLink>

                  {/* Tooltip flotante a la derecha en hover */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-[#11131A] border border-white/15 text-xs font-mono-system text-white shadow-xl opacity-0 translate-x-1 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50">
                    {link.label}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* 3. BOTTOM: BOTÓN MENU OVERLAY (PLASTICBIONIC) */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white transition-all cursor-pointer flex flex-col items-center gap-1"
            data-cursor="MENU"
            title="Abrir Menú Editorial Fullscreen"
          >
            <MenuIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-mono-system text-[8px] uppercase tracking-wider text-stone-400">
              Menu
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
