import React from "react"; // Capitalized 'React' to fix compile errors
import { Flame, ScanLine, Salad, Dumbbell, ScanHeart } from 'lucide-react';

export default function Home(){
    // 1. Array is now safely declared BEFORE the layout return
    const stats = [
        { label: 'SCANS', value: '-'},
        { label: 'AVG SCORE', value: '-'},
        { label: 'BEST SCORE', value: '-'},
    ];

    const features = [
        {label: 'Recipe Suggestions', description: 'Tailored Recipes for Your Dietary Needs.',icon: Salad},
        {label: 'Fitness Plans', description: 'Personalized fitness routines based on your goals.',icon: Dumbbell},
        {label: 'Health Tips', description: 'AI Health tips for a healthier lifestyle.',icon: ScanHeart},
    ]

    return (
        <div>
            {/* Kept your exact header layout intact */}
            <header className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 flex items-start gap-34">
                <div>
                    <p className="text-sm text-zinc-500">WELCOME BACK</p>
                    <p className="text-[25px] font-bold font-outfit">Hey there 👋</p>
                </div>
                {/* Changed bg-black-600 to bg-zinc-900 so Tailwind recognizes the color */}
                <div className="rounded-2xl text-amber-100 bg-zinc-900 border border-gray-500/40 flex items-center gap-2 px-2 py-2 mt-2">
                    <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span className="ml-2 text-[12px] font-medium text-amber-400"> 0 day streak</span>
                </div>
            </header>

            <div className="pt-9 w-full">
                <div className="rounded-2xl flex items-center justify-between bg-green-400 p-6 
                    shadow-[0_0_25px_rgba(74,222,128,0.45),0_0_50px_rgba(74,222,128,0.2)] 
                    border border-green-300/40">    
    
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
                        <ScanLine className="w-14 h-14 text-black animate-pulse" />
                    </div>
                </div>
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
            <div className="text-zinc-500 font-bold text-sm mt-5 uppercase">Discover</div>
            <div className="pt-5 flex flex-col gap-2 w-full">
                {features.map((feature, index) => (
                    <div key={index} className="flex-1 rounded-2xl bg-neutral-900 flex items-center border border-gray-500/40 ">
                        <div className="p-4 ">
                            <feature.icon className="w-9 h-9 text-amber-400 mb-2" />
                            <p className="font-bold text-xl">{feature.label}</p>
                            <p className="text-[13px] tracking-wider text-zinc-400">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};