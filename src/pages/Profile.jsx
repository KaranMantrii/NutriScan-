import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Target,
  ShieldAlert,
  Salad,
  ArrowRight,
  ArrowLeft,
  Pencil,
  House,
  ScanLine,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Zap,
  Scale,
  Heart,
  Moon,
  Activity,
  Leaf,
  Check,
  Utensils,
} from "lucide-react";
import { useProfile } from "./useProfile";
import GradientText from "../Components/GradientText.jsx";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ACTIVITY_LEVELS = [
  {
    value: "sedentary",
    label: "Sedentary",
    sub: "Desk job, little or no exercise",
  },
  { value: "light", label: "Lightly Active", sub: "1–2 workouts per week" },
  {
    value: "moderate",
    label: "Moderately Active",
    sub: "3–5 workouts per week",
  },
  { value: "active", label: "Very Active", sub: "Hard exercise 6–7 days/week" },
  { value: "athlete", label: "Athlete", sub: "Twice daily / physical job" },
];

const HEALTH_GOALS = [
  {
    label: "Weight Loss",
    icon: TrendingDown,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-950/70",
    desc: "Penalises high-calorie and high-sugar products.",
  },
  {
    label: "Muscle Gain",
    icon: Zap,
    iconColor: "text-green-400",
    iconBg: "bg-green-950/70",
    desc: "Rewards protein-dense foods.",
  },
  {
    label: "Maintain Weight",
    icon: Scale,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-950/70",
    desc: "Balances calories in vs. out.",
  },
  {
    label: "Heart Health",
    icon: Heart,
    iconColor: "text-green-400",
    iconBg: "bg-green-950/70",
    desc: "Flags saturated fat and sodium more heavily.",
  },
  {
    label: "Diabetes Management",
    icon: Activity,
    iconColor: "text-red-400",
    iconBg: "bg-red-950/70",
    desc: "Triples the sugar penalty in scoring.",
  },
  {
    label: "Improve Energy",
    icon: Zap,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-950/70",
    desc: "Prioritises complex carbs and iron-rich foods.",
  },
  {
    label: "Better Sleep",
    icon: Moon,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-950/70",
    desc: "Flags caffeine and high-sugar products.",
  },
  {
    label: "Build Endurance",
    icon: Activity,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-950/70",
    desc: "Boosts scores for complex carb-rich foods.",
  },
  {
    label: "Reduce Cholesterol",
    icon: Heart,
    iconColor: "text-rose-400",
    iconBg: "bg-rose-950/70",
    desc: "Penalises saturated and trans fats heavily.",
  },
  {
    label: "Gut Health",
    icon: Leaf,
    iconColor: "text-lime-400",
    iconBg: "bg-lime-950/70",
    desc: "Rewards fibre-rich and probiotic foods.",
  },
];

const ALLERGENS = [
  "Peanuts",
  "Tree Nuts",
  "Dairy",
  "Eggs",
  "Gluten",
  "Soy",
  "Fish",
  "Shellfish",
  "Sesame",
];

const DIETARY_PREFERENCES = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Keto / Low-carb",
  "Paleo",
  "Halal",
  "Kosher",
  "High Protein",
  "Dairy-Free",
  "Gluten-Free",
];

const STEPS = [
  { label: "About You", icon: User },
  { label: "Health Goals", icon: Target },
  { label: "Allergens", icon: ShieldAlert },
  { label: "Diet", icon: Salad },
];

// ─── SMALL REUSABLE PIECES ───────────────────────────────────────────────────

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-white">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.07] border border-white/10 rounded-2xl px-4 py-4 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-green-400/60 transition-colors"
      />
    </div>
  );
}

function GenderButton({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 rounded-2xl text-sm font-semibold border transition-all active:scale-95 ${
        selected
          ? "bg-green-400/15 border-green-400 text-green-400"
          : "bg-white/[0.07] border-white/10 text-white"
      }`}
    >
      {label}
    </button>
  );
}

function ActivityRow({ label, sub, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border text-left transition-all active:scale-[0.98] ${
        selected
          ? "bg-green-400/10 border-green-400 text-green-400"
          : "bg-white/[0.07] border-white/10 text-white"
      }`}
    >
      <span className="text-sm font-semibold">{label}</span>
      <span
        className={`text-xs ${selected ? "text-green-400" : "text-zinc-500"}`}
      >
        {sub}
      </span>
    </button>
  );
}

