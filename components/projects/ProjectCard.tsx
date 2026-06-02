'use client';

import React from 'react';
import { Code2, ExternalLink } from 'lucide-react';

export interface ProjectData {
  title: string;
  description: string;
  tech: readonly string[];
  imagePlaceholder: string;
  liveDemoUrl?: string;
  githubFeUrl?: string;
  githubBeUrl?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div
      className="relative w-full max-w-2xl mx-auto flex flex-col gap-6 items-center p-6 md:p-8 rounded-3xl border-4 border-ro-wood/60 dark:border-ro-wood/50 bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl shadow-ro-wood/10 dark:shadow-black/40 transition-colors duration-500"
    >
      {/* ── Image Placeholder ─────────────────────────────────────── */}
      <div className="w-full shrink-0 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-ro-wood/40 dark:border-ro-wood/30 bg-sky-100/50 dark:bg-slate-800/80 flex items-center justify-center relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/20 to-transparent dark:from-indigo-500/10" />
        <span className="text-xl md:text-2xl font-bold text-ro-wood/60 dark:text-slate-400 font-heading z-10 group-hover:scale-110 transition-transform duration-300">
          {project.imagePlaceholder}
        </span>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="w-full space-y-4 md:space-y-6 flex flex-col justify-center">
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-3xl md:text-4xl text-ro-wood dark:text-white">
            {project.title}
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full border border-ro-wood/30 dark:border-slate-600 bg-white/60 dark:bg-slate-800/80 text-[12px] font-semibold text-ro-wood dark:text-slate-200"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank" rel="noreferrer"
              className="relative overflow-hidden rounded-full p-[2px] group cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(250,204,21,0.5)]"
            >
              {/* Spinning Light */}
              <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,#facc15_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
              {/* Inner Mask */}
              <div className="relative z-10 h-full w-full bg-blue-600 rounded-full flex items-center justify-center gap-2 px-4 py-2 transition-colors group-hover:bg-blue-500 text-white font-semibold text-sm">
                <ExternalLink size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                Live Demo
              </div>
            </a>
          )}
          {project.githubFeUrl && (
            <a
              href={project.githubFeUrl}
              target="_blank" rel="noreferrer"
              className="bg-slate-800/80 dark:bg-slate-700/80 hover:bg-slate-700 text-white border border-slate-600 rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Code2 size={16} />
              Frontend
            </a>
          )}
          {project.githubBeUrl && (
            <a
              href={project.githubBeUrl}
              target="_blank" rel="noreferrer"
              className="bg-slate-800/80 dark:bg-slate-700/80 hover:bg-slate-700 text-white border border-slate-600 rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Code2 size={16} />
              Backend
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
