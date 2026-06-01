'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig, type SkillCategory } from '@/data/config';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.08 },
  }),
};

// ─── Category colour map ──────────────────────────────────────────────────────
const categoryStyle: Record<string, { border: string; heading: string; pill: string }> = {
  'Frontend': { border: 'border-sky-300/60', heading: 'text-sky-700', pill: 'bg-sky-50    border-sky-200   text-sky-800' },
  'Backend': { border: 'border-amber-300/60', heading: 'text-amber-700', pill: 'bg-amber-50  border-amber-200 text-amber-900' },
  'Database & Other': { border: 'border-emerald-300/60', heading: 'text-emerald-700', pill: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
};

// ─── Skill pill badge ─────────────────────────────────────────────────────────
function SkillPill({ name, pillClass }: { name: string; pillClass: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full border text-[12px] font-semibold whitespace-nowrap ${pillClass}`}>
      {name}
    </span>
  );
}

// ─── Category card ────────────────────────────────────────────────────────────
function CategoryCard({ cat, index }: { cat: SkillCategory; index: number }) {
  const s = categoryStyle[cat.category] ?? categoryStyle['Backend'];
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      className={`flex-1 min-w-0 rounded-2xl border-2 ${s.border} bg-white/20 backdrop-blur-sm p-5 space-y-3`}
    >
      <h3 className={`font-heading font-bold text-base flex items-center gap-2 ${s.heading}`}>
        <span>{cat.emoji}</span> {cat.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill) => (
          <SkillPill key={skill} name={skill} pillClass={s.pill} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Spinning conic-gradient avatar ring ─────────────────────────────────────
function SpinningAvatar() {
  return (
    /**
     * Parent: overflow-hidden clips all children to this circle.
     * The spinning gradient fills the full circle; the inner mask
     * div covers the center with a solid colour, revealing only
     * the ~6 px rim as a spinning gradient border.
     */
    <div className="relative w-72 h-72 rounded-full overflow-hidden flex items-center justify-center shrink-0">

      {/* Layer 1 — Spinning conic-gradient (fills entire circle) */}
      <div
        className="absolute inset-0 animate-[spin_6s_linear_infinite]"
        style={{
          background: 'conic-gradient(from 0deg, #855b32 0%, #48c774 30%, #7ec8e3 55%, #f0b429 80%, #855b32 100%)',
        }}
      />

      {/* Layer 2 — Inner mask: solid bg slightly smaller than parent,
          sits on top (z-10), exposes only the border rim of the gradient */}
      <div className="relative w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full bg-sky-100 z-10 flex items-center justify-center overflow-hidden">
        <span className="text-8xl select-none leading-none">🧙</span>
      </div>

    </div>
  );
}


// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroStatus() {
  return (
    <section id="status" className="w-full max-w-6xl mx-auto px-4">

      {/* ── Main glassmorphism card ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="
          rounded-3xl overflow-hidden
          border-4 border-ro-wood/70
          bg-white/10 backdrop-blur-xl
          shadow-2xl shadow-ro-wood/20
        "
      >
        {/* Top wood accent bar */}
        <div className="h-2 bg-gradient-to-r from-ro-wood/40 via-ro-wood to-ro-wood/40" />

        {/* ── Hero row: text left · avatar right ──────────────────────── */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12">

          {/* Left: identity + bio */}
          <div className="flex-1 min-w-0 space-y-5 text-center md:text-left">
            <motion.p
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="text-sm font-bold uppercase tracking-[0.25em] text-ro-wood/80"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-ro-wood leading-none tracking-tight"
            >
              {siteConfig.name}
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="font-heading font-semibold text-xl md:text-2xl text-ro-wood/70"
            >
              {siteConfig.role}
            </motion.p>

            {/* Tag chips */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-2 justify-center md:justify-start"
            >
              {[
                { label: `⚔️ ${siteConfig.class}`, cls: 'bg-ro-wood/10  border-ro-wood/30  text-ro-wood' },
                { label: `✅ ${siteConfig.guild}`, cls: 'bg-ro-leaf/15  border-ro-leaf/35  text-emerald-800' },
                { label: `📍 ${siteConfig.location}`, cls: 'bg-sky-100/60  border-sky-300/50  text-sky-800' },
              ].map(({ label, cls }) => (
                <span key={label} className={`text-[12px] font-semibold px-3 py-1 rounded-full border ${cls}`}>
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.p
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="text-base text-slate-700/80 leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              {siteConfig.bio}
            </motion.p>
          </div>

          {/* Right: spinning avatar */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="flex justify-center"
          >
            <SpinningAvatar />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mx-8 md:mx-12 border-t border-ro-wood/50" />

        {/* ── Tech Stack section ───────────────────────────────────────── */}
        <div className="p-8 md:p-12 space-y-5">
          <motion.p
            custom={5} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-ro-wood/80"
          >
            Tech Stack Skills
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row gap-4"
          >
            {siteConfig.skillCategories.map((cat, i) => (
              <CategoryCard key={cat.category} cat={cat} index={i + 6} />
            ))}
          </motion.div>
        </div>

        {/* Bottom wood accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-transparent via-ro-wood/40 to-transparent" />
      </motion.div>
    </section>
  );
}
