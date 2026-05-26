import React, { useEffect, useState } from "react";

export default function Nutricircle({ grade }) {
    const [animatedOffset, setAnimatedOffset] = useState(125.6); // Start empty

    // Map Nutri-Score (A-E) to a percentage (for the gauge fill) and corresponding colors
    const scoreMap = {
        a: { percent: 90, color: 'text-green-400', hex: '#4ade80', label: 'Excellent' },
        b: { percent: 70, color: 'text-lime-400', hex: '#a3e635', label: 'Good' },
        c: { percent: 50, color: 'text-yellow-400', hex: '#facc15', label: 'Moderate' },
        d: { percent: 30, color: 'text-orange-400', hex: '#fb923c', label: 'Poor' },
        e: { percent: 10, color: 'text-red-500', hex: '#ef4444', label: 'Bad' },
    };

    const normalizedGrade = grade?.toLowerCase();
    const currentScore = scoreMap[normalizedGrade] || { 
        percent: 0, 
        color: 'text-zinc-500', 
        hex: '#71717a', 
        label: 'Unknown' 
    };

    // SVG Math for a semi-circle
    const radius = 40;
    const circumference = Math.PI * radius; // ~125.6
    const targetOffset = circumference - (currentScore.percent / 100) * circumference;

    // Trigger animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setAnimatedOffset(targetOffset), 100);
        return () => clearTimeout(timer);
    }, [targetOffset]);

    return (
        <div className="flex flex-col items-center justify-center p-5 bg-zinc-900/60 border border-white/10 rounded-2xl shadow-lg relative overflow-hidden">
            {/* Speedometer SVG */}
            <svg 
                className="w-48 h-28 transform rotate-180" 
                viewBox="0 0 100 50"
            >
                {/* Background Track */}
                <path
                    d="M 10 0 A 40 40 0 0 0 90 0"
                    fill="none"
                    stroke="#27272a" // zinc-800
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                {/* Colored Value Track */}
                <path
                    d="M 10 0 A 40 40 0 0 0 90 0"
                    fill="none"
                    stroke={currentScore.hex}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={animatedOffset}
                    className="transition-all duration-1000 ease-out"
                    style={{ 
                        filter: currentScore.percent > 0 ? `drop-shadow(0 0 6px ${currentScore.hex}60)` : 'none' 
                    }}
                />
            </svg>
            
            {/* Center Text inside the arc */}
            <div className="absolute top-14 flex flex-col items-center">
                <span className={`text-4xl font-black uppercase ${currentScore.color}`}>
                    {normalizedGrade || '?'}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium tracking-widest mt-1 uppercase">
                    {currentScore.label}
                </span>
            </div>
        </div>
    );
}