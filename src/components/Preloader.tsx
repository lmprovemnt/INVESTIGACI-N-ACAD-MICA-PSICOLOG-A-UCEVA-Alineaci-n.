// src/components/Preloader.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const titleText = "ALIENACIÓN";

  useEffect(() => {
    // Si ya fue mostrado en esta sesión, reducimos el tiempo
    const hasLoaded = sessionStorage.getItem('preloader_shown');
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('preloader_shown', 'true');
    }, hasLoaded ? 800 : 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }}
          className="fixed inset-0 z-[2000] bg-[#090A0F] text-white flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          {/* Línea horizontal animada como en Plasticbionic */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-[4.375rem] left-0 w-full h-[1px] bg-white/20 origin-left"
          />

          <div className="overflow-hidden flex items-center justify-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.2em] flex uppercase"
            >
              {titleText.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.19, 1, 0.22, 1],
                      },
                    },
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-12 font-mono-system text-[11px] tracking-widest uppercase text-stone-300"
          >
            FACULTAD DE PSICOLOGÍA // UCEVA
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
