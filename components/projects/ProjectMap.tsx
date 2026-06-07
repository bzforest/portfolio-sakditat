'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProjectData } from './ProjectCard';
import ProjectCard from './ProjectCard';
import MagicParticles from '@/components/shared/MagicParticles';

interface ProjectMapProps {
  projects: ProjectData[];
}

export default function ProjectMap({ projects }: ProjectMapProps) {
  return (
    <section id="projects" className="w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-16 md:space-y-24">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="font-heading font-extrabold text-2xl md:text-5xl text-ro-wood drop-shadow-sm dark:text-slate-200 flex flex-col items-center">
            <div className="flex items-center gap-2 md:gap-4">
              <motion.span
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="inline-block"
              >
                ✦
              </motion.span>
              <span>Adventurer's Quests</span>
              <motion.span
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 1 }}
                className="inline-block"
              >
                ✦
              </motion.span>
            </div>
            <span className="text-xl md:text-4xl text-ro-wood/80 dark:text-slate-50 mt-1 md:mt-2">
              ( Projects )
            </span>
          </div>
        </div>

        {/* Project Cards Map */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-ro-wood/40 dark:bg-ro-wood/20 hidden lg:block" style={{ borderLeft: '2px dashed currentColor' }}></div>

          <div className="space-y-16 lg:space-y-0">
            {projects.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/40 rounded-3xl border-2 border-dashed border-ro-wood/30">
                <p className="text-xl text-ro-wood/60 dark:text-slate-400 font-heading">
                  Quests are currently being forged...
                </p>
              </div>
            ) : (
              projects.map((project, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`relative flex flex-col lg:flex-row items-center w-full lg:py-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                  >
                    {/* ── Timeline Node (Dot) ──────────────────────── */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-amber-400 border-4 border-amber-100 dark:border-slate-800 shadow-[0_0_15px_rgba(250,204,21,0.8)] z-20" />

                    {/* ── Project Card Container ──────────────────── */}
                    <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                      <ProjectCard project={project} index={index} />
                    </div>

                    {/* ── Empty Space for Alignment ───────────────── */}
                    <div className="hidden lg:block w-1/2" />
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* ── View All Quests Button ────────────────────────────── */}
        <div className="flex justify-center">
          <Link href="/projects" className="block cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 overflow-hidden ring-2 ring-inset ring-ro-wood dark:ring-ro-wood/50 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all duration-300"
            >
              <MagicParticles />
              {/* The Shine */}
              <div className="absolute top-0 left-[-100%] h-full w-[50%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[200%] transition-all duration-700 ease-in-out z-0" />

              {/* The Content */}
              <span className="relative z-10 font-heading font-semibold text-md md:text-xl text-amber-50 flex items-center gap-2 pointer-events-none">
                View All Quests
              </span>
            </motion.div>
          </Link>
        </div>

      </div>
    </section>
  );
}
