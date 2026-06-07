'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroStatus from '@/components/profile/HeroStatus';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16"
    >
      {/* Section eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-8 space-y-1.5"
      >
        <p className="font-heading font-extrabold text-3xl md:text-5xl text-ro-wood drop-shadow-sm dark:text-slate-200 md:py-10">
          <motion.span
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="inline-block"
          >
            ✦
          </motion.span>
          {' '}Character Status{' '}
          <motion.span
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 1 }}
            className="inline-block"
          >
            ✦
          </motion.span>
        </p>
      </motion.div>

      {/* Character status card — sits above CloudBackground (z-10 via layout) */}
      <HeroStatus />
    </section>
  );
}
