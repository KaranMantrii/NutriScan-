import React, { useState } from "react";
import {
  Flame,
  Dumbbell,
  Heart,
  Zap,
  ChevronRight,
  Clock,
  Activity,
  Target,
  House,
  ScanLine,
  User,
} from "lucide-react";
import ElectricBorder from "../Components/ElectricBorder.jsx";
import { Link } from "react-router-dom";
import GradientText from "../Components/GradientText.jsx";

export default function Fitness() {
  const plans = [
    {
      id: 0,
      title: "Fat Loss Sprint",
      subtitle: "Weight Loss",
      description:
        "HIT cardio + strength circuits to burn fat while preserving muscle.",
      icon: Flame,
      iconBg: "bg-green-500",
      gradientFrom: "from-green-950/60",
      duration: "4 weeks",
      sessions: "5 / week",
      intensity: "High",
      schedule: [
        { day: "MON", workout: "HIIT cardio", duration: "30 min" },
        { day: "TUE", workout: "Upper body strength", duration: "45 min" },
        { day: "WED", workout: "Active recovery walk", duration: "40 min" },
        { day: "THU", workout: "Lower body strength", duration: "45 min" },
        { day: "FRI", workout: "Metabolic circuit", duration: "35 min" },
      ],
    },
    {
      id: 1,
      title: "Muscle Builder",
      subtitle: "Muscle Gain",
      description:
        "Progressive overload program designed to build size and strength.",
      icon: Dumbbell,
      iconBg: "bg-emerald-600",
      gradientFrom: "from-emerald-950/60",
      duration: "8 weeks",
      sessions: "4 / week",
      intensity: "Medium",
      schedule: [
        { day: "MON", workout: "Chest & Triceps", duration: "60 min" },
        { day: "TUE", workout: "Back & Biceps", duration: "60 min" },
        { day: "THU", workout: "Legs & Glutes", duration: "60 min" },
        { day: "FRI", workout: "Shoulders & Arms", duration: "50 min" },
      ],
    },
    {
      id: 2,
      title: "Heart Health",
      subtitle: "Cardio Endurance",
      description:
        "Zone 2 cardio and aerobic training to strengthen your heart.",
      icon: Heart,
      iconBg: "bg-green-700",
      gradientFrom: "from-green-950/40",
      duration: "6 weeks",
      sessions: "4 / week",
      intensity: "Low-Med",
      schedule: [
        { day: "MON", workout: "Steady-state run", duration: "35 min" },
        { day: "TUE", workout: "Cycling intervals", duration: "40 min" },
        { day: "THU", workout: "Swim or row", duration: "45 min" },
        { day: "SAT", workout: "Long zone 2 run", duration: "60 min" },
      ],
    },
    {
      id: 3,
      title: "Beginner Foundation",
      subtitle: "General Fitness",
      description:
        "Build healthy habits and a solid base for any fitness goal.",
      icon: Zap,
      iconBg: "bg-lime-600",
      gradientFrom: "from-lime-950/60",
      duration: "4 weeks",
      sessions: "3 / week",
      intensity: "Low",
      schedule: [
        { day: "MON", workout: "Full body circuit", duration: "30 min" },
        { day: "WED", workout: "Light cardio", duration: "25 min" },
        { day: "FRI", workout: "Bodyweight strength", duration: "30 min" },
      ],
    },
  ];

  const [selected, setSelected] = useState(0);
  const plan = plans[selected];
  const Icon = plan.icon;

  const CardInner = ({ p }) => {
    const PIcon = p.icon;
    return (
      <button
        onClick={() => setSelected(p.id)}
        className={`
                    w-full relative overflow-hidden rounded-2xl text-left
                    bg-linear-to-r ${p.gradientFrom} to-neutral-900
                    border transition-all duration-200 p-4 flex items-center gap-3
                    ${selected === p.id ? "border-green-400/50" : "border-gray-500/30 active:scale-[0.98]"}
                `}
      >
        <div
          className={`w-11 h-11 rounded-2xl ${p.iconBg} flex items-center justify-center shrink-0`}
        >
          <PIcon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-[14px] leading-tight">
            {p.title}
          </p>
          <p className="text-zinc-400 text-[12px] mt-0.5">{p.subtitle}</p>
        </div>
        <ChevronRight
          className={`w-4 h-4 shrink-0 ${selected === p.id ? "text-green-400" : "text-zinc-500"}`}
        />
      </button>
    );
  };

  return (
    <div className="text-white pb-32">
      <h1 className="text-5xl font-bold text-white font-author">
        <GradientText
          colors={["#84CC16", "#10B981", "#cda6f1"]}
          animationSpeed={8}
        >
          Fitness Plans
        </GradientText>
      </h1>
      <p className="text-zinc-400 mt-1 text-sm font-chillax">
        Pick a program that matches your goal. AI-personalized plans coming
        soon.
      </p>
      <div className="grid grid-cols-2 gap-3 mt-6">
        {plans.map((p) =>
          selected === p.id ? (
            <ElectricBorder
              key={p.id}
              color="#4ade80"
              speed={0.12}
              chaos={0.05}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <CardInner p={p} />
            </ElectricBorder>
          ) : (
            <CardInner key={p.id} p={p} />
          ),
        )}
      </div>

      <div className="mt-4 rounded-2xl bg-neutral-900 border border-green-400/10 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-black tracking-widest text-green-400/60 uppercase">
              {plan.subtitle}
            </p>
            <h2 className="text-2xl font-black text-white mt-1 leading-tight">
              {plan.title}
            </h2>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              {plan.description}
            </p>
          </div>
          <div
            className={`w-14 h-14 rounded-2xl ${plan.iconBg} flex items-center justify-center shrink-0`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5">
          {[
            { label: "DURATION", value: plan.duration, Icon: Clock },
            { label: "SESSIONS", value: plan.sessions, Icon: Activity },
            { label: "INTENSITY", value: plan.intensity, Icon: Target },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-green-950/30 border border-green-400/15 p-3 flex flex-col items-center gap-1.5"
            >
              <stat.Icon className="w-4 h-4 text-green-400" />
              <p className="text-[9px] font-black tracking-widest text-zinc-500 uppercase">
                {stat.label}
              </p>
              <p className="text-white font-bold text-[13px]">{stat.value}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] font-black tracking-widest text-zinc-500 uppercase mt-6 mb-3">
          Weekly Schedule
        </p>
        <div className="flex flex-col gap-2">
          {plan.schedule.map((item) => (
            <div
              key={item.day}
              className="flex items-center justify-between rounded-xl bg-green-950/20 border border-green-400/10 px-4 py-3"
            >
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-black text-green-400 w-8">
                  {item.day}
                </span>
                <span className="text-white text-sm">{item.workout}</span>
              </div>
              <span className="text-zinc-500 text-sm">{item.duration}</span>
            </div>
          ))}
        </div>
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
    </div>
  );
}