function Chip({ label, selected, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
        selected
          ? "bg-green-400/15 border-green-400 text-green-400"
          : "bg-white/[0.07] border-white/10 text-zinc-300"
      }`}
    >
      {label}
    </button>
  );
}

// ─── STEP HEADINGS DATA ───────────────────────────────────────────────────────

const STEP_HEADINGS = [
  {
    title: (
      <>
        Welcome to NutriScan<span className="text-green-400">+</span>
      </>
    ),
    sub: "Tell us a little about yourself so we can personalise your nutrition scores.",
  },
  {
    title: (
      <>
        Your Health <span className="text-green-400">Goals</span>
      </>
    ),
    sub: "Select all that apply. These adjust the scoring weights for every product you scan.",
  },
  {
    title: (
      <>
        <span className="text-green-400">Allergen</span> Alerts
      </>
    ),
    sub: "We'll show a bright red warning whenever a scanned product contains any of these.",
  },
  {
    title: (
      <>
        Dietary <span className="text-green-400">Preferences</span>
      </>
    ),
    sub: "Optional — helps AI suggest alternatives that match your lifestyle.",
  },
];

// ─── STEP SCREENS ────────────────────────────────────────────────────────────

function StepAboutYou({ profile, updateField }) {
  return (
    <div className="space-y-5">
      <div className="bg-white/5 border border-white/5 rounded-3xl p-5 space-y-5">
        <TextInput
          label="Full Name"
          required
          value={profile.name}
          onChange={(v) => updateField("name", v)}
          placeholder="e.g. Rahul Sharma"
        />

        <TextInput
          label="Age"
          type="number"
          value={profile.age}
          onChange={(v) => updateField("age", v)}
          placeholder="e.g. 20"
        />

        {/* GENDER */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white">Gender</label>
          <div className="flex gap-2">
            {["Male", "Female"].map((g) => (
              <GenderButton
                key={g}
                label={g}
                selected={profile.gender === g.toLowerCase()}
                onClick={() => updateField("gender", g.toLowerCase())}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {["Other", "Prefer not to say"].map((g) => (
              <GenderButton
                key={g}
                label={g}
                selected={profile.gender === g.toLowerCase()}
                onClick={() => updateField("gender", g.toLowerCase())}
              />
            ))}
          </div>
        </div>

        {/* HEIGHT + WEIGHT */}
        <div className="grid grid-cols-2 gap-3">
          <TextInput
            label="Height (cm)"
            type="number"
            value={profile.height}
            onChange={(v) => updateField("height", v)}
            placeholder="e.g. 170"
          />
          <TextInput
            label="Weight (kg)"
            type="number"
            value={profile.weight}
            onChange={(v) => updateField("weight", v)}
            placeholder="e.g. 65"
          />
        </div>
        <p className="text-xs text-zinc-500">
          Used to calculate your daily calorie target. Optional but recommended.
        </p>

        {/* ACTIVITY LEVEL */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white">
            Activity Level
          </label>
          <div className="space-y-2">
            {ACTIVITY_LEVELS.map(({ value, label, sub }) => (
              <ActivityRow
                key={value}
                label={label}
                sub={sub}
                selected={profile.activityLevel === value}
                onClick={() => updateField("activityLevel", value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepHealthGoals({ profile, toggleArrayField }) {
  return (
    <div className="space-y-3">
      {HEALTH_GOALS.map(
        ({ label, icon: GoalIcon, iconColor, iconBg, desc }) => {
          const selected = profile.healthGoals.includes(label);
          return (
            <button
              key={label}
              onClick={() => toggleArrayField("healthGoals", label)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all active:scale-[0.98] ${
                selected
                  ? "bg-green-400/5 border-green-400"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
              >
                <GoalIcon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{desc}</p>
              </div>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  selected ? "bg-green-400" : "border-2 border-white/20"
                }`}
              >
                {selected && <Check className="w-4 h-4 text-black" />}
              </div>
            </button>
          );
        },
      )}
      <p className="text-center text-xs text-zinc-600 pt-1 pb-2">
        You can change these anytime from your Profile page.
      </p>
    </div>
  );
}

