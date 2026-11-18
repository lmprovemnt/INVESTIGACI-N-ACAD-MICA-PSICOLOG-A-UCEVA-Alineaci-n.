// src/components/EditorialSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Image as ImageIcon } from 'lucide-react';
import type { SectionBlock } from '../data/content';

interface EditorialSectionProps {
  section: SectionBlock;
  accentColor?: 'cyan' | 'terracotta';
  isWarmMode?: boolean;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  section,
  accentColor = 'cyan',
  isWarmMode = false,
}) => {
  const isCyan = accentColor === 'cyan';

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className={`relative my-16 sm:my-24 p-6 sm:p-10 md:p-12 rounded-3xl transition-colors duration-500 ${
        isWarmMode
          ? 'bg-[#EAE3D9]/95 border border-[#141312]/15 shadow-2xl text-[#141312]'
          : 'glass-panel border border-white/10 shadow-2xl text-stone-200'
      }`}
    >
      {/* Barra de identificación temática */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-current/10">
        <div className="flex items-center gap-3">
          <span
            className={`font-mono-system text-xs font-semibold px-2.5 py-1 rounded-full ${
              isCyan
                ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30'
                : 'bg-rose-500/10 text-rose-500 border border-rose-500/30'
            }`}
          >
            SECCIÓN {section.index}
          </span>
          <span className="font-mono-system text-xs opacity-60 tracking-wider uppercase">
            {section.tagline}
          </span>
        </div>
      </div>

      {/* Título de la sección editorial */}
      <div className="mt-6 space-y-3">
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          {section.title}
        </h3>
        <p className="font-editorial italic text-2xl sm:text-3xl opacity-90 font-normal leading-snug">
          «{section.leadParagraph}»
        </p>
      </div>

      {/* Fotografía conceptual de la investigación */}
      {section.imageUrl && (
        <div className="mt-8 overflow-hidden rounded-2xl plastic-border bg-black/40">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={section.imageUrl}
              alt={section.title}
              className="w-full h-full object-cover filter brightness-90 hover:scale-102 hover:brightness-100 transition-all duration-700"
            />
          </div>
          {section.imageCaption && (
            <div className="p-3 bg-black/70 backdrop-blur-sm border-t border-white/10 font-mono-system text-[11px] opacity-80 flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{section.imageCaption}</span>
            </div>
          )}
        </div>
      )}

      {/* Párrafos de análisis psicológico */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 space-y-5 text-base sm:text-lg font-body font-light leading-relaxed opacity-90">
          {section.contentParagraphs.map((paragraph, idx) => (
            <p key={idx} className="first-letter:text-3xl first-letter:font-editorial first-letter:font-normal first-letter:mr-1">
              {paragraph}
            </p>
          ))}

          {/* Destacado clave */}
          {section.keyHighlight && (
            <div
              className={`p-5 rounded-2xl my-6 border-l-4 ${
                isCyan
                  ? 'bg-cyan-500/5 border-cyan-400 text-cyan-200'
                  : 'bg-rose-500/5 border-rose-500 text-rose-800 dark:text-rose-300'
              } font-body text-base italic`}
            >
              <div className="font-mono-system text-[10px] uppercase tracking-widest opacity-60 mb-1">
                Conclusión Clave
              </div>
              "{section.keyHighlight}"
            </div>
          )}
        </div>

        {/* Columna lateral (Cita o métricas) */}
        <div className="md:col-span-4 space-y-6">
          {section.quote && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <Quote className={`w-6 h-6 ${isCyan ? 'text-cyan-400' : 'text-rose-400'}`} />
              <blockquote className="font-editorial italic text-xl sm:text-2xl leading-snug">
                "{section.quote.text}"
              </blockquote>
              <div className="pt-2 border-t border-white/10 text-xs font-mono-system opacity-75">
                <div className="font-semibold">{section.quote.author}</div>
                {section.quote.work && <div className="text-[11px] opacity-75">{section.quote.work}</div>}
              </div>
            </div>
          )}

          {section.metrics && (
            <div className="space-y-3">
              {section.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1"
                >
                  <div className="font-display text-2xl sm:text-3xl font-bold text-cyan-400">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold uppercase font-mono-system opacity-90">
                    {metric.label}
                  </div>
                  <div className="text-[11px] font-body opacity-70 leading-snug">
                    {metric.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};
