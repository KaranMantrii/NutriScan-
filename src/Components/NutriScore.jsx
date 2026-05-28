import React, { useEffect, useState } from "react";

export function getScoreStatus(score) {
    if (score <= 40) return { label: "SKIP IT", color: "#ef4444", glow: "#f87171" };
    if (score <= 70) return { label: "MODERATE", color: "#f59e0b", glow: "#fbbf24" };
    return { label: "BUY IT", color: "#84cc16", glow: "#4ade80" };
}

export function calculateHealthScore(nutriments = {}) {
    const getNumericNutrient = (key) => {
        const val = nutriments[`${key}_100g`];
        return val !== undefined ? parseFloat(val) : 0; 
    };

    const satFatDV = getNumericNutrient('fat'); 
        const sodiumDV = getNumericNutrient('sodium');
        const sugarDV = getNumericNutrient('sugars'); 
        const proteinDV = getNumericNutrient('proteins'); 
        const fiberDV = getNumericNutrient('fiber');          
        const vitDDV = getNumericNutrient('vitamin_d'); 
        const calciumDV = getNumericNutrient('calcium'); 
        const ironDV = getNumericNutrient('iron');
        const potassiumDV = getNumericNutrient('potassium'); 
        
        const calories = getNumericNutrient('energy-kcal') || getNumericNutrient('energy_kcal');

        const penaltyPoints = 
            Math.floor(satFatDV / 2) + 
            Math.floor(sugarDV / 2) + 
            Math.floor(sodiumDV / 5) + 
            Math.floor(calories / 25);

        // Aggregate Micros
        const totalMicrosDV = vitDDV + calciumDV + ironDV + potassiumDV;

        // Bonuses remain standard (1 point per 5% DV)
        const bonusPoints = 
            Math.floor(proteinDV / 5) + 
            Math.floor(fiberDV / 5) + 
            Math.floor(totalMicrosDV / 5);

        // Calculate raw score starting from 100
        let rawScore = 100 - penaltyPoints + bonusPoints;
        
        // Clamp between 0 and 100
        return Math.max(0, Math.min(100, rawScore));
    };

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
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <defs>
                    <linearGradient id="scoreGrad" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor={status.glow} />
                        <stop offset="100%" stopColor={status.color} />
                    </linearGradient>
                </defs>
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="oklch(1 0 0 / 0.08)" strokeWidth={stroke} fill="none" />
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="url(#scoreGrad)" strokeWidth={stroke} strokeLinecap="round" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-5xl font-bold tracking-tight" style={{ color: status.color }}>
                    {Math.round(safe)}
                </span>
                <span className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {label ?? "Score"}
                </span>
                <span className="mt-3 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-widest" style={{ backgroundColor: `color-mix(in oklab, ${status.color} 18%, transparent)`, color: status.color, border: `1px solid ${status.color}30` }}>
                    {status.label}
                </span>
            </div>
        </div>
    );
}