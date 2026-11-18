// src/pages/MaterialReality.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, ChevronDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { EditorialSection } from '../components/EditorialSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { materialRealityContent } from '../data/content';

export const MaterialReality: React.FC = () => {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Parallax para el encabezado editorial
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacityHeader = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-[#07080B] text-[#F0ECE4] overflow-hidden">
        
        {/* ENCABEZADO EDITORIAL CON PARALLAX (01 // REALIDAD MATERIAL) */}
        <section
          ref={headerRef}
          className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center px-4 sm:px-8 md:px-12 pt-24 pb-16 overflow-hidden"
        >
          {/* Fondo Parallax con la imagen conceptual del circuito y la soledad */}
          <motion.div
            style={{
              backgroundImage: `url(${materialRealityContent.header.featuredImage})`,
              y: yBg,
            }}
            className="absolute inset-0 bg-cover bg-center pointer-events-none filter brightness-50"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#07080B]/80 via-[#07080B]/60 to-[#07080B]" />

          {/* Contenido del Encabezado */}
          <motion.div
            style={{ opacity: opacityHeader }}
            className="relative z-10 max-w-4xl mx-auto text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-system tracking-widest uppercase bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{materialRealityContent.header.badge}</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none">
              {materialRealityContent.header.title}
            </h1>

            <p className="font-editorial italic text-2xl sm:text-3xl text-stone-200 font-normal max-w-2xl mx-auto leading-relaxed">
              «{materialRealityContent.header.subtitle}»
            </p>

            <p className="text-sm sm:text-base font-body text-stone-300 max-w-xl mx-auto leading-relaxed pt-2">
              {materialRealityContent.header.abstract}
            </p>

            <div className="pt-6 flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="text-stone-400 flex flex-col items-center gap-1 font-mono-system text-[11px]"
              >
                <span>Desplázate para iniciar lectura</span>
                <ChevronDown className="w-4 h-4 text-cyan-400" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CONTENEDOR PRINCIPAL DE LECTURA ASIMÉTRICA */}
        <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-28">
          
          {/* BLOQUE NARRATIVO 1: INTRODUCCIÓN Y CONTEXTO DEL DOCUMENTO CON IMAGEN 1.1 */}
          <EditorialSection
            section={materialRealityContent.introSection}
            accentColor="cyan"
          />

          {/* COMPONENTE INTERACTIVO: DESLIZADOR COMPARATIVO ANTE LA HIPERREALIDAD */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="my-16"
          >
            <BeforeAfterSlider comparison={materialRealityContent.comparisons[0]} />
          </motion.section>

          {/* BLOQUE NARRATIVO 2: DESARROLLO EJE 1 CON IMAGEN 1.2 */}
          <EditorialSection
            section={materialRealityContent.deepDiveSection}
            accentColor="cyan"
          />

          {/* SEGUNDO LABORATORIO COMPARATIVO: EL OBJETO ARTESANAL VS EL SIMULACRO */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="my-16"
          >
            <BeforeAfterSlider comparison={materialRealityContent.comparisons[1]} />
          </motion.section>

          {/* BOTÓN MAGNÉTICO HACIA LA PÁGINA INTERNA 2 (CUERPO HUMANO) */}
          <div className="mt-24 pt-12 border-t border-white/10 flex flex-col items-center text-center space-y-6">
            <span className="font-mono-system text-xs uppercase tracking-widest text-rose-400">
              Continuación de la tesis investigativa
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-white font-bold">
              ¿Hacia dónde se traslada la atrofia del mundo físico?
            </h3>
            <p className="text-sm font-body text-stone-300 max-w-md">
              Explora cómo la evaporación de la materia se somatiza directamente en el cuerpo biológico y en la propiocepción.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/cuerpo-humano');
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 shadow-[0_0_30px_rgba(226,74,43,0.35)] transition-all duration-300 cursor-pointer"
            >
              <span>Avanzar al Eje 2: El Cuerpo Humano</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};
