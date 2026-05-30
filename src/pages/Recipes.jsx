import React, { useState } from "react";
import GradientText from "../Components/GradientText.jsx";
import {
  Clock,
  ChefHat,
  X,
  Utensils,
  House,
  ScanLine,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function Recipe() {
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (
      currentIngredient.trim() !== "" &&
      !ingredients.includes(currentIngredient)
    ) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const generateRecipe = async () => {
    if (ingredients.length === 0) return alert("Add Some Ingredients First!!");
    setLoading(true);

    const prompt = `You are an expert nutritionist and chef. Create the healthiest possible recipe using ONLY these ingredients: ${ingredients.join(", ")}. 
                        You can assume standard pantry staples (salt, pepper, cooking oil, water) are available, but DO NOT add or suggest any other extra ingredients.
                        Return ONLY a raw JSON object with this exact structure:
                    {
                    "recipeName": "String (Give it a healthy, appealing name)",
                    "prepTime": "String",
                    "instructions": ["String (Include health benefits in the steps where relevant)"]
                    }`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        },
      );

      const data = await response.json();

      // 1. Check for API-level errors (e.g., bad API key, quota exceeded)
      if (!response.ok) {
        console.error("Gemini API Error details:", data);
        throw new Error(
          data.error?.message || `HTTP error! status: ${response.status}`,
        );
      }

      // 2. Safely extract the text
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textResponse) {
        console.error("Unexpected API response structure:", data);
        throw new Error("API responded, but missing expected content.");
      }

      // 3. Parse the JSON
      const generatedJSON = JSON.parse(textResponse);
      setRecipe(generatedJSON);
    } catch (error) {
      console.error("Chefs Out of Recipes:", error);
      // Alert now shows the actual error message for easier debugging
      alert(`Generation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 flex justify-center items-start pb-25">
      <div className="w-max max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 border">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[45px] md:text-5xl font-bold font-author tracking-tight">
            <GradientText
              colors={["#84CC16", "#10B981", "#cda6f1"]}
              animationSpeed={8}
            >
              NutriScan+ Kitchen
            </GradientText>
          </h1>
          <p className="text-neutral-400 mt-2 font-chillax">
            The healthiest meal possible, using strictly what you have.
          </p>
        </div>

        {/* 1. Input Section */}
        <form
          onSubmit={handleAddIngredient}
          className="flex gap-3 mb-6 font-chillax"
        >
          <input
            type="text"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            placeholder="e.g., chicken breast, broccoli, quinoa..."
            className="flex-1 px-4 py-3 bg-neutral-900 text-white rounded-xl border border-neutral-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder-neutral-500"
          />
          <button
            type="submit"
            className="px-4 py-3 text-white bg-green-500 font-medium rounded-xl transition-colors duration-200"
          >
            Add
          </button>
        </form>

        {/* 2. Visual Tags (Chips) */}
        <div className="flex flex-wrap gap-2 mb-8 font-chillax min-h-10">
          {ingredients.length === 0 && (
            <span className="text-neutral-500 italic text-sm py-2">
              No ingredients added yet...
            </span>
          )}
          {ingredients.map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-full text-sm font-medium animate-fade-in"
            >
              {item}
              <button
                onClick={() => removeIngredient(index)}
                className="hover:text-white transition-colors focus:outline-none"
                aria-label="Remove ingredient"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>

        {/* 3. The Generate Button */}
        <button
          onClick={generateRecipe}
          disabled={loading || ingredients.length === 0}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-chillax text-lg font-semibold transition-all duration-200 
                        ${
                          loading || ingredients.length === 0
                            ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                            : "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/20"
                        }`}
        >
          <ChefHat className={`w-6 h-6 ${loading ? "animate-pulse" : ""}`} />
          {loading ? "Crafting healthy recipe..." : "Generate Healthy Recipe"}
        </button>

        {/* 4. The Recipe Display (Missing Ingredients section removed) */}
        {recipe && (
          <div className="mt-10 rounded-xl p-6 border border-neutral-700 font-exposer animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-800">
              <h3 className="text-2xl md:text-3xl font-bold text-white text-balance leading-tight font-author">
                {recipe.recipeName}
              </h3>
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-lg whitespace-nowrap">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">{recipe.prepTime}</span>
              </div>
            </div>

            <div className="space-y-8 text-neutral-300">
              {/* Instructions Section Only */}
              <div>
                <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                  <Utensils className="w-5 h-5 text-neutral-400 font-exposer" />
                  Instructions:
                </h4>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-green-400 font-bold border border-neutral-700">
                        {i + 1}
                      </span>
                      <span className="pt-1 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
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
