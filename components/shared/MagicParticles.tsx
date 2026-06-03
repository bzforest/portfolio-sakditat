'use client';
import React, { useState, useEffect } from 'react';

export default function MagicParticles({ 
  hoverClass = "group-hover:opacity-100", 
  isSubtle = false 
}: { 
  hoverClass?: string,
  isSubtle?: boolean
}) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const particleCount = isSubtle ? 8 : 15;
    const generatedParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      delay: `${Math.random() * 2}s`,
      size: isSubtle 
        ? (Math.random() > 0.5 ? 'w-0.5 h-0.5' : 'w-1 h-1') 
        : (Math.random() > 0.5 ? 'w-1 h-1' : 'w-1.5 h-1.5'),
      leafSize: Math.random() > 0.5 ? 'w-2 h-2' : 'w-2.5 h-2.5',
      rotation: Math.floor(Math.random() * 360),
      duration: `${2 + Math.random() * 2}s`
    }));
    setParticles(generatedParticles);
  }, [isSubtle]);

  if (particles.length === 0) return null;

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden opacity-0 ${hoverClass} transition-opacity duration-700 pointer-events-none rounded-[inherit]`} suppressHydrationWarning>
      
      {/* Dark Mode: Stars */}
      <div className={`hidden dark:block absolute inset-0 mix-blend-screen rounded-[inherit] ${isSubtle ? 'opacity-40' : 'opacity-100'}`}>
        {particles.map((star) => (
          <div
            key={`star-${star.id}`}
            className={`absolute bg-white rounded-full ${star.size} shadow-[0_0_5px_rgba(255,255,255,0.8)] animate-pulse`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: '1.5s',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-amber-500/10 rounded-[inherit]"></div>
      </div>

      {/* Light Mode: Floating Leaves */}
      <div className="block dark:hidden absolute inset-0 rounded-[inherit]">
        <style>{`
          @keyframes floating-leaf-home {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(30px) rotate(120deg) translateX(15px); opacity: 0; }
          }
        `}</style>
        {particles.map((leaf) => (
          <div
            key={`leaf-${leaf.id}`}
            className={`absolute bg-emerald-500/60 ${leaf.leafSize} rounded-tl-full rounded-br-sm shadow-sm`}
            style={{
              top: leaf.top,
              left: leaf.left,
              animation: `floating-leaf-home ${leaf.duration} infinite ease-in-out`,
              animationDelay: leaf.delay,
              transform: `rotate(${leaf.rotation}deg)`
            }}
          />
        ))}
        <div className="absolute inset-0 bg-emerald-500/5 mix-blend-multiply rounded-[inherit]"></div>
      </div>

    </div>
  );
}
