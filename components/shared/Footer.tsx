'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="w-full border-t border-ro-wood/30 bg-amber-50 dark:bg-slate-950 py-8 mt-16 relative opacity-80">
      {/* Warp Portal (Scroll to Top) Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 border-2 border-ro-wood/30 rounded-full p-2.5 text-amber-50 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all group z-10 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 animate-bounce" style={{ animationDuration: '3s' }} />
      </button>

      {/* Main Container & Content */}
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          © 2026 Sakditat Thoumsaeng. All rights reserved.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">
          Forged with Next.js & Tailwind CSS ✦
        </p>
      </div>
    </footer>
  );
}
