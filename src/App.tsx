// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from './components/SmoothScroll';
import { Sidebar } from './components/Sidebar';
import { ScrollToTop } from './components/ScrollToTop';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { FullscreenMenu } from './components/FullscreenMenu';
import { ViewModeProvider } from './context/ViewModeContext';
import { Home } from './pages/Home';
import { MaterialReality } from './pages/MaterialReality';
import { HumanBody } from './pages/HumanBody';
import { Authors } from './pages/Authors';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/realidad-material" element={<MaterialReality />} />
        <Route path="/cuerpo-humano" element={<HumanBody />} />
        <Route path="/integrantes" element={<Authors />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <ViewModeProvider>
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <ScrollToTop />
          <div className="relative min-h-screen bg-[#07080B] text-[#F0ECE4] flex flex-col selection:bg-white selection:text-black">
            {/* Sidebar fija a la izquierda */}
            <Sidebar />
            <FullscreenMenu />

            {/* Contenedor principal con paddings dinámicos para móvil y escritorio */}
            <div className="w-full pt-14 pb-20 md:pt-0 md:pb-0 md:pl-20 lg:pl-24 transition-all duration-300 min-h-screen">
              <AnimatedRoutes />
            </div>
          </div>
        </SmoothScroll>
      </ViewModeProvider>
    </BrowserRouter>
  );
}

export default App;
