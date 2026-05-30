import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Ollama } from "ollama";
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
  OctagonAlert,
  Dot,
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
  const [insights, setInsights] = useState(null);

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
        <p className="text-zinc-400 mb-4 font-outfit text-lg">
          No product data found.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full font-bold font-outfit transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          Go Back to Scanner
        </button>
      </div>
    );
  }

  // --- HELPER FUNCTIONS ---
  const getVal = (key) => nutriments[`${key}_100g`] || 0;

  const getNutrientStr = (key) => {
    if (
      key === "sodium" &&
      nutriments[`sodium_100g`] === undefined &&
      nutriments[`salt_100g`] !== undefined
    ) {
      const saltVal = nutriments[`salt_100g`];
      return `${(saltVal / 2.5).toFixed(2)}g`;
    }
    const val = nutriments[`${key}_100g`];
    return val !== undefined
      ? `${Number.isInteger(val) ? val : val.toFixed(1)}${nutriments[`${key}_unit`] || "g"}`
      : "N/A";
  };

  // Allergens Helper
  const rawAllergens = product.allergens_tags || [];
  const rawTraces = product.traces_tags || [];
  const rawAnalysis = product.ingredients_analysis_tags || [];

  const Cleaner = (tag) => tag.replace(/^en:/, "").replace(/-/g, " ");

  const cleanAllergens = rawAllergens.map(Cleaner);
  const cleanTraces = rawTraces.map(Cleaner);
  const cleanAnalysis = rawAnalysis.map(Cleaner);
  const hasAllergens = cleanAllergens.length > 0;

  const getTheme = (score) => {
    if (score >= 75)
      return {
        color: "text-emerald-400",
        border: "border-emerald-500/20",
        shadow: "shadow-[0_0_40px_rgba(16,185,129,0.1)]",
        glow: (
          <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-linear-to-br from-emerald-500/10 via-transparent to-green-400/5 blur-3xl" />
        ),
        badgeBg: "bg-emerald-500/10",
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
        text: "Great choice for your goals!",
      };
    if (score >= 50)
      return {
        color: "text-amber-400",
        border: "border-amber-500/20",
        shadow: "shadow-[0_0_40px_rgba(245,158,11,0.1)]",
        glow: (
          <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-linear-to-br from-amber-500/10 via-transparent to-yellow-400/5 blur-3xl" />
        ),
        badgeBg: "bg-amber-500/10",
        icon: <Activity className="h-5 w-5 text-amber-400" />,
        text: "Moderate impact. Consume in moderation.",
      };
    return {
      color: "text-rose-400",
      border: "border-rose-500/20",
      shadow: "shadow-[0_0_40px_rgba(244,63,94,0.1)]",
      glow: (
        <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-linear-to-br from-rose-500/10 via-transparent to-red-400/5 blur-3xl" />
      ),
      badgeBg: "bg-rose-500/10",
      icon: <AlertTriangle className="h-5 w-5 text-rose-400" />,
      text: "Highly processed. Seek alternatives.",
    };
  };

  const analyzeNutrient = (val, type) => {
    if (type === "sugar")
      return val > 22.5
        ? { text: "High", color: "text-rose-400" }
        : val > 5
          ? { text: "Med", color: "text-amber-400" }
          : { text: "Low", color: "text-emerald-400" };
    if (type === "fat")
      return val > 17.5
        ? { text: "High", color: "text-rose-400" }
        : val > 3
          ? { text: "Med", color: "text-amber-400" }
          : { text: "Low", color: "text-emerald-400" };
    if (type === "saturated-fat")
      return val > 5
        ? { text: "High", color: "text-rose-400" }
        : val > 1.5
          ? { text: "Med", color: "text-amber-400" }
          : { text: "Low", color: "text-emerald-400" };
    if (type === "sodium")
      return val > 0.6
        ? { text: "High", color: "text-rose-400" }
        : val > 0.12
          ? { text: "Med", color: "text-amber-400" }
          : { text: "Low", color: "text-emerald-400" };
    if (type === "fiber")
      return val >= 6
        ? { text: "High", color: "text-emerald-400" }
        : val >= 3
          ? { text: "Good", color: "text-emerald-300" }
          : { text: "Low", color: "text-zinc-500" };
    if (type === "protein")
      return val > 10
        ? { text: "High", color: "text-emerald-400" }
        : { text: "Normal", color: "text-zinc-400" };
    return { text: "", color: "text-zinc-400" };
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

  useEffect(() => {
    // Safety check
    if (!product) return;

    const generateInsights = async () => {
      const uPrompt = `Analyze this product and speak to the user as a friendly AI nutritionist. 
      
      Product Data:
      Name: ${product.product_name} by ${product.brands}
      Score: ${currentScore}/100
      Calories: ${getVal("energy-kcal")} kcal
      Protein: ${getNutrientStr("proteins")} | Sugar: ${getNutrientStr("sugars")} | Fat: ${getNutrientStr("fat")} | Fiber: ${getNutrientStr("fiber")} | Sodium: ${getNutrientStr("sodium")}
      
      CRITICAL RULES:
      - EXACTLY 5 lines total.
      - MAXIMUM 10 to 15 words per line.
      - 1 SHORT SENTENCE per point. No filler.
      - PLAIN TEXT ONLY. No markdown, asterisks, or hashes.
      
      OUTPUT STRUCTURE (Fill this in based on the Product Data above):
      1. Verdict: (Give a 1-sentence personalized greeting and verdict with an emoji)
      2. The Good: (1 sentence highlighting the best nutritional feature of this specific product)
      3. The Catch: (1 sentence pointing out the worst nutritional feature)
      4. Decision: (State "BUY" or "DO NOT BUY" with a 1-sentence reason)
      5. Alternatives: (Suggest 2 specific healthier alternative food types in 1 or 2 sentence)
      `;

      try {
        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            },
            body: JSON.stringify({
              model: "llama-3.1-8b-instant",
              messages: [
                {
                  role: "system",
                  content:
                    "You are NutriBot, a friendly AI nutritionist inside the NutriScan app. Speak in a conversational, caring, and direct tone directly to the user. Use plain text ONLY. DO NOT use markdown, asterisks, or hash symbols. Keep it under 150 words.",
                },
                {
                  role: "user",
                  content: uPrompt,
                },
              ],
              stream: false,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("API Error details:", data);
          throw new Error(
            data.error?.message || `HTTP error! status: ${response.status}`,
          );
        }

        const content = data.choices?.[0]?.message?.content;

        if (!content) {
          throw new Error("API responded, but missing expected content.");
        }

        const cleanContent = content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .replace(/\*/g, "")
          .replace(/#/g, "")
          .trim();

        setInsights(cleanContent);
      } catch (error) {
        console.error("Nutritionist Out of Advice:", error);

        setInsights(
          "Our AI nutritionist is taking a quick break! 🧘‍♀️ Please try scanning again in a moment.",
        );
      }
    };

    generateInsights();
  }, [product, currentScore]);

  return (
    <div className="min-h-dvh text-white overflow-x-hidden pb-20 relative selection:bg-emerald-500/30">
      {/* Header - Added Glassmorphism */}
      <header className="sticky top-0 z-50 p-2 px-4 flex items-center justify-between border-b border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 text-sm font-outfit font-medium transition-colors flex items-center gap-1 text-zinc-300"
        >
          <ChevronLeft className="w-5 h-5" /> BACK
        </button>
        <Link
          to="/scan"
          className="p-2 rounded-full hover:bg-white/10 text-sm font-outfit font-medium transition-colors flex items-center gap-2 text-zinc-300"
        >
          <ScanLine className="w-4 h-4" /> SCAN AGAIN
        </Link>
      </header>

      <main className="p-4 sm:p-6 max-w-lg mx-auto relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* --- TOP PRODUCT CARD --- */}
          <motion.div
            variants={item}
            className={`relative overflow-hidden rounded-[2.5rem] border ${theme.border} ${theme.shadow} bg-zinc-900/80 backdrop-blur-md p-6 sm:p-8 transition-colors duration-700`}
          >
            {theme.glow}

            <div className="mb-6 flex items-center justify-between relative z-10">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-outfit font-semibold">
                  Scan Result
                </div>
                <div className="mt-1 text-sm font-bold text-white font-outfit">
                  Nutrition Analysis
                </div>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${theme.badgeBg} border ${theme.border}`}
              >
                <Sparkles className={`h-5 w-5 ${theme.color}`} />
              </div>
            </div>

            <div className="flex flex-col items-center text-center w-full mb-8 relative z-10">
              {product.image_front_url ? (
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-white/10 blur-xl rounded-full"></div>
                  <img
                    src={product.image_front_url}
                    alt={product.product_name}
                    className="w-28 h-28 object-contain bg-white rounded-2xl p-2 border border-white/10 shadow-xl relative z-10"
                  />
                </div>
              ) : (
                <div className="w-28 h-28 bg-zinc-800/80 rounded-2xl flex items-center justify-center mb-4 border border-white/5 shadow-inner">
                  <span className="text-[10px] text-zinc-500 uppercase font-outfit tracking-wider">
                    No Image
                  </span>
                </div>
              )}
              <p className="text-sm text-zinc-400 mt-2 font-outfit font-medium">
                {product.brands || "Unknown Brand"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight font-outfit tracking-tight">
                {product.product_name || "Unknown Product"}
              </h1>
              <div className="flex gap-1">
                <p className="text-sm text-zinc-400 mt-2 font-outfit font-medium">
                  {product.code || "Unknown Code"}
                </p>
                {product.category &&
                  product.category !== "Unknown Category" && (
                    <div className="rounded-3xl border border-white/5 p-1 items-center bg-green-800/80">
                      <div className="flex gap-1">
                        <Dot className="w-2 h-2 text-white" />
                        <p className="text-sm text-white mt-2 font-outfit font-medium">
                          {product.category}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Score Circle Container */}
            <div className="flex justify-center py-2 mb-6 relative z-10 drop-shadow-2xl">
              <ScoreCircle score={currentScore} size={220} />
            </div>

            <div
              className={`flex items-center gap-3 rounded-2xl border ${theme.border} ${theme.badgeBg} p-4 relative z-10 backdrop-blur-sm`}
            >
              {theme.icon}
              <span className="text-base sm:text-lg text-white font-outfit font-medium tracking-wide">
                {theme.text}
              </span>
            </div>
          </motion.div>

          {/* --- ALLERGEN WARNINGS (Sleek Chip Style) --- */}
          <motion.div
            variants={item}
            className="bg-zinc-900/60 backdrop-blur-md rounded-3xl p-5 border border-white/5 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle
                className={`w-4 h-4 ${hasAllergens ? "text-rose-400" : "text-emerald-400"}`}
              />
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-outfit font-bold">
                Allergen Warnings
              </div>
            </div>

            {cleanAllergens.length === 0 ? (
              <div className="text-sm text-emerald-400 font-outfit font-medium bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 inline-block">
                No allergens detected.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {cleanAllergens.map((allergen, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3 py-1.5 rounded-full text-xs font-outfit font-bold uppercase tracking-wide"
                  >
                    <OctagonAlert className="w-3 h-3 text-rose-400" />{" "}
                    {allergen}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* --- NUTRITION FACTS GRID (Glassmorphic) --- */}
          <motion.div
            variants={item}
            className="bg-zinc-900/60 backdrop-blur-md rounded-3xl p-5 border border-white/5 shadow-lg"
          >
            <div className="flex justify-between items-center mb-5">
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-outfit font-bold">
                Nutrition Facts
              </div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-outfit font-medium bg-zinc-800/50 px-2 py-1 rounded-md">
                per 100g
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Calories */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-outfit font-semibold">
                    Calories
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-2xl font-black text-white font-outfit">
                    {getVal("energy-kcal")}
                  </span>
                  <span className="text-xs text-zinc-500 font-outfit font-medium">
                    kcal
                  </span>
                </div>
              </div>

              {/* Protein */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Drumstick className="w-4 h-4 text-emerald-400" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-outfit font-semibold">
                    Protein
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-2xl font-black text-white font-outfit">
                    {getNutrientStr("proteins")}
                  </span>
                  <span
                    className={`text-[10px] font-bold font-outfit uppercase tracking-wider ${analyzeNutrient(getVal("proteins"), "protein").color}`}
                  >
                    {analyzeNutrient(getVal("proteins"), "protein").text}
                  </span>
                </div>
              </div>

              {/* Carbs */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Wheat className="w-4 h-4 text-amber-200" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-outfit font-semibold">
                    Carbs
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-2xl font-black text-white font-outfit">
                    {getNutrientStr("carbohydrates")}
                  </span>
                </div>
              </div>

              {/* Sugar */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Candy className="w-4 h-4 text-rose-400" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-outfit font-semibold">
                    Sugar
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-2xl font-black text-white font-outfit">
                    {getNutrientStr("sugars")}
                  </span>
                  <span
                    className={`text-[10px] font-bold font-outfit uppercase tracking-wider ${analyzeNutrient(getVal("sugars"), "sugar").color}`}
                  >
                    {analyzeNutrient(getVal("sugars"), "sugar").text}
                  </span>
                </div>
              </div>

              {/* Total Fat */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Droplet className="w-4 h-4 text-amber-400" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-outfit font-semibold">
                    Total Fat
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-2xl font-black text-white font-outfit">
                    {getNutrientStr("fat")}
                  </span>
                  <span
                    className={`text-[10px] font-bold font-outfit uppercase tracking-wider ${analyzeNutrient(getVal("fat"), "fat").color}`}
                  >
                    {analyzeNutrient(getVal("fat"), "fat").text}
                  </span>
                </div>
              </div>

              {/* Saturated Fat */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Droplet className="w-4 h-4 text-rose-500" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-outfit font-semibold">
                    Sat. Fat
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-2xl font-black text-white font-outfit">
                    {getNutrientStr("saturated-fat")}
                  </span>
                  <span
                    className={`text-[10px] font-bold font-outfit uppercase tracking-wider ${analyzeNutrient(getVal("saturated-fat"), "saturated-fat").color}`}
                  >
                    {
                      analyzeNutrient(getVal("saturated-fat"), "saturated-fat")
                        .text
                    }
                  </span>
                </div>
              </div>

              {/* Fiber */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-emerald-500" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-outfit font-semibold">
                    Fiber
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-2xl font-black text-white font-outfit">
                    {getNutrientStr("fiber")}
                  </span>
                  <span
                    className={`text-[10px] font-bold font-outfit uppercase tracking-wider ${analyzeNutrient(getVal("fiber"), "fiber").color}`}
                  >
                    {analyzeNutrient(getVal("fiber"), "fiber").text}
                  </span>
                </div>
              </div>

              {/* Sodium */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <TestTube className="w-4 h-4 text-zinc-300" />
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-outfit font-semibold">
                    Sodium
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <span className="text-2xl font-black text-white font-outfit">
                    {getNutrientStr("sodium")}
                  </span>
                  <span
                    className={`text-[10px] font-bold font-outfit uppercase tracking-wider ${analyzeNutrient(getVal("sodium"), "sodium").color}`}
                  >
                    {analyzeNutrient(getVal("sodium"), "sodium").text}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={item}
            className="bg-zinc-900/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.1)] mb-10"
          >
            // Nutritionist Insights
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-amber-500/20 rounded-lg border border-amber-500/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-amber-400 font-outfit">
                AI Nutritionist Insights
              </div>
            </div>
            {!insights ? (
              <div className="flex items-center gap-2 text-zinc-400 text-sm font-outfit animate-pulse">
                <Activity className="w-4 h-4" /> Analyzing product data...
              </div>
            ) : (
              <div className="text-[13px] sm:text-sm text-neutral-300 font-outfit leading-relaxed">
                {insights.split("\n").map((line, index) => {
                  if (!line.trim()) return null;

                  return (
                    <p key={index} className="mb-2 last:mb-0">
                      {line.trim()}
                    </p>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
