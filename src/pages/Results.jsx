import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Flame,
  Wheat,
  Leaf,
  Droplet,
  ScanLine,
  Sparkles,
  Candy,
  Drumstick,
  AlertTriangle,
  CheckCircle2,
  Activity,
  TestTube,
} from "lucide-react";

import {
  calculateHealthScore,
  ScoreCircle,
} from "../Components/NutriScore.jsx";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const [averageScore, setAverageScore] = useState(0);
  const [scanCount, setScanCount] = useState(0);
  const [prevBest, setPrevBest] = useState(0);
  const [streak, setStreak] = useState(0);

  const hasAddedScore = useRef(false);

  const product = location.state?.product;
  const nutriments = product?.nutriments || {};

  const currentScore = product ? calculateHealthScore(nutriments) : 0;

  // --- STATE MANAGEMENT LOGIC ---
  useEffect(() => {
    if (product && !hasAddedScore.current) {
      const savedLastScan = localStorage.getItem("lastScanDate");
      let currentStreak = Number(localStorage.getItem("myStreak") || 0);
      const today = new Date();

      if (savedLastScan) {
        const lastScan = new Date(savedLastScan);
        const todayMidNight = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
        const lastScanMidNight = new Date(
          lastScan.getFullYear(),
          lastScan.getMonth(),
          lastScan.getDate(),
        );

        const diff = todayMidNight.getTime() - lastScanMidNight.getTime();
        const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak += 1;
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      localStorage.setItem("myStreak", currentStreak);
      localStorage.setItem("lastScanDate", today.toISOString());
      setStreak(currentStreak);

      const savedSum = Number(localStorage.getItem("myScoreSum") || 0);
      const savedCount = Number(localStorage.getItem("myScanCount") || 0);
      const savedPrevBest = Number(localStorage.getItem("myPrevBest") || 0);

      const newSum = savedSum + currentScore;
      const newCount = savedCount + 1;
      const newAverage = newSum / newCount;
      const newBest = Math.max(savedPrevBest, currentScore);

      localStorage.setItem("myScoreSum", newSum);
      localStorage.setItem("myAverage", newAverage);
      localStorage.setItem("myScanCount", newCount);
      localStorage.setItem("myPrevBest", newBest);

      setAverageScore(newAverage);
      setScanCount(newCount);
      setPrevBest(newBest);

      hasAddedScore.current = true;
    } else if (!hasAddedScore.current) {
      setStreak(Number(localStorage.getItem("myStreak") || 0));
    }
  }, [product, currentScore]);

  if (!product) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center text-white p-6 bg-zinc-950">
        <p className="text-zinc-400 mb-4 font-outfit">No product data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-green-400 text-black rounded-xl font-medium font-outfit"
        >
          Go Back to Scanner
        </button>
      </div>
    );
  }

  // --- HELPER FUNCTIONS ---

  const getVal = (key) => nutriments[`${key}_100g`] || 0;

  const getNutrientStr = (key) => {
    // Some regions use 'salt' instead of 'sodium', so we fallback if needed
    if (
      key === "sodium" &&
      nutriments[`sodium_100g`] === undefined &&
      nutriments[`salt_100g`] !== undefined
    ) {
      const saltVal = nutriments[`salt_100g`];
      return `${(saltVal / 2.5).toFixed(2)}g`; // Convert salt to sodium
    }
    const val = nutriments[`${key}_100g`];
    return val !== undefined
      ? `${Number.isInteger(val) ? val : val.toFixed(1)}${nutriments[`${key}_unit`] || "g"}`
      : "N/A";
  };

  const getTheme = (score) => {
    if (score >= 75)
      return {
        color: "text-green-400",
        border: "border-green-500/30",
        cardBg: "bg-gradient-to-b from-green-500/10 to-black/60",
        shadow: "shadow-[0_0_40px_rgba(74,222,128,0.15)]",
        badgeBg: "bg-green-500/10",
        icon: <CheckCircle2 className="h-5 w-5 text-green-400" />,
        text: "Great choice for your goals!",
      };
    if (score >= 50)
      return {
        color: "text-yellow-400",
        border: "border-yellow-500/30",
        cardBg: "bg-gradient-to-b from-yellow-500/10 to-black/60",
        shadow: "shadow-[0_0_40px_rgba(250,204,21,0.15)]",
        badgeBg: "bg-yellow-500/10",
        icon: <Activity className="h-5 w-5 text-yellow-400" />,
        text: "Moderate impact. Consume in moderation.",
      };
    return {
      color: "text-red-400",
      border: "border-red-500/30",
      cardBg: "bg-gradient-to-b from-red-500/10 to-black/60",
      shadow: "shadow-[0_0_40px_rgba(248,113,113,0.15)]",
      badgeBg: "bg-red-500/10",
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      text: "Highly processed. Seek alternatives.",
    };
  };

  // Expanded intelligence to analyze the new nutrients!
  const analyzeNutrient = (val, type) => {
    if (type === "sugar")
      return val > 22.5
        ? { text: "High", color: "text-red-400" }
        : val > 5
          ? { text: "Med", color: "text-yellow-400" }
          : { text: "Low", color: "text-green-400" };
    if (type === "fat")
      return val > 17.5
        ? { text: "High", color: "text-red-400" }
        : val > 3
          ? { text: "Med", color: "text-yellow-400" }
          : { text: "Low", color: "text-green-400" };
    if (type === "saturated-fat")
      return val > 5
        ? { text: "High", color: "text-red-400" }
        : val > 1.5
          ? { text: "Med", color: "text-yellow-400" }
          : { text: "Low", color: "text-green-400" };
    if (type === "sodium")
      return val > 0.6
        ? { text: "High", color: "text-red-400" }
        : val > 0.12
          ? { text: "Med", color: "text-yellow-400" }
          : { text: "Low", color: "text-green-400" };

    if (type === "fiber")
      return val >= 6
        ? { text: "High", color: "text-green-400" }
        : val >= 3
          ? { text: "Good", color: "text-emerald-300" }
          : { text: "Low", color: "text-zinc-500" };
    if (type === "protein")
      return val > 10
        ? { text: "High", color: "text-green-400" }
        : { text: "Normal", color: "text-zinc-300" };
    return { text: "", color: "text-zinc-300" }; // Default fallback
  };

  const theme = getTheme(currentScore);

  // --- ANIMATION VARIANTS ---
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-dvh  text-white overflow-x-hidden pb-20 relative">
      {/* Header */}
      <header className="sticky top-0 z-50 p-2 flex items-center justify-between border-b border-white/5 ">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-zinc-300" />
          </button>
        </div>
        <Link
          to="/scan"
          className="p-3 rounded-full hover:bg-white/5 transition-colors flex items-center gap-2"
        >
          <ScanLine className="w-5 h-5 text-zinc-300" />
          <span className="text-sm font-medium text-zinc-300 font-chillax sm:block">
            Scan Another
          </span>
        </Link>
      </header>

      <main className="p-5 max-w-lg mx-auto relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* --- TOP PRODUCT CARD --- */}
          <motion.div
            variants={item}
            className={`relative overflow-hidden rounded-[2.5rem] border ${theme.border} ${theme.cardBg} ${theme.shadow} p-6  transition-colors duration-700`}
          >
            {/* Tagline */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-outfit">
                  Scan Result
                </div>
                <div className="mt-1 text-sm font-semibold text-white font-outfit">
                  Nutrition Analysis
                </div>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${theme.badgeBg} border ${theme.border}`}
              >
                <Sparkles className={`h-5 w-5 ${theme.color}`} />
              </div>
            </div>

            {/* Product Image & Details */}
            <div className="flex flex-col items-center text-center w-full mb-8">
              {product.image_front_url ? (
                <img
                  src={product.image_front_url}
                  alt={product.product_name}
                  className="w-28 h-28 object-contain bg-white/5 rounded-2xl p-3 mb-4 border border-white/10 shadow-inner"
                />
              ) : (
                <div className="w-28 h-28 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                  <span className="text-[10px] text-zinc-500 uppercase font-outfit tracking-wider">
                    No Image
                  </span>
                </div>
              )}

              <h1 className="text-2xl font-black text-white leading-tight font-outfit tracking-tight">
                {product.product_name || "Unknown Product"}
              </h1>
              <p className="text-sm text-zinc-400 mt-1.5 font-outfit font-medium">
                {product.brands || "Unknown Brand"}
              </p>
            </div>

            {/* BIG Score Circle */}
            <div className="flex justify-center py-2 shrink-0 scale-110 sm:scale-125 mb-4">
              <ScoreCircle score={currentScore} size={220} />
            </div>

            {/* Verdict Banner */}
            <div
              className={`mt-8 flex items-center gap-3 rounded-2xl border ${theme.border} ${theme.badgeBg} p-4`}
            >
              {theme.icon}
              <span className="text-lg text-white font-outfit font-medium">
                {theme.text}
              </span>
            </div>
          </motion.div>

          {/* --- NUTRITION FACTS CARDS (Expanded 2x4 Grid) --- */}
          <motion.div variants={container} className="grid grid-cols-2 gap-3">
            {/* Calories Card */}
            <motion.div
              variants={item}
              className={`rounded-3xl border ${theme.border} ${theme.cardBg} ${theme.shadow} p-4 backdrop-blur-xl flex flex-col transition-colors duration-700`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <div className="text-[11px] uppercase tracking-wide text-zinc-400 font-outfit font-medium">
                  Calories
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-xl sm:text-2xl font-bold text-orange-400 font-outfit">
                  {getVal("energy-kcal")}
                  <span className="text-[10px] sm:text-xs text-zinc-400 ml-1">
                    kcal
                  </span>
                </span>
              </div>
            </motion.div>

            {/* Protein Card */}
            <motion.div
              variants={item}
              className={`rounded-3xl border ${theme.border} ${theme.cardBg} ${theme.shadow} p-4 backdrop-blur-xl flex flex-col transition-colors duration-700`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Drumstick className="w-4 h-4 text-zinc-400" />
                <div className="text-[11px] uppercase tracking-wide text-zinc-400 font-outfit font-medium">
                  Protein
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-xl sm:text-2xl font-bold font-outfit text-white">
                  {getNutrientStr("proteins")}
                </span>
                <span
                  className={`text-xs font-semibold font-outfit mb-1 ${analyzeNutrient(getVal("proteins"), "protein").color}`}
                >
                  {analyzeNutrient(getVal("proteins"), "protein").text}
                </span>
              </div>
            </motion.div>

            {/* Carbs Card */}
            <motion.div
              variants={item}
              className={`rounded-3xl border ${theme.border} ${theme.cardBg} ${theme.shadow} p-4 backdrop-blur-xl flex flex-col transition-colors duration-700`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Wheat className="w-4 h-4 text-zinc-400" />
                <div className="text-[11px] uppercase tracking-wide text-zinc-400 font-outfit font-medium">
                  Carbs
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-xl sm:text-2xl font-bold font-outfit text-white">
                  {getNutrientStr("carbohydrates")}
                </span>
              </div>
            </motion.div>

            {/* Sugar Card */}
            <motion.div
              variants={item}
              className={`rounded-3xl border ${theme.border} ${theme.cardBg} ${theme.shadow} p-4 backdrop-blur-xl flex flex-col transition-colors duration-700`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Candy className="w-4 h-4 text-zinc-400" />
                <div className="text-[11px] uppercase tracking-wide text-zinc-400 font-outfit font-medium">
                  Sugar
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-xl sm:text-2xl font-bold font-outfit text-white">
                  {getNutrientStr("sugars")}
                </span>
                <span
                  className={`text-xs font-semibold font-outfit mb-1 ${analyzeNutrient(getVal("sugars"), "sugar").color}`}
                >
                  {analyzeNutrient(getVal("sugars"), "sugar").text}
                </span>
              </div>
            </motion.div>

            {/* Total Fat Card */}
            <motion.div
              variants={item}
              className={`rounded-3xl border ${theme.border} ${theme.cardBg} ${theme.shadow} p-4 backdrop-blur-xl flex flex-col transition-colors duration-700`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-4 h-4 text-zinc-400" />
                <div className="text-[11px] uppercase tracking-wide text-zinc-400 font-outfit font-medium">
                  Total Fat
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-xl sm:text-2xl font-bold font-outfit text-white">
                  {getNutrientStr("fat")}
                </span>
                <span
                  className={`text-xs font-semibold font-outfit mb-1 ${analyzeNutrient(getVal("fat"), "fat").color}`}
                >
                  {analyzeNutrient(getVal("fat"), "fat").text}
                </span>
              </div>
            </motion.div>

            {/* Saturated Fat Card */}
            <motion.div
              variants={item}
              className={`rounded-3xl border ${theme.border} ${theme.cardBg} ${theme.shadow} p-4 backdrop-blur-xl flex flex-col transition-colors duration-700`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-4 h-4 text-rose-400/80" />
                <div className="text-[11px] uppercase tracking-wide text-zinc-400 font-outfit font-medium">
                  Sat. Fat
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-xl sm:text-2xl font-bold font-outfit text-white">
                  {getNutrientStr("saturated-fat")}
                </span>
                <span
                  className={`text-xs font-semibold font-outfit mb-1 ${analyzeNutrient(getVal("saturated-fat"), "saturated-fat").color}`}
                >
                  {
                    analyzeNutrient(getVal("saturated-fat"), "saturated-fat")
                      .text
                  }
                </span>
              </div>
            </motion.div>

            {/* Fiber Card */}
            <motion.div
              variants={item}
              className={`rounded-3xl border ${theme.border} ${theme.cardBg} ${theme.shadow} p-4 backdrop-blur-xl flex flex-col transition-colors duration-700`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-zinc-400" />
                <div className="text-[11px] uppercase tracking-wide text-zinc-400 font-outfit font-medium">
                  Fiber
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-xl sm:text-2xl font-bold font-outfit text-white">
                  {getNutrientStr("fiber")}
                </span>
                <span
                  className={`text-xs font-semibold font-outfit mb-1 ${analyzeNutrient(getVal("fiber"), "fiber").color}`}
                >
                  {analyzeNutrient(getVal("fiber"), "fiber").text}
                </span>
              </div>
            </motion.div>

            {/* Sodium Card */}
            <motion.div
              variants={item}
              className={`rounded-3xl border ${theme.border} ${theme.cardBg} ${theme.shadow} p-4 backdrop-blur-xl flex flex-col transition-colors duration-700`}
            >
              <div className="flex items-center gap-2 mb-2">
                <TestTube className="w-4 h-4 text-zinc-400" />
                <div className="text-[11px] uppercase tracking-wide text-zinc-400 font-outfit font-medium">
                  Sodium
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-xl sm:text-2xl font-bold font-outfit text-white">
                  {/* Sodium requires checking if it exists, fallback handles this smoothly */}
                  {getNutrientStr("sodium")}
                </span>
                <span
                  className={`text-xs font-semibold font-outfit mb-1 ${analyzeNutrient(getVal("sodium"), "sodium").color}`}
                >
                  {analyzeNutrient(getVal("sodium"), "sodium").text}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
