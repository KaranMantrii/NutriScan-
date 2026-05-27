import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// 1. Helper function: Pure logic, no React hooks allowed here.
export function getScoreStatus(score) {
    if (score <= 40) {
        return {
            label: "SKIP IT",
            color: "#ef4444",
            glow: "#f87171"
        };
    }

    if (score <= 70) {
        return {
            label: "MODERATE",
            color: "#f59e0b",
            glow: "#fbbf24"
        };
    }

    return {
        label: "BUY IT",
        color: "#84cc16",
        glow: "#4ade80"
    };
}

// 2. The UI Component: Dumb, pure presentation.
export function ScoreCircle({ score, size = 220, label }) {
    const stroke = 14;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    // Ensure score is safely between 0-100
    const safe = Math.max(0, Math.min(100, score || 0));
    
    const [offset, setOffset] = useState(circumference);
    const status = getScoreStatus(safe);

    // Trigger the animation on mount
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

                {/* Background Ring */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="oklch(1 0 0 / 0.08)"
                    strokeWidth={stroke}
                    fill="none"
                />

                {/* Progress Ring */}
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
                        transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)"
                    }}
                />
            </svg>

            {/* Center Content */}
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
                    className="mt-3 rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-widest"
                    style={{
                        backgroundColor: `color-mix(in oklab, ${status.color} 18%, transparent)`,
                        color: status.color,
                        border: `1px solid ${status.color}30`
                    }}
                >
                    {status.label}
                </span>
            </div>
        </div>
    );
}

// 3. The Parent Wrapper: Handles routing, data extraction, and math.
export default function NutriScore() {
    const location = useLocation();
    
    // Safely retrieve product data
    const product = location.state?.product || {};
    const nutriments = product.nutriments || {};

    const getNumericNutrient = (key) => {
        const val = nutriments[`${key}_100g`];
        return val !== undefined ? parseFloat(val) : 0; 
    };

    const calculateHealthScore = () => {
        const satFatDV = getNumericNutrient('fat'); 
        const sodiumDV = getNumericNutrient('sodium');
        const sugarDV = getNumericNutrient('sugars'); 
        const proteinDV = getNumericNutrient('proteins'); 
        const fiberDV = getNumericNutrient('fiber');          
        const vitDDV = getNumericNutrient('vitamin_d'); 
        const calciumDV = getNumericNutrient('calcium'); 
        const ironDV = getNumericNutrient('iron');
        const potassiumDV = getNumericNutrient('potassium'); 

        const penaltyPoints = 
            Math.floor(satFatDV / 5) + 
            Math.floor(sodiumDV / 5) + 
            Math.floor(sugarDV / 5);

        const totalMicrosDV = vitDDV + calciumDV + ironDV + potassiumDV;

        const bonusPoints = 
            Math.floor(proteinDV / 5) + 
            Math.floor(fiberDV / 5) + 
            Math.floor(totalMicrosDV / 5);

        let rawScore = 100 - penaltyPoints + bonusPoints;
        return Math.max(0, Math.min(100, rawScore));
    };

    const finalScore = calculateHealthScore();

    return (
        <div className="flex justify-center items-center p-8 bg-zinc-900 rounded-2xl">
            {/* Pass the calculated score down into the dumb component */}
            <ScoreCircle score={finalScore} label="Health Score" />
        </div>
    );
}