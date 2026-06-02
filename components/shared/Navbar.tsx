'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sword } from 'lucide-react';
import { siteConfig } from '@/data/config';
import ThemeToggle from '@/components/shared/ThemeToggle';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Status', href: '#status' },
  { label: `Adventurer's Quests`, href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
      className={`
        fixed top-0 left-0 right-0 z-50
        border-b-2 border-ro-wood dark:border-ro-wood/60
        transition-all duration-300
        ${scrolled
          ? 'bg-amber-50/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg shadow-ro-wood/15 dark:shadow-black/50'
          : 'bg-amber-50/30 dark:bg-slate-900/40 backdrop-blur-sm'}
      `}
    >
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

        {/* ── Brand / character tag ─────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="
            w-8 h-8 rounded-lg border-2 border-ro-wood dark:border-ro-wood/60
            bg-gradient-to-br from-amber-100 to-amber-200 dark:from-slate-800 dark:to-slate-900
            flex items-center justify-center shadow-sm
          ">
            <Sword size={16} strokeWidth={2.5} className="text-ro-wood dark:text-slate-300" />
          </div>
          <span className="font-heading font-bold text-ro-wood dark:text-slate-100 tracking-wide leading-none text-sm">
            {siteConfig.fullName}
            <span className="block text-[10px] font-sans font-normal text-ro-wood/60 dark:text-slate-400 uppercase tracking-widest">
              {siteConfig.class}
            </span>
          </span>
        </div>

        {/* ── Nav links ─────────────────────────────────────────── */}
        <ul className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeLink === link.label;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`
                    relative px-4 py-1.5 rounded-lg text-sm font-semibold
                    transition-colors duration-200
                    ${isActive
                      ? 'bg-ro-wood text-amber-50 dark:text-slate-100'
                      : 'text-ro-wood dark:text-slate-200 hover:bg-ro-wood/10 dark:hover:bg-slate-800/50'}
                  `}
                >
                  {link.label}
                  {/* Active state: gem underline */}
                  {isActive && (
                    <motion.span
                      layoutId="hud-gem"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ro-leaf"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Right side ──────────────────────────────────────── */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />

          {/* ── Status badge ──────────────────────────────────────── */}
          <div className="
            hidden sm:flex items-center gap-1.5 shrink-0
            border border-ro-wood/40 dark:border-ro-wood/20 bg-ro-wood/10 dark:bg-slate-800/80
            text-ro-wood dark:text-slate-200 text-xs font-semibold
            px-3 py-1.5 rounded-lg
          ">
            <span className="w-1.5 h-1.5 rounded-full bg-ro-leaf animate-pulse" />
            {siteConfig.guild}
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────── */}
          <button
            aria-label="Open menu"
            className="sm:hidden flex flex-col gap-1.5 p-1"
          >
            {[5, 5, 3].map((w, i) => (
              <span
                key={i}
                className="h-0.5 bg-ro-wood dark:bg-slate-300 rounded-full block"
                style={{ width: `${w * 4}px` }}
              />
            ))}
          </button>
        </div>

      </div>
    </motion.nav>
  );
}