function StepAllergens({ profile, toggleArrayField }) {
  return (
    <div className="space-y-4">
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        {ALLERGENS.map((allergen, i) => {
          const selected = profile.allergens.includes(allergen);
          return (
            <button
              key={allergen}
              onClick={() => toggleArrayField("allergens", allergen)}
              className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-all ${
                selected ? "bg-green-400/[0.08]" : "hover:bg-white/[0.03]"
              } ${i < ALLERGENS.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${selected ? "bg-green-400" : "bg-white/20"}`}
              />
              <span
                className={`flex-1 text-sm font-medium ${selected ? "text-white" : "text-zinc-300"}`}
              >
                {allergen}
              </span>
              <div
                className={`w-6 h-6 rounded-full border-2 flex-shrink-0 transition-all ${
                  selected
                    ? "border-green-400 bg-green-400/20"
                    : "border-white/20"
                }`}
              />
            </button>
          );
        })}
      </div>
      <div className="flex gap-3 p-4 rounded-2xl border border-amber-400/30 bg-amber-400/5">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-400 leading-relaxed">
          Allergen data comes from Open Food Facts. Always read the physical
          product label as the primary safety check.
        </p>
      </div>
    </div>
  );
}

function StepDiet({ profile, toggleArrayField }) {
  return (
    <div className="space-y-3">
      {DIETARY_PREFERENCES.map((pref) => {
        const selected = profile.dietaryPreferences.includes(pref);
        return (
          <button
            key={pref}
            onClick={() => toggleArrayField("dietaryPreferences", pref)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl border text-left transition-all active:scale-[0.98] ${
              selected
                ? "bg-green-400/5 border-green-400/50"
                : "bg-white/[0.03] border-white/10"
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
              <Salad className="w-5 h-5 text-zinc-400" />
            </div>
            <span
              className={`flex-1 text-sm font-medium ${selected ? "text-white" : "text-zinc-300"}`}
            >
              {pref}
            </span>
            <div
              className={`w-6 h-6 rounded-full border-2 flex-shrink-0 transition-all ${
                selected
                  ? "border-green-400 bg-green-400/20"
                  : "border-white/20"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── BMI CARD ────────────────────────────────────────────────────────────────

function BMICard({ height, weight }) {
  const h = parseFloat(height) / 100; // cm → m
  const w = parseFloat(weight);
  if (!h || !w || h <= 0 || w <= 0) return null;

  const bmiRaw = w / (h * h);
  const bmi = bmiRaw.toFixed(1);

  let label, textColor, borderColor, bgColor, Icon, desc;
  if (bmiRaw < 18.5) {
    label = "Underweight";
    textColor = "text-blue-400";
    borderColor = "border-blue-400/60";
    bgColor = "bg-blue-400/10";
    Icon = TrendingDown;
    desc = "You may benefit from a calorie-rich, nutrient-dense diet.";
  } else if (bmiRaw < 25) {
    label = "Normal Weight";
    textColor = "text-green-400";
    borderColor = "border-green-400/60";
    bgColor = "bg-green-400/10";
    Icon = Check;
    desc = "You're within a healthy weight range — keep it up!";
  } else if (bmiRaw < 30) {
    label = "Overweight";
    textColor = "text-amber-400";
    borderColor = "border-amber-400/60";
    bgColor = "bg-amber-400/10";
    Icon = TrendingUp;
    desc = "Slightly above the healthy range. A balanced diet can help.";
  } else if (bmiRaw < 35) {
    label = "Obese (Class I)";
    textColor = "text-orange-400";
    borderColor = "border-orange-400/60";
    bgColor = "bg-orange-400/10";
    Icon = AlertTriangle;
    desc = "Health risks are elevated. Consider consulting a doctor.";
  } else {
    label = "Obese (Class II+)";
    textColor = "text-red-400";
    borderColor = "border-red-400/60";
    bgColor = "bg-red-400/10";
    Icon = AlertTriangle;
    desc = "Significant health risks. Please speak with a healthcare provider.";
  }

  // Marker position on scale (mapped from BMI 15 → 40 = 0% → 100%)
  const markerPct = Math.min(100, Math.max(0, ((bmiRaw - 15) / 25) * 100));

  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-4">
        Body Mass Index
      </p>

      <div className="flex items-center gap-4 mb-5">
        {/* Score circle */}
        <div
          className={`w-20 h-20 rounded-full border-[3px] flex flex-col items-center justify-center flex-shrink-0 ${borderColor} ${bgColor}`}
        >
          <p className={`text-2xl font-bold leading-none ${textColor}`}>
            {bmi}
          </p>
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">
            BMI
          </p>
        </div>
        {/* Category + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Icon className={`w-4 h-4 flex-shrink-0 ${textColor}`} />
            <p className={`font-bold text-base leading-tight ${textColor}`}>
              {label}
            </p>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
        </div>
      </div>

      {/* Color scale bar */}
      <div className="relative">
        <div className="flex rounded-full overflow-hidden h-2.5">
          {/* segments proportional to BMI ranges 15–18.5 / 18.5–25 / 25–30 / 30–40 */}
          <div className="bg-blue-400" style={{ flex: 3.5 }} />
          <div className="bg-green-400" style={{ flex: 6.5 }} />
          <div className="bg-amber-400" style={{ flex: 5 }} />
          <div className="bg-red-400" style={{ flex: 10 }} />
        </div>
        {/* White marker pin */}
        <div
          className="absolute -top-[3px] w-[3px] h-[18px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.6)]"
          style={{ left: `calc(${markerPct}% - 1.5px)` }}
        />
        <div className="flex justify-between mt-1.5 text-[9px] text-zinc-500 leading-tight">
          <span>
            Under
            <br />
            &lt;18.5
          </span>
          <span className="text-center">
            Normal
            <br />
            18.5–25
          </span>
          <span className="text-center">
            Over
            <br />
            25–30
          </span>
          <span className="text-right">
            Obese
            <br />
            &gt;30
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE VIEW (shown after setup is complete) ─────────────────────────────

function ProfileView({ profile, onEdit }) {
  const ACTIVITY_LABEL =
    ACTIVITY_LEVELS.find((a) => a.value === profile.activityLevel)?.label ||
    "—";
  const ACTIVITY_SUB =
    ACTIVITY_LEVELS.find((a) => a.value === profile.activityLevel)?.sub || "";

  return (
    <div className="min-h-dvh text-white flex flex-col pb-32 font-outfit">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <p className="font-outfit text-4xl font-bold tracking-tight bg-gradient-to-r from-green-400 via-emerald-300 to-violet-400 bg-clip-text text-transparent">
          PROFILE
        </p>
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-zinc-300 active:scale-95 transition-all"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
      </header>

      <div className="px-5 space-y-4 overflow-y-auto">
        {/* ── Avatar + Name ── */}
        <div className="flex flex-col items-center py-6 gap-3">
          <div className="w-20 h-20 rounded-full bg-green-400/10 border-2 border-green-400/40 flex items-center justify-center">
            <User className="w-10 h-10 text-green-400" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {profile.name || "No name set"}
            </p>
            <p className="text-sm text-zinc-400 mt-0.5 capitalize">
              {profile.gender || ""}
            </p>
          </div>
        </div>

        {/* ── Basic Stats ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Age", value: profile.age ? `${profile.age} yrs` : "—" },
            {
              label: "Height",
              value: profile.height ? `${profile.height} cm` : "—",
            },
            {
              label: "Weight",
              value: profile.weight ? `${profile.weight} kg` : "—",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-1"
            >
              <p className="text-lg font-bold text-green-400">{value}</p>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── BMI Card ── */}
        <BMICard height={profile.height} weight={profile.weight} />

        {/* ── Activity Level ── */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
              Activity Level
            </p>
            <p className="text-white font-semibold text-sm mt-0.5">
              {ACTIVITY_LABEL || "—"}
            </p>
            {ACTIVITY_SUB && (
              <p className="text-[11px] text-zinc-500 mt-0.5">{ACTIVITY_SUB}</p>
            )}
          </div>
        </div>

        {/* ── Health Goals ── */}
        {profile.healthGoals.length > 0 && (
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
              Health Goals
            </p>
            <div className="flex flex-col gap-2">
              {profile.healthGoals.map((g) => {
                const meta = HEALTH_GOALS.find((h) => h.label === g);
                if (!meta)
                  return (
                    <div key={g} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-green-400/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-sm text-white font-medium">
                        {g}
                      </span>
                    </div>
                  );
                const GoalIcon = meta.icon;
                return (
                  <div key={g} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${meta.iconBg}`}
                    >
                      <GoalIcon className={`w-4 h-4 ${meta.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium leading-tight">
                        {g}
                      </p>
                      <p className="text-[11px] text-zinc-500 leading-tight">
                        {meta.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Allergens ── */}
        {profile.allergens.length > 0 && (
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                Allergens
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.allergens.map((a) => (
                <span
                  key={a}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-red-400/10 border border-red-400/25 text-red-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Dietary Preferences ── */}
        {profile.dietaryPreferences.length > 0 && (
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Utensils className="w-4 h-4 text-zinc-400" />
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                Dietary Preferences
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.dietaryPreferences.map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.06] border border-white/10 text-zinc-300"
                >
                  <Leaf className="w-3 h-3 text-green-400 flex-shrink-0" />
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4">
        <div className="w-full h-auto rounded-t-none rounded-b-4xl bg-neutral-900/10 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="flex w-full items-center justify-around p-3 text-white">
            <div className="text-[22px] sm:text-2xl font-medium cursor-pointer hover:opacity-80 transition-opacity font-chillax">
              <Link to="/home">
                <button className="flex flex-col items-center justify-center gap-0.5">
                  <House className="w-5.5 h-5.5  text-white" />
                  Home
                </button>
              </Link>
            </div>
            <Link to="/scan">
              <button
                onClick={() => console.log("Footer scan clicked")}
                className="rounded-2xl flex items-center justify-center bg-green-400 p-3 
                            shadow-[0_0_25px_rgba(74,222,128,0.45),0_0_50px_rgba(74,222,128,0.2)] 
                            border border-green-300/40 w-24 cursor-pointer transition-all duration-150
                            hover:brightness-105 active:scale-95"
              >
                <ScanLine className="w-7.5 h-7.5 text-black animate-pulse" />
              </button>
            </Link>

            <div className="text-[22px] sm:text-2xl font-medium cursor-pointer hover:opacity-80 transition-opacity font-chillax">
              <Link to="/profile">
                <button className="flex flex-col items-center justify-center gap-0.5">
                  <User className="w-5.5 h-5.5  text-white" />
                  Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── MAIN PROFILE PAGE ────────────────────────────────────────────────────────

export default function Profile() {
  const [currentStep, setCurrentStep] = useState(1);
  const { profile, updateField, toggleArrayField, saveProfile, loadProfile } =
    useProfile();
  // Check if profile already exists in localStorage
  const [isSetupDone, setIsSetupDone] = useState(() => {
    const saved = loadProfile();
    return saved && saved.name ? true : false;
  });

  const isLastStep = currentStep === STEPS.length;
  const isFirstStep = currentStep === 1;

  const handleContinue = () => {
    if (isLastStep) {
      saveProfile();
      setIsSetupDone(true); // switch to profile view
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
  };

  // If profile exists, show the profile details view
  if (isSetupDone) {
    return (
      <ProfileView
        profile={profile}
        onEdit={() => {
          setIsSetupDone(false);
          setCurrentStep(1);
        }}
      />
    );
  }

  // Otherwise show the setup wizard
  return (
    <div className="min-h-dvh text-white flex flex-col">
      {/* TOP BAR */}
      <header className="flex items-center justify-end px-5 pt-6 pb-2 flex-shrink-0">
        <span className="text-sm text-zinc-400">
          Step {currentStep} of {STEPS.length}
        </span>
      </header>

      {/* STEP TITLE + SUBTITLE */}
      <div className="px-5 pt-2 pb-5 flex-shrink-0">
        <h1 className="text-3xl font-black text-white leading-tight">
          {STEP_HEADINGS[currentStep - 1].title}
        </h1>
        <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
          {STEP_HEADINGS[currentStep - 1].sub}
        </p>
      </div>

      {/* STEP PROGRESS ICONS */}
      <div className="flex items-center justify-around px-5 pb-6 flex-shrink-0">
        {STEPS.map(({ label, icon: StepIcon }, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isDone = step < currentStep;
          return (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive
                    ? "border-green-400 bg-green-400/10"
                    : isDone
                      ? "border-green-400/40 bg-green-400/5"
                      : "border-white/10 bg-transparent"
                }`}
              >
                <StepIcon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-green-400"
                      : isDone
                        ? "text-green-400/50"
                        : "text-zinc-600"
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-green-400" : "text-zinc-600"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* SCROLLABLE STEP CONTENT */}
      <div className="flex-1 overflow-y-auto px-5 pb-32">
        {currentStep === 1 && (
          <StepAboutYou profile={profile} updateField={updateField} />
        )}
        {currentStep === 2 && (
          <StepHealthGoals
            profile={profile}
            toggleArrayField={toggleArrayField}
          />
        )}
        {currentStep === 3 && (
          <StepAllergens
            profile={profile}
            toggleArrayField={toggleArrayField}
          />
        )}
        {currentStep === 4 && (
          <StepDiet profile={profile} toggleArrayField={toggleArrayField} />
        )}
      </div>

      {/* BOTTOM BUTTONS — fixed */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-gradient-to-t from-[#08140e] via-[#08140e]/80 to-transparent">
        <div className="flex gap-3">
          {!isFirstStep && (
            <button
              onClick={handleBack}
              className="w-14 h-14 rounded-2xl bg-white/[0.07] border border-white/10 flex items-center justify-center active:scale-95 transition-all flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          )}

          <button
            onClick={handleContinue}
            className="flex-1 h-14 rounded-2xl bg-green-400 text-black font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-all hover:brightness-105"
          >
            {isLastStep ? "Save & Continue" : "Continue"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
