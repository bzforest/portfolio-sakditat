'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveParticles from './InteractiveParticles';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** A single realistic cloud made of multiple blurred radial-gradient blobs */
function CloudBlob({
  width,
  style,
  opacity = 0.88,
}: {
  width: number;
  style?: React.CSSProperties;
  opacity?: number;
}) {
  const h = Math.round(width * 0.42);

  return (
    <div
      className="dark:opacity-20 transition-opacity duration-500"
      style={{
        position: 'absolute',
        width,
        height: h,
        opacity,
        ...style,
      }}
    >
      {/* Base layer — wide, soft ellipse */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse 100% 60% at 50% 70%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.0) 100%)',
        filter: 'blur(6px)',
      }} />
      {/* Left puff */}
      <div style={{
        position: 'absolute',
        width: '52%', height: '130%',
        top: '-40%', left: '8%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.96) 30%, rgba(255,255,255,0) 80%)',
        filter: 'blur(5px)',
      }} />
      {/* Center puff (tallest) */}
      <div style={{
        position: 'absolute',
        width: '50%', height: '160%',
        top: '-65%', left: '28%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0) 75%)',
        filter: 'blur(4px)',
      }} />
      {/* Right puff */}
      <div style={{
        position: 'absolute',
        width: '44%', height: '120%',
        top: '-30%', right: '5%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.93) 25%, rgba(255,255,255,0) 75%)',
        filter: 'blur(6px)',
      }} />
      {/* Soft shadow at bottom */}
      <div style={{
        position: 'absolute',
        width: '80%', height: '30%',
        bottom: '-8%', left: '10%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(180,210,240,0.35) 0%, transparent 70%)',
        filter: 'blur(8px)',
      }} />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CloudBackground() {
  const [clouds, setClouds] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate 15 clouds for a balanced density
    const generatedClouds = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // 0-100% width
      y: Math.random() * 100, // 0-100% document height
      scale: Math.random() * 0.8 + 0.4, // Random sizes
      duration: Math.random() * 20 + 20, // 20s to 40s float loop
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.5, // 0.5 to 0.8
    }));
    setClouds(generatedClouds);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <InteractiveParticles />

      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            scale: cloud.scale,
          }}
          animate={{
            x: ['-2vw', '2vw', '-2vw'], // Gentle horizontal float
            y: ['-1vh', '1vh', '-1vh'], // Gentle vertical float
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: cloud.delay,
          }}
        >
          <CloudBlob width={300} opacity={cloud.opacity} />
        </motion.div>
      ))}
    </div>
  );
}
