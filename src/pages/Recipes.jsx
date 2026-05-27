import React from "react";
import {useState} from "react";
import GradientText from "../Components/GradientText.jsx";

export default function Recipe(){
    const [currentIngredient, setCurrentIngredient] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleAddIngredient = (e) =>{
        e.preventDefault();
        if(currentIngredient.trim() !== "" && !ingredients.includes(currentIngredient)) {
            setIngredients([...ingredients, currentIngredient.trim()])
            setCurrentIngredient("")
        }
    };

    const removeIngredient = (indexToRemove) => {
        setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
    };

    const generateRecipe = async() => {
        if(ingredients.length == 0) return alert("Add Some Ingredients First!!");
        setLoading(true);

        const prompt = `You are an expert chef. Create a recipe using these ingredients: ${ingredients.join(", ")}. 
                        You can assume standard pantry staples (salt, pepper, oil, water) are available.
                        Return ONLY a raw JSON object with this exact structure, no markdown, no backticks:
                    {
                    "recipeName": "String",
                    "prepTime": "String",
                    "missingIngredients": ["String"],
                    "instructions": ["String"]
                    }`;

    try{
        const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json"
            }
          }),
        }
      );

      const data = await response.json();
      const generatedJSON = JSON.parse(data.candidates[0].content.parts[0].text);
      setRecipe(generatedJSON);

    }catch(error){
        console.error("Chefs Out of Recipes:",error);
        alert("Check your API Key and Try Again!");
    }finally{
        setLoading(false)
    }
    }


return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 className="text-5xl font-bold text-white font-author">
            <GradientText colors={["#84CC16", "#10B981", "#cda6f1"]} animationSpeed={8}>
                NutriScan+ Kitchen
            </GradientText></h1>
      
      {/* 1. Input Section */}
      <form onSubmit={handleAddIngredient} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          placeholder="e.g., chicken, broccoli, rice..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Add</button>
      </form>

      {/* 2. Visual Tags (Chips) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {ingredients.map((item, index) => (
          <span key={index} style={{ background: '', padding: '5px 12px', borderRadius: '20px' }}>
            {item} 
            <button onClick={() => removeIngredient(index)} style={{ marginLeft: '8px', cursor: 'pointer', border: 'none', background: 'none' }}>x</button>
          </span>
        ))}
      </div>

      {/* 3. The Generate Button */}
      <button 
        onClick={generateRecipe} 
        disabled={loading || ingredients.length === 0}
        style={{ width: '100%', padding: '15px', fontSize: '18px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {loading ? "Chef is thinking..." : "Generate Recipe"}
      </button>

      {/* 4. The Recipe Display */}
      {recipe && (
        <div style={{ marginTop: '30px', borderTop: '2px solid #ccc', paddingTop: '20px' }}>
          <h3>{recipe.recipeName} ⏱️ {recipe.prepTime}</h3>
          
          <p><strong>You might also need to buy:</strong></p>
          <ul>
            {recipe.missingIngredients.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <p><strong>Instructions:</strong></p>
          <ol>
            {recipe.instructions.map((step, i) => <li key={i} style={{ marginBottom: '10px' }}>{step}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
};