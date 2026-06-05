import React, { useEffect, useState } from "react";

export function getScoreStatus(score) {
  if (score <= 40)
    return { label: "SKIP IT", color: "#ef4444", glow: "#f87171" };
  if (score <= 70)
    return { label: "MODERATE", color: "#f59e0b", glow: "#fbbf24" };
  return { label: "BUY IT", color: "#84cc16", glow: "#4ade80" };
}

// ─── Per-goal nutrient weight multipliers ─────────────────────────────────────
// Each key scales the penalty or bonus for that nutrient.
// calW / sugarW / fatW / sodiumW / carbW  → penalty multipliers (higher = harsher)
// proteinW / fiberW / microsW             → bonus  multipliers (higher = more credit)
// carbW < 0 → carbs treated as a bonus   (used for Build Endurance)
export const GOAL_WEIGHTS = {
  "Weight Loss":         { calW: 2.0,  sugarW: 1.5, fatW: 1.5,  sodiumW: 1.0, carbW:  0,    proteinW: 1.0, fiberW: 1.5, microsW: 1.0 },
  "Muscle Gain":         { calW: 0.5,  sugarW: 1.0, fatW: 0.8,  sodiumW: 1.0, carbW:  0,    proteinW: 3.0, fiberW: 1.0, microsW: 1.5 },
  "Maintain Weight":     { calW: 1.2,  sugarW: 1.2, fatW: 1.0,  sodiumW: 1.0, carbW:  0,    proteinW: 1.0, fiberW: 1.2, microsW: 1.0 },
  "Heart Health":        { calW: 1.0,  sugarW: 1.0, fatW: 2.5,  sodiumW: 2.0, carbW:  0,    proteinW: 1.0, fiberW: 2.0, microsW: 1.5 },
  "Diabetes Management": { calW: 1.0,  sugarW: 3.0, fatW: 1.5,  sodiumW: 1.0, carbW:  1.0,  proteinW: 1.0, fiberW: 2.5, microsW: 1.0 },
  "Improve Energy":      { calW: 0.8,  sugarW: 1.5, fatW: 1.0,  sodiumW: 1.0, carbW:  0,    proteinW: 1.5, fiberW: 1.5, microsW: 2.0 },
  "Better Sleep":        { calW: 1.0,  sugarW: 1.5, fatW: 1.0,  sodiumW: 1.0, carbW:  0,    proteinW: 1.0, fiberW: 1.0, microsW: 1.5 },
  "Build Endurance":     { calW: 0.7,  sugarW: 0.8, fatW: 1.0,  sodiumW: 0.8, carbW: -1.0,  proteinW: 1.5, fiberW: 1.5, microsW: 2.0 },
  "Reduce Cholesterol":  { calW: 1.0,  sugarW: 1.0, fatW: 3.0,  sodiumW: 1.5, carbW:  0,    proteinW: 1.0, fiberW: 2.5, microsW: 1.0 },
  "Gut Health":          { calW: 1.0,  sugarW: 1.5, fatW: 1.0,  sodiumW: 1.0, carbW:  0,    proteinW: 1.5, fiberW: 3.0, microsW: 1.5 },
};

const DEFAULT_WEIGHTS = { calW: 1.0, sugarW: 1.0, fatW: 1.0, sodiumW: 1.0, carbW: 0, proteinW: 1.0, fiberW: 1.0, microsW: 1.0 };

// Average the weights of all active goals; fall back to defaults if none match.
export function resolveWeights(goals = []) {
  const active = goals.filter(g => GOAL_WEIGHTS[g]).map(g => GOAL_WEIGHTS[g]);
  if (active.length === 0) return { ...DEFAULT_WEIGHTS };
  const merged = {};
  for (const key of Object.keys(DEFAULT_WEIGHTS)) {
    merged[key] = active.reduce((sum, gw) => sum + (gw[key] ?? DEFAULT_WEIGHTS[key]), 0) / active.length;
  }
  return merged;
}

export function calculateHealthScore(nutriments = {}, goals = []) {
  const n = (key) => {
    const val = nutriments[`${key}_100g`];
    return val !== undefined ? parseFloat(val) : 0;
  };

  const fat      = n("fat");
  const sodium   = n("sodium");
  const sugar    = n("sugars");
  const protein  = n("proteins");
  const fiber    = n("fiber");
  const carbs    = n("carbohydrates");
  const calories = n("energy-kcal") || n("energy_kcal");
  const micros   = n("vitamin_d") + n("calcium") + n("iron") + n("potassium");

  const w = resolveWeights(goals);

  // carbEffect can be negative (bonus) for endurance goals
  const carbEffect = Math.floor((carbs / 10) * w.carbW);

  const penaltyPoints =
    Math.floor((fat     / 2)  * w.fatW)    +
    Math.floor((sugar   / 2)  * w.sugarW)  +
    Math.floor((sodium  / 5)  * w.sodiumW) +
    Math.floor((calories/ 25) * w.calW)    +
    carbEffect;

  const bonusPoints =
    Math.floor((protein / 5) * w.proteinW) +
    Math.floor((fiber   / 5) * w.fiberW)   +
    Math.floor((micros  / 5) * w.microsW);

  return Math.max(0, Math.min(100, 100 - penaltyPoints + bonusPoints));
}

// The UI Component
export function ScoreCircle({ score, size = 220, label }) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const safe = Math.max(0, Math.min(100, score || 0));
  const [offset, setOffset] = useState(circumference);
  const status = getScoreStatus(safe);

  useEffect(() => {
    const targetOffset = circumference - (safe / 100) * circumference;
    const timer = setTimeout(() => setOffset(targetOffset), 100);
    return () => clearTimeout(timer);
  }, [safe, circumference]);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="scoreGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={status.glow} />
            <stop offset="100%" stopColor={status.color} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="oklch(1 0 0 / 0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#scoreGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display text-5xl font-bold tracking-tight"
          style={{ color: status.color }}
        >
          {Math.round(safe)}
        </span>
        <span className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {label ?? "Score"}
        </span>
        <span
          className="mt-3 rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-widest"
          style={{
            backgroundColor: `color-mix(in oklab, ${status.color} 18%, transparent)`,
            color: status.color,
            border: `1px solid ${status.color}30`,
          }}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
}
