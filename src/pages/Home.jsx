import React from "react"; // Capitalized 'React' to fix compile errors
import { Flame, ScanLine, Salad, Dumbbell, ScanHeart,House, UserRound, User, MoveRight } from 'lucide-react';
import GlassSurface from "../Components/GlassSurface.jsx";
import { Routes, Route, Link } from "react-router-dom";
import Scan from "./Scan.jsx";
import Profile from "./Profile.jsx";
import Fitness from "./fitness.jsx";
import Tips from "./tips.jsx";

export default function Home(){
    // 1. Array is now safely declared BEFORE the layout return
    const stats = [
        { label: 'SCANS', value: '-'},
        { label: 'AVG SCORE', value: '-'},
        { label: 'BEST SCORE', value: '-'},
    ];

    const features = [
        {label: 'Recipe Suggestions', description: 'Tailored Recipes for Your Dietary Needs.',icon: Salad, icon2: MoveRight},
        {label: 'Fitness Plans', description: 'Personalized fitness routines based on your goals.',icon: Dumbbell, icon2: MoveRight},
        {label: 'Health Tips', description: 'AI Health tips for a healthier lifestyle.',icon: ScanHeart, icon2: MoveRight},
    ]

    return (
        <div>
            <Routes >
                <Route path="/scan" element={<Scan />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/fitness" element={<Fitness />} />
                <Route path="/tips" element={<Tips />} />
            </Routes>       
            <div>
            {/* Kept your exact header layout intact */}
            <header className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 flex items-center justify-between w-full">
                <div>
                    <p className="text-sm text-zinc-500">WELCOME BACK</p>
                    <p className="text-[25px] font-bold font-outfit">Hey there 👋</p>
                </div>
                {/* Changed bg-black-600 to bg-zinc-900 so Tailwind recognizes the color */}
                <div className="rounded-2xl text-amber-100 bg-zinc-900 border border-gray-500/40 flex items-center gap-2 px-2 py-2 mt-2">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <span className="ml-2 text-[12px] font-medium text-amber-400"> 0 day streak</span>
                </div>
            </header>

            {/* MAIN GREEN SCAN CONTAINER (Added w-full, hover brightness, and click compression) */}
            <div className="pt-9 w-full">
                <Link to="/scan">
                    <button 
                        onClick={() => console.log("Main scan clicked")}
                        className="w-full text-left rounded-2xl flex items-center justify-between bg-green-400 p-6 
                        shadow-[0_0_25px_rgba(74,222,128,0.45),0_0_50px_rgba(74,222,128,0.2)] 
                        border border-green-300/40 cursor-pointer transition-all duration-150
                        hover:brightness-105 active:scale-[0.99]"
                >    
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black tracking-wider text-black/80 uppercase">
                            TAP TO SCAN
                        </span>
                        <h3 className="text-2xl font-black text-black tracking-tight mt-0.5 font-outfit">
                            Scan a Product
                        </h3>
                        <p className="text-[15px] font-medium text-black/80 mt-1">
                            Get instant insights on the go
                        </p>
                    </div>
    
                    <div>
                        <ScanLine className="w-14 h-14 text-black" />
                    </div>
                </button>
                </Link>
            </div>
    
            {/* Stats map loop runs perfectly down here now */}
            <div className="pt-5 flex gap-4 w-full">
                {stats.map((stat, index) => (
                    <div key={index} className="flex-1 rounded-2xl bg-neutral-900 flex items-center border border-gray-500/40 ">
                        <div className="p-4 flex flex-col gap-1.5">
                            <p>{stat.value}</p>
                            <p className="text-[12px] tracking-wider text-white uppercase flex justify-center">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* THREE DIVS AFTER DISCOVER (Added subtle hover background tint & active state) */}
            <div className="text-zinc-500 font-bold text-[16px] mt-5 uppercase">Discover</div>
<div className="pt-2 flex flex-col gap-2 w-full">
    {features.map((feature, index) => (
        <button 
            key={index} 
            onClick={() => console.log(`${feature.label} clicked`)}
            // Added `justify-between`, moved `p-4` here, and added `group` for hover effects
            className="group w-full text-left rounded-2xl bg-neutral-900 flex items-center justify-between p-4 border border-gray-500/40 cursor-pointer transition-all duration-150 hover:bg-neutral-800/70 active:bg-neutral-800"
        >
            {/* Left Side: Icon, Label, and Description */}
            <div>
                <feature.icon className="w-9 h-9 text-amber-400 mb-2" />
                <p className="font-bold text-xl text-white">{feature.label}</p>
                <p className="text-[13px] tracking-wider text-zinc-400 mt-0.5">
                    {feature.description}
                </p>
            </div>

            {/* Right Side: Arrow Icon */}
            {/* Added a subtle transition so the arrow slides right on hover */}
            <feature.icon2 className="w-10 h-10 text-zinc-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-zinc-300" />
        </button>
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
    </div>
    );
};