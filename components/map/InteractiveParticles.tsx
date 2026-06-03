'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function InteractiveParticles() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  // Mouse position tracking (High performance)
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Transform mouse values to a small shift range for parallax (-15px to 15px)
  const xShift = useTransform(springX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-15, 15]);
  const yShift = useTransform(springY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-15, 15]);

  useEffect(() => {
    setMounted(true);
    // Generate 150 subtle particles
    const generatedParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage for width
      y: Math.random() * 100, // percentage for height
      size: Math.random() * 3 + 1, // 1px to 4px
      duration: Math.random() * 20 + 10, // slow float
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        // Distinct styling based on theme
        const particleClass = isDark 
          ? 'bg-white/80 shadow-[0_0_10px_rgba(255,255,255,1)] rounded-full' // Brighter Stars
          : 'bg-emerald-500/80 rounded-full rounded-tr-none rotate-45'; // More solid Leaves

        return (
          <motion.div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              x: xShift,
              y: yShift,
            }}
          >
            <motion.div
              className={particleClass}
              style={{
                width: isDark ? p.size : p.size * 2.5,
                height: isDark ? p.size : p.size * 2.5,
              }}
              animate={{
                y: [0, -20, 0], // Float up and down independent of top position
                opacity: isDark ? [0.4, 1, 0.4] : [0.8, 1, 0.8],
                rotate: isDark ? 0 : [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.delay,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
