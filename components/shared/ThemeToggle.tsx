'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch — render nothing meaningful until client mounts.
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a skeleton placeholder with the exact same dimensions
    // to avoid layout shift once mounted.
    return (
      <div
        className="w-[68px] h-[32px] rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse shrink-0"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`
        relative w-[68px] h-[32px] rounded-full shrink-0
        flex items-center
        transition-colors duration-500
        border-2 overflow-hidden
        ${isDark
          ? 'bg-slate-800 border-indigo-500/50'
          : 'bg-sky-300 border-amber-400/60'}
      `}
    >
      {/* Track background decoration — stars (dark) or clouds (light) */}
      {isDark ? (
        <>
          <span className="absolute w-1 h-1 rounded-full bg-white/70 top-[6px] left-[10px]" />
          <span className="absolute w-0.5 h-0.5 rounded-full bg-white/50 top-[18px] left-[16px]" />
          <span className="absolute w-1 h-1 rounded-full bg-white/40 top-[10px] left-[28px]" />
          <span className="absolute w-0.5 h-0.5 rounded-full bg-white/60 top-[20px] left-[24px]" />
        </>
      ) : (
        <>
          {/* Tiny decorative cloud */}
          <span className="absolute w-3.5 h-3.5 rounded-full bg-white/90 top-[9px] right-[12px]" />
          <span className="absolute w-2.5 h-2.5 rounded-full bg-white/90 top-[12px] right-[7px]" />
          <span className="absolute w-2.5 h-2.5 rounded-full bg-white/90 top-[13px] right-[18px]" />
          <span className="absolute w-4 h-2 rounded-full bg-white/90 top-[15px] right-[11px]" />
        </>
      )}

      {/* Knob — uses layout prop for smooth sliding */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className={`
          w-[24px] h-[24px] rounded-full
          flex items-center justify-center
          shadow-md
          ${isDark
            ? 'ml-auto mr-[2px] bg-indigo-400'
            : 'ml-[2px] bg-amber-300'}
        `}
      >
        {isDark ? (
          <Moon size={13} strokeWidth={2.5} className="text-indigo-900" />
        ) : (
          <Sun size={13} strokeWidth={2.5} className="text-amber-700" />
        )}
      </motion.div>
    </button>
  );
}
