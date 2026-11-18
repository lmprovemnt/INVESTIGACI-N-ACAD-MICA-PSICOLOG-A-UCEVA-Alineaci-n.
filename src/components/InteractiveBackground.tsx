// src/components/InteractiveBackground.tsx
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  type: 'neural' | 'organic';
}

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
      radius: 180,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initial particles
    let particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const isNeural = Math.random() > 0.45;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: isNeural ? Math.random() * 1.5 + 1 : Math.random() * 2 + 1.2,
          baseRadius: isNeural ? 1.5 : 2,
          alpha: Math.random() * 0.5 + 0.2,
          type: isNeural ? 'neural' : 'organic',
        });
      }
    };

    initParticles();

    let wavePhase = 0;

    const render = () => {
      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      wavePhase += 0.012;

      ctx.clearRect(0, 0, width, height);

      // Sutil gradiente de fondo ambiental
      const bgGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, 'rgba(0, 229, 255, 0.045)');
      bgGrad.addColorStop(0.35, 'rgba(217, 83, 56, 0.025)');
      bgGrad.addColorStop(1, 'rgba(9, 10, 15, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Dibujar ondas orgánicas sutiles en la parte inferior
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(217, 83, 56, 0.08)';
      for (let x = 0; x <= width; x += 30) {
        const yOffset =
          Math.sin(x * 0.003 + wavePhase) * 35 +
          Math.cos(x * 0.006 - wavePhase * 0.5) * 20;
        const distToMouse = Math.hypot(x - mouse.x, height * 0.85 + yOffset - mouse.y);
        const mouseInfluence = Math.max(0, (1 - distToMouse / 280) * 30);
        const y = height * 0.85 + yOffset - mouseInfluence;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Actualizar y dibujar partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Rebote en bordes
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Atracción o dispersión sutil con el mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
          p.radius = p.baseRadius * (1 + (1 - dist / mouse.radius) * 1.2);
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        // Renderizado del nodo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.type === 'neural') {
          ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha * 0.85})`;
        } else {
          ctx.fillStyle = `rgba(217, 83, 56, ${p.alpha * 0.75})`;
        }
        ctx.fill();

        // Conexiones sinápticas entre nodos cercanos
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxLinkDist = 120;

          if (distBetween < maxLinkDist) {
            const linkAlpha = (1 - distBetween / maxLinkDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            if (p.type === 'neural' && p2.type === 'neural') {
              ctx.strokeStyle = `rgba(0, 229, 255, ${linkAlpha})`;
            } else if (p.type === 'organic' && p2.type === 'organic') {
              ctx.strokeStyle = `rgba(217, 83, 56, ${linkAlpha})`;
            } else {
              // Puente híbrido: alienación vs carne
              ctx.strokeStyle = `rgba(234, 227, 217, ${linkAlpha * 0.6})`;
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ display: 'block' }}
    />
  );
};
