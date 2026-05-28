import { useState } from "react";

const STORAGE_KEY = "nutriscan_profile";

const DEFAULT_PROFILE = {
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    healthGoals: [],
    allergens: [],
    dietaryPreferences: [],
};

export function useProfile() {
    // On first load, pull saved data out of localStorage (if any)
    const [profile, setProfile] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved
                ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) }
                : { ...DEFAULT_PROFILE };
        } catch {
            return { ...DEFAULT_PROFILE };
        }
    });

    // Update a single text/number/select field
    const updateField = (key, value) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
    };

    // Toggle an item in an array field (health goals, allergens, diet prefs)
    const toggleArrayField = (key, item) => {
        setProfile((prev) => {
            const arr = prev[key];
            return {
                ...prev,
                [key]: arr.includes(item)
                    ? arr.filter((i) => i !== item)
                    : [...arr, item],
            };
        });
    };

    // Write the current profile to localStorage
    const saveProfile = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    };

    // Read back the saved profile (useful for other pages)
    const loadProfile = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    };

    return { profile, updateField, toggleArrayField, saveProfile, loadProfile };
}
