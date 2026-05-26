import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Flame, Wheat, Leaf, Droplet } from "lucide-react";
import Nutricircle from "../Components/Nutricircle";    

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Retrieve the product data passed via router state
    const product = location.state?.product;

    // Fallback if accessed directly without scanning
    if (!product) {
        return (
            <div className="min-h-dvh flex flex-col items-center justify-center text-white p-6 bg-zinc-950">
                <p className="text-zinc-400 mb-4">No product data found.</p>
                <button 
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-green-400 text-black rounded-xl font-medium"
                >
                    Go Back to Scanner
                </button>
            </div>
        );
    }

    const nutriments = product.nutriments || {};

    // Helper to safely get nutrient values
    const getNutrient = (key) => {
        const val = nutriments[`${key}_100g`];
        return val !== undefined ? `${val}${nutriments[`${key}_unit`] || 'g'}` : 'N/A';
    };

    return (
        <div className="min-h-dvh bg-zinc-950 text-white overflow-x-hidden pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 p-5 bg-zinc-950/80 backdrop-blur-md flex items-center border-b border-white/10">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors">
                    <ChevronLeft className="w-6 h-6 text-zinc-300" />
                </button>
                <h4 className="text-lg font-medium text-zinc-300 font-chillax ml-2 flex-1">RESULTS</h4>
            </header>

            <main className="p-5 space-y-6">
                {/* Product Overview Card */}
                <div className="flex gap-4 p-4 bg-zinc-900/60 border border-white/10 rounded-2xl shadow-lg">
                    {product.image_front_url ? (
                        <img 
                            src={product.image_front_url} 
                            alt={product.product_name} 
                            className="w-24 h-24 object-contain bg-white rounded-xl p-1"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-zinc-800 rounded-xl flex items-center justify-center">
                            <span className="text-xs text-zinc-500">No Image</span>
                        </div>
                    )}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-xl font-bold text-white leading-tight">
                            {product.product_name || "Unknown Product"}
                        </h1>
                        <p className="text-sm text-zinc-400 mt-1">{product.brands || "Unknown Brand"}</p>
                        
                        {/* Nutri-score Badge */}
                    <div className="shrink-0">
                        <NutriGauge grade={product.nutriscore_grade} />
                    </div>
                    </div>
                </div>

                {/* Macronutrients Grid (Per 100g) */}
                <div>
                    <h2 className="text-sm font-medium text-zinc-400 mb-3 px-1 uppercase tracking-wider">Nutrition Facts (Per 100g)</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Calories */}
                        <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-2xl flex items-center gap-3">
                            <div className="p-2 bg-orange-500/20 text-orange-400 rounded-xl"><Flame className="w-5 h-5" /></div>
                            <div>
                                <p className="text-xs text-zinc-400">Calories</p>
                                <p className="font-bold">{nutriments['energy-kcal_100g'] ? `${nutriments['energy-kcal_100g']} kcal` : 'N/A'}</p>
                            </div>
                        </div>
                        {/* Protein */}
                        <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-2xl flex items-center gap-3">
                            <div className="p-2 bg-green-500/20 text-green-400 rounded-xl"><Leaf className="w-5 h-5" /></div>
                            <div>
                                <p className="text-xs text-zinc-400">Protein</p>
                                <p className="font-bold">{getNutrient('proteins')}</p>
                            </div>
                        </div>
                        {/* Carbs */}
                        <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-2xl flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-xl"><Wheat className="w-5 h-5" /></div>
                            <div>
                                <p className="text-xs text-zinc-400">Carbs</p>
                                <p className="font-bold">{getNutrient('carbohydrates')}</p>
                            </div>
                        </div>
                        {/* Fats */}
                        <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-2xl flex items-center gap-3">
                            <div className="p-2 bg-red-500/20 text-red-400 rounded-xl"><Droplet className="w-5 h-5" /></div>
                            <div>
                                <p className="text-xs text-zinc-400">Fat</p>
                                <p className="font-bold">{getNutrient('fat')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ingredients List */}
                <div className="p-5 bg-zinc-900/60 border border-white/10 rounded-2xl">
                    <h2 className="text-sm font-medium text-zinc-400 mb-2 uppercase tracking-wider">Ingredients</h2>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        {product.ingredients_text ? product.ingredients_text : "Ingredients list not available for this product."}
                    </p>
                </div>
            </main>
        </div>
    );
}