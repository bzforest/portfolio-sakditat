'use client';

import React from 'react';
import { useUIStore } from '@/lib/store';

export default function PublicLandingPage() {
  const { activeSection, setActiveSection } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-rose-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-md">
            RPG Developer Portfolio
          </h1>
          <p className="text-slate-400 text-lg md:text-xl">
            Embark on a vertical adventure through my code, projects, and skills.
          </p>
        </header>

        {/* Vertical Map Timeline / Navigation Demo */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-violet-400">Map Journey Navigation</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {['map', 'profile', 'projects'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
                  activeSection === section
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/50 scale-105 border border-violet-400'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {section.toUpperCase()}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Active Quest Phase: <span className="text-violet-400 font-bold uppercase">{activeSection}</span>
          </p>
        </section>

        {/* Content sections based on active state */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-violet-500/50 transition-all duration-300">
            <h3 className="font-bold text-lg text-rose-400 mb-2">🗺️ RPG Path Map</h3>
            <p className="text-sm text-slate-400">A visual interactive path map representing experience and milestones.</p>
          </div>
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 hover:border-violet-500/50 transition-all duration-300">
            <h3 className="font-bold text-lg text-violet-400 mb-2">👤 Adventurer Stats</h3>
            <p className="text-sm text-slate-400">Character statistics sheet containing technical stacks and skills.</p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-violet-500/50 transition-all duration-300">
            <h3 className="font-bold text-lg text-indigo-400 mb-2">⚔️ Boss Battles</h3>
            <p className="text-sm text-slate-400">Key engineering projects detailed as boss stages and challenges.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
