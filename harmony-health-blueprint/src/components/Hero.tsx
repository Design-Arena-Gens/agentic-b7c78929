"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const phrases = [
  "brain",
  "heart",
  "body",
  "beauty",
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/80 p-10 shadow-[0_32px_80px_-48px_rgba(24,23,20,0.55)] backdrop-blur-xl md:p-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white to-[#f2ece2]" />
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#3d7c6e]/30 to-[#caa36a]/20 blur-2xl md:h-52 md:w-52" />
      <div className="absolute bottom-10 right-10 hidden h-20 w-20 rounded-full border border-[#caa36a]/50 md:block" />

      <div className="flex flex-col gap-6 md:gap-8">
        <p className="text-sm uppercase tracking-[0.32em] text-[#3d7c6e]">
          Mary&apos;s Digital Lab presents
        </p>
        <h1 className="max-w-2xl font-display text-4xl leading-tight text-[#1d1c1a] md:text-6xl">
          Harmony Health Blueprint
        </h1>

        <div className="relative inline-flex items-center gap-3">
          <span className="text-base uppercase tracking-[0.32em] text-[#caa36a]">
            Align
          </span>
          <motion.span
            key={phrases[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-full bg-[#3d7c6e]/10 px-4 py-1 font-display text-xl text-[#3d7c6e]"
          >
            {phrases[index]}
          </motion.span>
        </div>

        <p className="max-w-xl text-lg leading-relaxed text-[#4c4b48] md:text-xl">
          A minimalist-luxury digital guide for beautifully busy lives. Craft
          one elegant shift at a time with evidence-informed rituals, nourishing
          tonics, and mindful tracking to sustain luminous wellbeing.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#download"
            className="group inline-flex items-center justify-center rounded-full border border-[#caa36a]/70 bg-[#1d1c1a] px-6 py-3 text-sm uppercase tracking-[0.24em] text-white transition duration-300 hover:shadow-[0_18px_40px_-25px_rgba(0,0,0,0.4)]"
          >
            Download Minimalist PDF
          </a>
          <span className="text-sm uppercase tracking-[0.32em] text-[#4c4b48]">
            Optional audio bundle included
          </span>
        </div>
      </div>
    </section>
  );
}
