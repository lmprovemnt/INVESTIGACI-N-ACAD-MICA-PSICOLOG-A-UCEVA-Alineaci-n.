// src/components/AuthorCard3D.tsx
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Check, Copy, GraduationCap } from 'lucide-react';
import type { AuthorProfile } from '../data/content';

interface AuthorCard3DProps {
  author: AuthorProfile;
}

export const AuthorCard3D: React.FC<AuthorCard3DProps> = ({ author }) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Coordenadas normalizadas del mouse (-0.5 a 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Física de resortes para suavidad
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  // Transformaciones 3D de rotación
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(author.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full flex justify-center py-4 perspective-[1000px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-sm rounded-3xl p-6 sm:p-7 glass-panel border border-white/15 shadow-2xl overflow-hidden hover:border-cyan-400/40 transition-colors"
      >
        {/* Encabezado institucional */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="font-mono-system text-[11px] uppercase tracking-wider text-stone-300 font-semibold">
              UCEVA // PSICOLOGÍA
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono-system text-cyan-300">
            Cód. {author.code}
          </span>
        </div>

        {/* Contenido con elevación 3D */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="relative z-10 pt-5 flex flex-col items-center text-center"
        >
          {/* Fotografía de la autora */}
          <div className="relative group mb-4">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-rose-500 opacity-40 blur-md group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg bg-stone-900">
              <img
                src={author.avatarUrl}
                alt={author.name}
                className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>

          {/* Nombre y datos */}
          <div className="space-y-1 mb-2">
            <h3 className="font-display text-2xl text-white font-bold tracking-tight">
              {author.name}
            </h3>
            <p className="font-body text-xs text-cyan-300 font-medium">
              {author.role} • {author.program}
            </p>
          </div>

          <p className="text-xs font-body text-stone-300 leading-relaxed max-w-xs mb-4 text-center">
            {author.bio}
          </p>

          {/* Botón interactivo: Copiar Correo con feedback */}
          <div className="w-full space-y-1.5 mb-4">
            <div className="text-[10px] font-mono-system text-stone-400 text-left pl-1">
              Correo Institucional:
            </div>
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#07080B] border border-white/15 focus-within:border-cyan-400/60 transition-colors">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
              <input
                type="text"
                readOnly
                value={author.email}
                className="w-full bg-transparent text-xs font-mono-system text-stone-200 focus:outline-none select-all"
              />
              <button
                onClick={copyEmail}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  copied
                    ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : 'bg-white/10 hover:bg-cyan-400 hover:text-black text-stone-200'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Líneas de investigación */}
          <div className="w-full text-left space-y-1.5">
            <div className="text-[9px] font-mono-system uppercase tracking-wider text-stone-400">
              Ejes de Trabajo
            </div>
            <div className="flex flex-wrap gap-1">
              {author.researchFocus.map((focus, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] font-mono-system bg-white/5 text-stone-300 border border-white/10"
                >
                  #{focus}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
