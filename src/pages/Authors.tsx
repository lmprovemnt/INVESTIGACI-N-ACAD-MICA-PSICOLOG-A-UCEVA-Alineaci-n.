// src/pages/Authors.tsx
import { GraduationCap, ArrowLeft, BookOpen } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { AuthorCard3D } from '../components/AuthorCard3D';
import { authorsList, siteConfig } from '../data/content';

export const Authors: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative w-full min-h-screen bg-[#07080B] text-[#F0ECE4] pt-20 sm:pt-28 pb-24 px-4 sm:px-6 md:px-12 overflow-hidden">
        
        {/* Glows ambientales de fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

        <main className="relative z-10 max-w-6xl mx-auto space-y-12 text-center">
          
          {/* Encabezado académico de la página */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-system tracking-widest uppercase bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>INVESTIGACIÓN // PSICOLOGÍA UCEVA</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight">
              Autoras del Proyecto
            </h1>

            <p className="font-editorial italic text-2xl sm:text-3xl text-stone-300 font-normal leading-relaxed">
              «Investigación académica desarrollada por estudiantes del Programa de Psicología de la Unidad Central del Valle del Cauca sobre la desconexión humana en la era digital.»
            </p>

            <div className="pt-2 font-mono-system text-xs text-stone-400">
              {siteConfig.institution} • {siteConfig.program}
            </div>
          </div>

          {/* CUADRÍCULA DE LAS 4 AUTORAS */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
            {authorsList.map((author) => (
              <AuthorCard3D key={author.id} author={author} />
            ))}
          </section>

          {/* SÍNTESIS METODOLÓGICA DEL PROYECTO */}
          <section className="max-w-4xl mx-auto text-left p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono-system text-xs uppercase tracking-wider font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Marco Académico e Interdisciplinar</span>
            </div>
            <p className="text-sm font-body text-stone-300 leading-relaxed">
              Este trabajo integra conceptos fundamentales de la <strong>psicología social, la salud mental, la psicofisiología y la crítica epistemológica</strong> para examinar las repercusiones del aislamiento urbano, la dependencia de plataformas virtuales, el embrutecimiento informacional y la deshumanización del vínculo afectivo.
            </p>
          </section>

          {/* Botón de regreso a la Portada */}
          <div className="pt-6">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate('/');
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono-system text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Portada</span>
            </button>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};
