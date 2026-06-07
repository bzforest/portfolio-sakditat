'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, X } from 'lucide-react';
import { siteConfig } from '@/data/config';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { usePathname, useRouter } from 'next/navigation';
import MagicParticles from '@/components/shared/MagicParticles';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Status', href: '#status' },
  { label: `Adventurer's Quests (Projects)`, href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      router.push('/settings');
      setClickCount(0);
    }
  };

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

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

        {/* ── Brand / character tag (Easter Egg Trigger) ────────── */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 shrink-0 select-none"
        >
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
        {isHomePage && (
          <ul className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.label;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      setActiveLink(link.label);
                      handleScroll(e, link.href);
                    }}
                    className={`
                      relative group overflow-hidden px-4 py-1.5 rounded-lg text-sm font-semibold
                      transition-colors duration-200
                      ${isActive
                        ? 'bg-ro-wood text-amber-50 dark:text-slate-100'
                        : 'text-ro-wood dark:text-slate-200 hover:bg-ro-wood/10 dark:hover:bg-slate-800/50'}
                    `}
                  >
                    <MagicParticles isSubtle />
                    <span className="relative z-10">{link.label}</span>
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
        )}

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
          {isHomePage && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="sm:hidden relative group overflow-hidden flex flex-col gap-1.5 p-2 rounded-lg cursor-pointer"
            >
              <MagicParticles isSubtle />
              {[5, 5, 3].map((w, i) => (
                <span
                  key={i}
                  className="relative z-10 h-0.5 bg-ro-wood dark:bg-slate-300 rounded-full block"
                  style={{ width: `${w * 4}px` }}
                />
              ))}
            </button>
          )}
        </div>

      </div>

      {/* ── Mobile Menu Drawer ─────────────────────────────────── */}
      {mounted && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] sm:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[70%] max-w-sm bg-amber-50 dark:bg-slate-900 border-l-2 border-ro-wood dark:border-ro-wood/60 z-[110] p-6 shadow-2xl flex flex-col sm:hidden"
              >
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="self-end p-2 text-ro-wood dark:text-slate-300 hover:bg-ro-wood/10 dark:hover:bg-slate-800 rounded-xl transition-colors mb-6 cursor-pointer"
                >
                  <X size={28} strokeWidth={2.5} />
                </button>

                <ul className="flex flex-col gap-3">
                  {navLinks.map((link) => {
                    const isActive = activeLink === link.label;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            setActiveLink(link.label);
                            handleScroll(e, link.href);
                          }}
                          className={`
                            block px-5 py-3.5 rounded-xl font-heading font-semibold text-lg transition-colors
                            ${isActive
                              ? 'bg-ro-wood text-amber-50 dark:text-slate-100 shadow-sm'
                              : 'text-ro-wood dark:text-slate-300 hover:bg-ro-wood/10 dark:hover:bg-slate-800/80'}
                          `}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>

                {/* Status Badge inside menu */}
                <div className="mt-auto flex items-center justify-center gap-2 border-t-2 border-ro-wood/20 dark:border-ro-wood/20 pt-6">
                  <span className="w-2 h-2 rounded-full bg-ro-leaf animate-pulse" />
                  <span className="text-ro-wood dark:text-slate-300 font-semibold text-sm">
                    {siteConfig.guild}
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.nav>
  );
}
