import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ScoreCircle } from "./ScoreCircle";

import { Sparkles, Leaf, ScanLine } from "lucide-react";

export function PhoneMockup() {
  const [score, setScore] = useState(78);

  useEffect(() => {
    const randomScore = Math.floor(Math.random() * (95 - 25 + 1)) + 25;

    setScore(randomScore);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="relative mx-auto"
    >
      {/* Floating Left Card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="glass absolute -left-10 top-14 z-20 hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:block lg:-left-20"
      >
        <div className="text-[12px] text-zinc-400 font-outfit">Daily Goal</div>

        <div className="text-2xl font-bold text-white font-outfit">87%</div>
      </motion.div>

      {/* Floating Right Card */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="glass absolute -right-10 bottom-20 z-20 hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:block lg:-right-20"
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

          <ScanLine className="h-4 w-4 text-green-400" />

          <span className="text-[12px] font-outfit text-white">Live scan</span>
        </div>
      </motion.div>

      {/* Phone Body */}
      <div
        className="
          relative
          w-70
          sm:w-[320px]
          rounded-[3rem]
          border
          border-white/10
          bg-black/80
          p-3
          shadow-[0_0_60px_rgba(132,204,22,0.15)]
          backdrop-blur-2xl
        "
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-linear-to-br from-green-500/10 via-transparent to-emerald-400/10 blur-2xl" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/90 p-6">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-outfit">
                Scan Result
              </div>

              <div className="mt-1 text-sm font-semibold text-white font-outfit">
                Nutrition Analysis
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Score */}
          <div className="flex justify-center py-4">
            <ScoreCircle score={score} size={170} />
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
              <div className="text-[11px] uppercase tracking-wide text-zinc-500 font-outfit">
                Sugar
              </div>

              <div className="mt-1 text-lg font-semibold text-green-400 font-outfit">
                Low
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-xl">
              <div className="text-[11px] uppercase tracking-wide text-zinc-500 font-outfit">
                Protein
              </div>

              <div className="mt-1 text-lg font-semibold text-emerald-300 font-outfit">
                High
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 backdrop-blur-xl">
            <Leaf className="h-5 w-5 text-green-400" />

            <span className="text-sm text-white font-outfit">
              Great choice for your fitness goals
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
