"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// ────────────────────────────────────────────────────────────────────────────
// Pre-computed cloud grids for 100% full-screen coverage.
// We use a single full-screen wrapper for the solid background, and place
// clouds in transparent "groups" that slide apart. 
// This GUARANTEES no straight clipping lines and no background bleed.
// ────────────────────────────────────────────────────────────────────────────

const DESKTOP_LEFT_CLOUDS: any[] = [];
for (let c = 0; c < 4; c++) {
  for (let r = 0; r < 8; r++) {
    const left = -40 + c * 25 + ((r % 2) * 5); // Shifted aggressively left
    const top = -60 + r * 25 + ((c % 2) * 10); // Shifted aggressively up to hide transparent padding
    DESKTOP_LEFT_CLOUDS.push({
      left,
      top,
      size: 75 + (r % 3) * 10,
      dur: 4 + (r % 3) + (c % 2) * 0.5,
      bDir: (r + c) % 2 === 0 ? 1 : -1,
    });
  }
}

const DESKTOP_RIGHT_CLOUDS: any[] = [];
for (let c = 0; c < 4; c++) {
  for (let r = 0; r < 8; r++) {
    const left = 5 + c * 25 + ((r % 2) * 5); // Covers all the way to 105vw
    const top = -60 + r * 25 + ((c % 2) * 10); // Shifted aggressively up
    DESKTOP_RIGHT_CLOUDS.push({
      left,
      top,
      size: 75 + (r % 3) * 10,
      dur: 4.5 + (r % 3) + (c % 2) * 0.5,
      bDir: (r + c) % 2 === 0 ? 1 : -1,
    });
  }
}

const MOBILE_TOP_CLOUDS: any[] = [];
for (let c = 0; c < 5; c++) {
  for (let r = 0; r < 4; r++) {
    const left = -60 + c * 35 + ((r % 2) * 10); // Shifted aggressively left
    const top = -50 + r * 25 + ((c % 2) * 5);   // Shifted aggressively up
    MOBILE_TOP_CLOUDS.push({
      left,
      top,
      size: 110 + (r % 2) * 20,
      dur: 4 + (r % 3) + (c % 2) * 0.5,
      bDir: (r + c) % 2 === 0 ? 1 : -1,
    });
  }
}

const MOBILE_BOTTOM_CLOUDS: any[] = [];
for (let c = 0; c < 5; c++) {
  for (let r = 0; r < 4; r++) {
    const left = -60 + c * 35 + ((r % 2) * 10); // Shifted aggressively left
    const top = 10 + r * 25 + ((c % 2) * 5);    // Shifted up to cover middle gap better
    MOBILE_BOTTOM_CLOUDS.push({
      left,
      top,
      size: 110 + (r % 2) * 20,
      dur: 4.5 + (r % 3) + (c % 2) * 0.5,
      bDir: (r + c) % 2 === 0 ? 1 : -1,
    });
  }
}

export default function CloudTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const wavyText = "ระบบกำลังนำทาง...";
  const characters = wavyText.split("");

  const isDark = mounted && resolvedTheme === "dark";
  const cloudImg = isDark ? "/image/clouds/cloud-night.png" : "/image/clouds/cloud.png";

  // The ROOT wrapper holds the solid color so NO gaps show. 
  // It fades out to transparent as the clouds slide away.
  const rootBg = isDark ? "bg-[#0f172a]" : "bg-[#e8f4f8]";

  const cloudTransition = { duration: 0.8, ease: "easeInOut" as const };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={`fixed inset-0 z-[100] ${rootBg} overflow-hidden`}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0 }} // Fades out slowly along with the clouds sliding
          >
            {/* ══════════════════════════════════════════════════════════
                Desktop Left Group (Transparent Wrapper)
               ══════════════════════════════════════════════════════════ */}
            <motion.div
              className="hidden md:block absolute inset-0"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={cloudTransition}
            >
              {DESKTOP_LEFT_CLOUDS.map((c, i) => (
                <motion.img
                  key={`l-${i}`}
                  src={cloudImg}
                  className="absolute max-w-none object-contain pointer-events-none select-none"
                  style={{
                    top: `${c.top}vh`,
                    left: `${c.left}vw`,
                    width: `${c.size}vw`,
                  }}
                  animate={{ y: [0, c.bDir * 12, 0] }}
                  transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
                  alt=""
                  draggable={false}
                />
              ))}
            </motion.div>

            {/* ══════════════════════════════════════════════════════════
                Desktop Right Group (Transparent Wrapper)
               ══════════════════════════════════════════════════════════ */}
            <motion.div
              className="hidden md:block absolute inset-0"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={cloudTransition}
            >
              {DESKTOP_RIGHT_CLOUDS.map((c, i) => (
                <motion.img
                  key={`r-${i}`}
                  src={cloudImg}
                  className="absolute max-w-none object-contain pointer-events-none select-none"
                  style={{
                    top: `${c.top}vh`,
                    left: `${c.left}vw`,
                    width: `${c.size}vw`,
                  }}
                  animate={{ y: [0, -c.bDir * 12, 0] }}
                  transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
                  alt=""
                  draggable={false}
                />
              ))}
            </motion.div>

            {/* ══════════════════════════════════════════════════════════
                Mobile Top Group (Transparent Wrapper)
               ══════════════════════════════════════════════════════════ */}
            <motion.div
              className="md:hidden absolute inset-0"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={cloudTransition}
            >
              {MOBILE_TOP_CLOUDS.map((c, i) => (
                <motion.img
                  key={`t-${i}`}
                  src={cloudImg}
                  className="absolute max-w-none object-contain pointer-events-none select-none"
                  style={{
                    left: `${c.left}vw`,
                    top: `${c.top}vh`,
                    width: `${c.size}vw`,
                  }}
                  animate={{ x: [0, c.bDir * 12, 0] }}
                  transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
                  alt=""
                  draggable={false}
                />
              ))}
            </motion.div>

            {/* ══════════════════════════════════════════════════════════
                Mobile Bottom Group (Transparent Wrapper)
               ══════════════════════════════════════════════════════════ */}
            <motion.div
              className="md:hidden absolute inset-0"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={cloudTransition}
            >
              {MOBILE_BOTTOM_CLOUDS.map((c, i) => (
                <motion.img
                  key={`b-${i}`}
                  src={cloudImg}
                  className="absolute max-w-none object-contain pointer-events-none select-none"
                  style={{
                    left: `${c.left}vw`,
                    top: `${c.top}vh`,
                    width: `${c.size}vw`,
                  }}
                  animate={{ x: [0, -c.bDir * 12, 0] }}
                  transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
                  alt=""
                  draggable={false}
                />
              ))}
            </motion.div>

            {/* ══════════════════════════════════════════════════════════
                Center Content: Poring + Wavy Text
               ══════════════════════════════════════════════════════════ */}
            <motion.div
              className="absolute inset-0 z-[110] flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/image/chatbot/mock-poring.png"
                alt="Loading Poring"
                className="w-20 h-20 md:w-40 md:h-40 animate-bounce drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
              />

              <div className="flex font-heading md:text-3xl text-xl text-rose-300 dark:text-rose-400 tracking-wider font-semibold drop-shadow-md">
                {characters.map((char, index) => (
                  <motion.span
                    key={index}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
