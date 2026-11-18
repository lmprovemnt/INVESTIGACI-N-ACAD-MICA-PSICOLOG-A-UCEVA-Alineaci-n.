// src/pages/HumanBody.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, BookOpen, ArrowRight, User } from 'lucide-react';

import { PageTransition } from '../components/PageTransition';
import { EditorialSection } from '../components/EditorialSection';
import { humanBodyContent } from '../data/content';

export const HumanBody: React.FC = () => {
  const navigate = useNavigate();
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  // Transición cromática vinculada al scroll
  const { scrollYProgress } = useScroll({
    target: pageContainerRef,
    offset: ['start start', 'end end'],
  });

  // Mutación progresiva del fondo: frialdad sintética (#07080B) -> calidez corpórea (#EAE3D9)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.75, 1],
    ['#07080B', '#151218', '#DBD2C4', '#EAE3D9']
  );

  // Mutación del color del texto: claro (#F0ECE4) -> carbón orgánico (#141312)
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.75, 1],
    ['#F0ECE4', '#F0ECE4', '#262220', '#141312']
  );

  return (
    <PageTransition>
      <motion.div
        ref={pageContainerRef}
        style={{ backgroundColor, color: textColor }}
        className="relative w-full min-h-screen transition-colors duration-200 overflow-hidden"
      >
        {/* ENCABEZADO EDITORIAL (02 // EL CUERPO HUMANO) */}
        <header className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center px-4 sm:px-8 md:px-12 pt-24 pb-16 text-center overflow-hidden">
          {/* Fondo sutil con la silueta tras el vidrio */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-40 pointer-events-none"
            style={{ backgroundImage: `url(${humanBodyContent.header.featuredImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080B]/80 via-[#07080B]/70 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-system tracking-widest uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30">
              <Activity className="w-3.5 h-3.5 text-rose-400" />
              <span>{humanBodyContent.header.badge}</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-white">
              {humanBodyContent.header.title}
            </h1>

            <p className="font-editorial italic text-2xl sm:text-3xl text-stone-200 font-normal max-w-2xl mx-auto leading-relaxed">
              «{humanBodyContent.header.subtitle}»
            </p>

            <p className="text-sm sm:text-base font-body text-stone-300 max-w-xl mx-auto leading-relaxed pt-2">
              {humanBodyContent.header.abstract}
            </p>

            <div className="pt-4 flex items-center justify-center gap-2 font-mono-system text-xs opacity-75">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>La atmósfera visual mutará cromáticamente conforme avances hacia las conclusiones</span>
            </div>
          </div>
        </header>

        {/* CONTENEDOR PRINCIPAL DE LECTURA */}
        <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-28">
          
          {/* BLOQUE NARRATIVO 1: DESARROLLO EJE 2 (ANESTESIA PROPIOCEPTIVA + SILUETA VIDRIO) */}
          <EditorialSection
            section={humanBodyContent.deepDiveSection}
            accentColor="terracotta"
          />

          {/* BLOQUE NARRATIVO 2: ANÁLISIS CRÍTICO (SELF CUANTIFICADO + HUMANO & ANDROIDE) */}
          <EditorialSection
            section={humanBodyContent.criticalAnalysisSection}
            accentColor="terracotta"
          />

          {/* BLOQUE NARRATIVO 3: CONCLUSIONES (RECLAMAR LA GRAVEDAD Y EL PULSO VIVO) */}
          <EditorialSection
            section={humanBodyContent.conclusionsSection}
            accentColor="terracotta"
            isWarmMode={true}
          />

          {/* SECCIÓN LIMPIA: REFERENCIAS BIBLIOGRÁFICAS */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-20 p-8 sm:p-12 rounded-3xl bg-white/50 backdrop-blur-md border border-stone-400/30 text-[#141312] shadow-xl space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#141312]/15 pb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#E24A2B]" />
                <div>
                  <span className="font-mono-system text-xs uppercase tracking-widest text-[#E24A2B] font-semibold">
                    Aparato Crítico & Documentación
                  </span>
                  <h3 className="font-display text-3xl font-bold text-[#141312]">
                    Referencias Bibliográficas
                  </h3>
                </div>
              </div>
              <div className="font-mono-system text-xs text-stone-600">
                Programa de Psicología • UCEVA
              </div>
            </div>

            {/* Listado limpio de referencias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {humanBodyContent.references.map((ref, idx) => (
                <div
                  key={ref.id}
                  className="p-5 rounded-xl bg-white/80 border border-stone-300/70 hover:border-[#E24A2B]/50 transition-colors space-y-1.5 text-left flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono-system text-stone-600">
                      <span>[{idx + 1}] {ref.author} ({ref.year})</span>
                      <span className="uppercase text-[10px] px-2 py-0.5 rounded bg-stone-200 font-semibold text-stone-800">
                        {ref.type}
                      </span>
                    </div>
                    <h4 className="font-editorial text-2xl italic text-[#141312] font-normal leading-tight">
                      {ref.title}
                    </h4>
                    <p className="font-body text-xs text-stone-700">
                      {ref.source}
                    </p>
                  </div>
                  {ref.link && (
                    <div className="pt-2">
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono-system text-[#E24A2B] hover:underline"
                      >
                        <span>Consultar fuente externa</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </motion.section>

          {/* NAVEGACIÓN HACIA LA FICHA DE INTEGRANTES / AUTORÍA */}
          <div className="mt-20 text-center space-y-4">
            <h4 className="font-display text-2xl text-stone-800 font-bold">
              Conclusión del Ensayo Interactivo
            </h4>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/integrantes');
              }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-[#141312] hover:bg-[#E24A2B] transition-all duration-300 shadow-xl cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Conoce la Autoría del Sitio Web</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </main>
      </motion.div>
    </PageTransition>
  );
};
