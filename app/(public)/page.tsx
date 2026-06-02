'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/shared/Navbar';
import HeroStatus from '@/components/profile/HeroStatus';
import ProjectMap from '@/components/projects/ProjectMap';
import MessengerGuild from '@/components/contact/MessengerGuild';
import { siteConfig } from '@/data/config';

export default function PublicLandingPage() {
  return (
    <>
      {/* ── Fixed RPG HUD Navbar ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero / Character Selection Section ──────────────────────────── */}
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

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-10 flex flex-col items-center gap-1 text-ro-wood/40"
        >
          <p className="text-[11px] uppercase tracking-widest font-semibold">Scroll to explore</p>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="text-base"
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* ── Phase 4: Quest Board (Projects) ───────────────────────────── */}
      <ProjectMap />

      {/* ── Phase 5: Messenger Guild (Contact) ──────────────────────── */}
      <MessengerGuild />
    </>
  );
}
