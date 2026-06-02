'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Code2, Briefcase, Copy, Check } from 'lucide-react';
import { siteConfig } from '@/data/config';

export default function MessengerGuild() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const cards = [
    {
      label: 'EMAIL',
      value: siteConfig.contact?.email || 'your.email@gmail.com',
      url: `mailto:${siteConfig.contact?.email}`,
      icon: Mail,
    },
    {
      label: 'PHONE',
      value: '(+66) 62-519-3546',
      url: 'tel:+66625193546',
      icon: Phone,
    },
    {
      label: 'LINKEDIN',
      value: 'Sakditat Thoumsaeng',
      url: siteConfig.contact?.linkedin,
      icon: Briefcase,
    },
    {
      label: 'GITHUB',
      value: 'Best_Sakditat',
      url: siteConfig.contact?.github,
      icon: Code2,
    }
  ];

  return (
    <section id="contact" className="w-full relative py-18 md:py-20 px-4">

      <div className="mx-8 md:mx-12 border-t border-ro-wood/50 dark:border-slate-50/30 pb-14" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-12"
      >
        <div className="space-y-4">
          <p className="font-heading font-extrabold text-2xl md:text-5xl text-ro-wood drop-shadow-sm dark:text-slate-200">
            <motion.span
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="inline-block"
            >
              ✦
            </motion.span>
            {' '}Let's Work Together{' '}
            <motion.span
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 1 }}
              className="inline-block"
            >
              ✦
            </motion.span>
          </p>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I am currently open to new opportunities and ready to join your team immediately. Whether you have a question or want to discuss a project, feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-3 md:pt-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.label}
                href={card.url}
                target="_blank"
                rel="noreferrer"
                className="relative group cursor-pointer block w-full"
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-4 py-1.5 pb-2rounded-t-lg text-amber-50 text-xs font-semibold font-heading whitespace-nowrap opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 -z-10 flex items-center gap-2">
                  <span>Click to Open</span>
                </div>

                <div className="relative z-10 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-ro-wood/40 rounded-xl p-6 flex flex-col items-start text-left transition-all hover:shadow-md dark:hover:bg-slate-700/60 w-full h-full">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopy(card.value, card.label);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-20"
                    aria-label="Copy to clipboard"
                  >
                    {copiedId === card.label ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-200 transition-colors cursor-pointer" />
                    )}
                  </button>
                  <Icon size={24} className="text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">
                    {card.label}
                  </span>
                  <span className="text-sm md:text-base font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors truncate w-full">
                    {card.value}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
