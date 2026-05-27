import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 

export default function Nutricircle() {
    const location = useLocation();
    
    // Safely retrieve product to prevent crashes if state is undefined
    const product = location.state?.product || {};
    const nutriments = product.nutriments || {};

    // MUST return numbers so the math doesn't result in NaN
    const getNumericNutrient = (key) => {
        const val = nutriments[`${key}_100g`];
        return val !== undefined ? parseFloat(val) : 0; 
    };

    function calculateHealthScore() {
        // Fetch values using standard API keys
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
    }

    // Calculate the precise 0-100 score
    const calculatedScore = calculateHealthScore();
    
    // Determine color and label dynamically based on the exact score thresholds
    const getScoreDisplay = (score) => {
        if (score >= 80) return { color: 'text-green-400', hex: '#4ade80', label: 'Excellent' };
        if (score >= 60) return { color: 'text-lime-400', hex: '#a3e635', label: 'Good' };
        if (score >= 40) return { color: 'text-yellow-400', hex: '#facc15', label: 'Moderate' };
        if (score >= 20) return { color: 'text-orange-400', hex: '#fb923c', label: 'Poor' };
        return { color: 'text-red-500', hex: '#ef4444', label: 'Bad' };
    };

    const currentDisplay = getScoreDisplay(calculatedScore);

    const [animatedOffset, setAnimatedOffset] = useState(125.6); 

    const radius = 40;
    const circumference = Math.PI * radius; 
    // Map the precise score directly to the SVG stroke offset (0 to 100%)
    const targetOffset = circumference - (calculatedScore / 100) * circumference;

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedOffset(targetOffset), 100);
        return () => clearTimeout(timer);
    }, [targetOffset]);

    return (
        <div className="flex flex-col items-center justify-center p-5 bg-zinc-900/60 border border-white/10 rounded-2xl shadow-lg relative overflow-hidden">
            <svg 
                className="w-48 h-28 transform rotate-180" 
                viewBox="0 0 100 50"
            >
                <path
                    d="M 10 0 A 40 40 0 0 0 90 0"
                    fill="none"
                    stroke="#27272a" 
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M 10 0 A 40 40 0 0 0 90 0"
                    fill="none"
                    stroke={currentDisplay.hex}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={animatedOffset}
                    className="transition-all duration-1000 ease-out"
                    style={{ 
                        filter: calculatedScore > 0 ? `drop-shadow(0 0 6px ${currentDisplay.hex}60)` : 'none' 
                    }}
                />
            </svg>
            
            <div className="absolute top-14 flex flex-col items-center">
                <span className={`text-4xl font-black ${currentDisplay.color}`}>
                    {calculatedScore}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium tracking-widest mt-1 uppercase">
                    {currentDisplay.label}
                </span>
            </div>
        </div>
    );
}