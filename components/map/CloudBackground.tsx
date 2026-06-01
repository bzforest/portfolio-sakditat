'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** A single realistic cloud made of multiple blurred radial-gradient blobs */
function CloudBlob({
  width,
  style,
  opacity = 0.88,
}: {
  width: number;
  style?: React.CSSProperties;
  opacity?: number;
}) {
  const h = Math.round(width * 0.42);

  return (
    <div
      style={{
        position: 'absolute',
        width,
        height: h,
        opacity,
        ...style,
      }}
    >
      {/* Base layer — wide, soft ellipse */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse 100% 60% at 50% 70%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.0) 100%)',
        filter: 'blur(6px)',
      }} />
      {/* Left puff */}
      <div style={{
        position: 'absolute',
        width: '52%', height: '130%',
        top: '-40%', left: '8%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.96) 30%, rgba(255,255,255,0) 80%)',
        filter: 'blur(5px)',
      }} />
      {/* Center puff (tallest) */}
      <div style={{
        position: 'absolute',
        width: '50%', height: '160%',
        top: '-65%', left: '28%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0) 75%)',
        filter: 'blur(4px)',
      }} />
      {/* Right puff */}
      <div style={{
        position: 'absolute',
        width: '44%', height: '120%',
        top: '-30%', right: '5%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.93) 25%, rgba(255,255,255,0) 75%)',
        filter: 'blur(6px)',
      }} />
      {/* Soft shadow at bottom */}
      <div style={{
        position: 'absolute',
        width: '80%', height: '30%',
        bottom: '-8%', left: '10%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(180,210,240,0.35) 0%, transparent 70%)',
        filter: 'blur(8px)',
      }} />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CloudBackground() {
  const { scrollY } = useScroll();

  /* Each cloud layer has its own parallax speed — faster = closer "foreground" */
  const y1 = useTransform(scrollY, [0, 3000], [0,  400]);
  const x1 = useTransform(scrollY, [0, 3000], [0,  120]);

  const y2 = useTransform(scrollY, [0, 3000], [0,  700]);
  const x2 = useTransform(scrollY, [0, 3000], [0, -180]);

  const y3 = useTransform(scrollY, [0, 3000], [0,  300]);
  const x3 = useTransform(scrollY, [0, 3000], [0, -240]);

  const y4 = useTransform(scrollY, [0, 3000], [0, 1000]);
  const x4 = useTransform(scrollY, [0, 3000], [0,  260]);

  const y5 = useTransform(scrollY, [0, 3000], [0,  550]);
  const x5 = useTransform(scrollY, [0, 3000], [0, -80]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">

      {/* Cloud 1 — small, high, fast (far background) */}
      <motion.div style={{ position: 'absolute', top: '6%', left: '8%', y: y1, x: x1 }}>
        <CloudBlob width={220} opacity={0.70} />
      </motion.div>

      {/* Cloud 2 — large, right side */}
      <motion.div style={{ position: 'absolute', top: '16%', right: '7%', y: y2, x: x2 }}>
        <CloudBlob width={380} opacity={0.82} />
      </motion.div>

      {/* Cloud 3 — medium, left mid */}
      <motion.div style={{ position: 'absolute', top: '38%', left: '4%', y: y3, x: x3 }}>
        <CloudBlob width={280} opacity={0.65} />
      </motion.div>

      {/* Cloud 4 — very large, lower foreground */}
      <motion.div style={{ position: 'absolute', top: '60%', right: '5%', y: y4, x: x4 }}>
        <CloudBlob width={480} opacity={0.78} />
      </motion.div>

      {/* Cloud 5 — small accent, center-top */}
      <motion.div style={{ position: 'absolute', top: '3%', left: '40%', y: y5, x: x5 }}>
        <CloudBlob width={180} opacity={0.60} />
      </motion.div>

    </div>
  );
}
