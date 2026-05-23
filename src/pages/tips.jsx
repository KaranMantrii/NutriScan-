import {
    Droplets, Moon, Apple, Brain,
    Sun, Heart, Wind, Coffee, House, ScanLine, User
} from "lucide-react";
import {Link} from "react-router-dom";
import React from "react";

const tips = [
    {
        id: 0,
        title: "Hydrate first thing",
        description: "A glass of water on waking jumpstarts metabolism and rehydrates after 7+ hours without fluids.",
        icon: Droplets,
        iconBg: "bg-green-500",
        gradientFrom: "from-green-950/60",
    },
    {
        id: 1,
        title: "Wind down screen-free",
        description: "30 minutes off screens before bed helps melatonin rise naturally — fall asleep faster, wake fresher.",
        icon: Moon,
        iconBg: "bg-emerald-600",
        gradientFrom: "from-emerald-950/60",
    },
    {
        id: 2,
        title: "Half your plate plants",
        description: "Aim for veg or fruit on half of every plate. More fiber, more micronutrients, fewer empty calories.",
        icon: Apple,
        iconBg: "bg-green-600",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 3,
        title: "2-minute breathing reset",
        description: "Box-breathing (4-4-4-4) lowers cortisol and clears mental fog in under 120 seconds.",
        icon: Brain,
        iconBg: "bg-teal-600",
        gradientFrom: "from-teal-950/50",
    },
    {
        id: 4,
        title: "Get morning sunlight",
        description: "10 minutes of daylight within an hour of waking anchors your circadian rhythm and lifts mood.",
        icon: Sun,
        iconBg: "bg-lime-600",
        gradientFrom: "from-lime-950/50",
    },
    {
        id: 5,
        title: "Watch hidden sodium",
        description: "Most sodium hides in bread, sauces, and processed snacks — not the salt shaker. Scan labels.",
        icon: Heart,
        iconBg: "bg-green-700",
        gradientFrom: "from-green-950/60",
    },
    {
        id: 6,
        title: "Walk after meals",
        description: "A 10-minute post-meal walk blunts blood sugar spikes by up to 30%.",
        icon: Wind,
        iconBg: "bg-emerald-500",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 7,
        title: "Caffeine cutoff",
        description: "Skip caffeine after 2 PM. Its half-life means it can still disrupt sleep 8 hours later.",
        icon: Coffee,
        iconBg: "bg-lime-700",
        gradientFrom: "from-lime-950/60",
    },
];

export default function HealthTips() {
    return (
        <div className="text-white p-5 pb-32 pt-20">

            <h1 className="text-3xl font-bold">
                <span className="text-white">Health </span>
                <span className="text-green-400">Tips</span>
            </h1>
            <p className="text-zinc-400 mt-1 text-sm">
                Bite-sized, evidence-based habits to upgrade how you feel every day.
            </p>

            {/* Tips Grid */}
            <div className="grid grid-cols-2 gap-3 mt-5">
                {tips.map((tip) => {
                    const Icon = tip.icon;
                    return (
                        <div
                            key={tip.id}
                            className={`
                                relative overflow-hidden rounded-2xl
                                bg-gradient-to-br ${tip.gradientFrom} to-neutral-900
                                border border-gray-500/25 p-4
                            `}
                        >
                            <div className={`w-11 h-11 rounded-2xl ${tip.iconBg} flex items-center justify-center mb-3`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="font-bold text-white text-[14px] leading-snug">
                                {tip.title}
                            </p>
                            <p className="text-zinc-400 text-[12px] mt-1.5 leading-relaxed">
                                {tip.description}
                            </p>
                        </div>
                    );
                })}

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
                            border border-green-300/40 w-45 cursor-pointer transition-all duration-150
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