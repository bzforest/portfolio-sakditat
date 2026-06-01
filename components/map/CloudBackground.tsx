'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CloudBackground() {
  const { scrollY } = useScroll();

  // Parallax multipliers and drift directions for multiple fluffy clouds.
  // Higher vertical factors mean they move down faster relative to scrolling, creating depth.
  const cloud1Y = useTransform(scrollY, [0, 3000], [0, 600]);
  const cloud1X = useTransform(scrollY, [0, 3000], [0, 200]);

  const cloud2Y = useTransform(scrollY, [0, 3000], [0, 1000]);
  const cloud2X = useTransform(scrollY, [0, 3000], [0, -150]);

  const cloud3Y = useTransform(scrollY, [0, 3000], [0, 450]);
  const cloud3X = useTransform(scrollY, [0, 3000], [0, -300]);

  const cloud4Y = useTransform(scrollY, [0, 3000], [0, 1400]);
  const cloud4X = useTransform(scrollY, [0, 3000], [0, 300]);

  return (
    <div className="absolute inset-y-0 left-0 right-0 pointer-events-none overflow-hidden z-0 select-none min-h-full">
      {/* Cloud 1 - Small Fluffy */}
      <motion.div
        className="absolute w-48 h-16 opacity-70"
        style={{
          top: '8%',
          left: '12%',
          y: cloud1Y,
          x: cloud1X,
        }}
      >
        <div className="relative w-full h-full bg-ro-cloud rounded-full shadow-md">
          <div className="absolute w-24 h-24 bg-ro-cloud rounded-full -top-10 left-6" />
          <div className="absolute w-20 h-20 bg-ro-cloud rounded-full -top-6 left-20" />
        </div>
      </motion.div>

      {/* Cloud 2 - Medium-Large Fluffy */}
      <motion.div
        className="absolute w-72 h-20 opacity-80"
        style={{
          top: '22%',
          right: '10%',
          y: cloud2Y,
          x: cloud2X,
        }}
      >
        <div className="relative w-full h-full bg-ro-cloud rounded-full shadow-lg">
          <div className="absolute w-36 h-36 bg-ro-cloud rounded-full -top-16 left-12" />
          <div className="absolute w-28 h-28 bg-ro-cloud rounded-full -top-10 left-36" />
          <div className="absolute w-24 h-24 bg-ro-cloud rounded-full -top-6 left-4" />
        </div>
      </motion.div>

      {/* Cloud 3 - Medium Soft */}
      <motion.div
        className="absolute w-60 h-16 opacity-65"
        style={{
          top: '48%',
          left: '6%',
          y: cloud3Y,
          x: cloud3X,
        }}
      >
        <div className="relative w-full h-full bg-ro-cloud rounded-full shadow-sm">
          <div className="absolute w-24 h-24 bg-ro-cloud rounded-full -top-8 left-10" />
          <div className="absolute w-20 h-20 bg-ro-cloud rounded-full -top-6 left-28" />
        </div>
      </motion.div>

      {/* Cloud 4 - Giant Foreground Cloud */}
      <motion.div
        className="absolute w-96 h-24 opacity-75"
        style={{
          top: '72%',
          right: '12%',
          y: cloud4Y,
          x: cloud4X,
        }}
      >
        <div className="relative w-full h-full bg-ro-cloud rounded-full shadow-xl">
          <div className="absolute w-48 h-48 bg-ro-cloud rounded-full -top-24 left-16" />
          <div className="absolute w-36 h-36 bg-ro-cloud rounded-full -top-14 left-48" />
          <div className="absolute w-32 h-32 bg-ro-cloud rounded-full -top-10 left-4" />
        </div>
      </motion.div>
    </div>
  );
}
