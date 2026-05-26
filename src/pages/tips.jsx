import {
    Droplets, Moon, Apple, Brain, Sun, Heart, Wind, Coffee, 
    House, ScanLine, User, Eye, Activity, Utensils, Timer, 
    Snowflake, Dumbbell, Move, Salad, GlassWater, Smile, 
    Leaf, Thermometer, Sparkles, Shield, Ear, Sunrise, 
    Sunset, HeartPulse, Lightbulb, Footprints, Zap, Cloud, 
    CheckCircle, Star, ShieldCheck, Fish
} from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import GradientText from "../components/GradientText.jsx";

const tips = [
    {
        id: 0,
        title: "Hydrate first thing",
        description: "A glass of water on waking jumpstarts metabolism and rehydrates after 7+ hours without fluids.",
        icon: Droplets,
        iconBg: "bg-green-500",
        gradientFrom: "from-green-950/60",
    },
    {
        id: 1,
        title: "Wind down screen-free",
        description: "30 minutes off screens before bed helps melatonin rise naturally — fall asleep faster, wake fresher.",
        icon: Moon,
        iconBg: "bg-emerald-600",
        gradientFrom: "from-emerald-950/60",
    },
    {
        id: 2,
        title: "Half your plate plants",
        description: "Aim for veg or fruit on half of every plate. More fiber, more micronutrients, fewer empty calories.",
        icon: Apple,
        iconBg: "bg-green-600",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 3,
        title: "2-minute breathing reset",
        description: "Box-breathing (4-4-4-4) lowers cortisol and clears mental fog in under 120 seconds.",
        icon: Brain,
        iconBg: "bg-teal-600",
        gradientFrom: "from-teal-950/50",
    },
    {
        id: 4,
        title: "Get morning sunlight",
        description: "10 minutes of daylight within an hour of waking anchors your circadian rhythm and lifts mood.",
        icon: Sun,
        iconBg: "bg-lime-600",
        gradientFrom: "from-lime-950/50",
    },
    {
        id: 5,
        title: "Watch hidden sodium",
        description: "Most sodium hides in bread, sauces, and processed snacks — not the salt shaker. Scan labels.",
        icon: Heart,
        iconBg: "bg-green-700",
        gradientFrom: "from-green-950/60",
    },
    {
        id: 6,
        title: "Walk after meals",
        description: "A 10-minute post-meal walk blunts blood sugar spikes by up to 30%.",
        icon: Wind,
        iconBg: "bg-emerald-500",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 7,
        title: "Caffeine cutoff",
        description: "Skip caffeine after 2 PM. Its half-life means it can still disrupt sleep 8 hours later.",
        icon: Coffee,
        iconBg: "bg-lime-700",
        gradientFrom: "from-lime-950/60",
    },
    {
        id: 8,
        title: "20-20-20 Eye Rule",
        description: "Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain.",
        icon: Eye,
        iconBg: "bg-teal-500",
        gradientFrom: "from-teal-950/60",
    },
    {
        id: 9,
        title: "Stand up hourly",
        description: "Prolonged sitting slows metabolism. Stand or stretch for just one minute every hour.",
        icon: Activity,
        iconBg: "bg-green-600",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 10,
        title: "Chew food 30 times",
        description: "Digestion begins in the mouth. Chewing thoroughly reduces bloating and improves nutrient absorption.",
        icon: Utensils,
        iconBg: "bg-lime-500",
        gradientFrom: "from-lime-950/60",
    },
    {
        id: 11,
        title: "Consistent sleep times",
        description: "Going to bed and waking up at the same time daily regulates your body's internal clock.",
        icon: Timer,
        iconBg: "bg-emerald-600",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 12,
        title: "Embrace the cold",
        description: "Ending your shower with 30 seconds of cold water boosts circulation and alertness.",
        icon: Snowflake,
        iconBg: "bg-teal-600",
        gradientFrom: "from-teal-950/60",
    },
    {
        id: 13,
        title: "Prioritize protein",
        description: "Include 20-30g of protein per meal to maintain muscle mass and stay full longer.",
        icon: Dumbbell,
        iconBg: "bg-green-700",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 14,
        title: "Stretch daily",
        description: "Just 5 minutes of daily stretching improves flexibility, posture, and reduces injury risk.",
        icon: Move,
        iconBg: "bg-lime-600",
        gradientFrom: "from-lime-950/60",
    },
    {
        id: 15,
        title: "Eat the rainbow",
        description: "Different colored vegetables provide different phytonutrients. Aim for 3+ colors per meal.",
        icon: Salad,
        iconBg: "bg-emerald-500",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 16,
        title: "Swap soda for sparkling",
        description: "Carbonated water gives you the fizz without the sugar crash or artificial sweeteners.",
        icon: GlassWater,
        iconBg: "bg-teal-500",
        gradientFrom: "from-teal-950/50",
    },
    {
        id: 17,
        title: "Gratitude practice",
        description: "Writing down three things you are grateful for daily visibly reduces stress hormones.",
        icon: Smile,
        iconBg: "bg-green-500",
        gradientFrom: "from-green-950/60",
    },
    {
        id: 18,
        title: "Connect with nature",
        description: "Spending 20 minutes in a green space lowers cortisol and improves focus.",
        icon: Leaf,
        iconBg: "bg-lime-700",
        gradientFrom: "from-lime-950/50",
    },
    {
        id: 19,
        title: "Cool sleep environment",
        description: "Keep your bedroom between 60-67°F (15-19°C) for the most restorative deep sleep.",
        icon: Thermometer,
        iconBg: "bg-emerald-700",
        gradientFrom: "from-emerald-950/60",
    },
    {
        id: 20,
        title: "Floss daily",
        description: "Gum health is directly linked to heart health. Flossing reduces systemic inflammation.",
        icon: Sparkles,
        iconBg: "bg-teal-700",
        gradientFrom: "from-teal-950/50",
    },
    {
        id: 21,
        title: "Feed your gut microbiome",
        description: "Incorporate fermented foods like yogurt, kimchi, or kombucha for better gut flora.",
        icon: Shield,
        iconBg: "bg-green-600",
        gradientFrom: "from-green-950/60",
    },
    {
        id: 22,
        title: "Listen to relaxing music",
        description: "Slow-tempo music can lower your heart rate and ease anxiety almost instantly.",
        icon: Ear,
        iconBg: "bg-lime-500",
        gradientFrom: "from-lime-950/50",
    },
    {
        id: 23,
        title: "Morning stretching",
        description: "Doing light dynamic stretches upon waking relieves muscle stiffness from sleeping.",
        icon: Sunrise,
        iconBg: "bg-emerald-600",
        gradientFrom: "from-emerald-950/60",
    },
    {
        id: 24,
        title: "Evening wind down",
        description: "Dim the lights in your home 2 hours before bed to signal your brain it's night.",
        icon: Sunset,
        iconBg: "bg-teal-600",
        gradientFrom: "from-teal-950/50",
    },
    {
        id: 25,
        title: "Limit processed meat",
        description: "Swapping processed meats for lean poultry or legumes lowers heart disease risk.",
        icon: HeartPulse,
        iconBg: "bg-green-700",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 26,
        title: "Mindful eating",
        description: "Eat without screens. Paying attention to your food prevents overeating by up to 20%.",
        icon: Lightbulb,
        iconBg: "bg-lime-600",
        gradientFrom: "from-lime-950/60",
    },
    {
        id: 27,
        title: "Take the stairs",
        description: "Opting for stairs over elevators provides a micro-workout that boosts cardiovascular health.",
        icon: Footprints,
        iconBg: "bg-emerald-500",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 28,
        title: "Digital detox",
        description: "Take one full day a month completely off social media to reset your dopamine baseline.",
        icon: Zap,
        iconBg: "bg-teal-500",
        gradientFrom: "from-teal-950/60",
    },
    {
        id: 29,
        title: "Meditate daily",
        description: "Just 10 minutes of meditation changes brain structure, increasing focus and calm.",
        icon: Cloud,
        iconBg: "bg-green-500",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 30,
        title: "Limit news consumption",
        description: "Constant doom-scrolling spikes anxiety. Restrict news checking to once a day.",
        icon: ShieldCheck,
        iconBg: "bg-lime-700",
        gradientFrom: "from-lime-950/60",
    },
    {
        id: 31,
        title: "Cook at home",
        description: "Home-cooked meals contain significantly less sodium, hidden sugars, and bad fats.",
        icon: House,
        iconBg: "bg-emerald-700",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 32,
        title: "Omega-3 fatty acids",
        description: "Incorporate walnuts, chia seeds, or fatty fish to support brain health and joint mobility.",
        icon: Fish, // fallback if not available, otherwise Brain/Heart
        iconBg: "bg-teal-700",
        gradientFrom: "from-teal-950/60",
    },
    {
        id: 33,
        title: "Read a physical book",
        description: "Reading lowers heart rate and eases muscle tension up to 68% better than listening to music.",
        icon: Brain,
        iconBg: "bg-green-600",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 34,
        title: "Use a standing desk",
        description: "Alternating between sitting and standing reduces back pain and boosts energy levels.",
        icon: Activity,
        iconBg: "bg-lime-500",
        gradientFrom: "from-lime-950/60",
    },
    {
        id: 35,
        title: "Reduce blue light",
        description: "Use blue light blocking glasses or night mode on devices to protect sleep architecture.",
        icon: Eye,
        iconBg: "bg-emerald-600",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 36,
        title: "Get Vitamin D",
        description: "If you live in a low-sunlight area, consider a Vitamin D supplement to support immunity.",
        icon: Sun,
        iconBg: "bg-teal-600",
        gradientFrom: "from-teal-950/60",
    },
    {
        id: 37,
        title: "Regular checkups",
        description: "Don't skip your annual physicals. Preventative care is much easier than reactive care.",
        icon: CheckCircle,
        iconBg: "bg-green-700",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 38,
        title: "Find a hobby",
        description: "Engaging in a creative hobby offline protects against cognitive decline as you age.",
        icon: Star,
        iconBg: "bg-lime-600",
        gradientFrom: "from-lime-950/60",
    },
    {
        id: 39,
        title: "Nose breathing",
        description: "Breathe through your nose, not your mouth, to filter air and increase oxygen uptake by 20%.",
        icon: Wind,
        iconBg: "bg-emerald-500",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 40,
        title: "Laugh more",
        description: "Laughter decreases stress hormones and triggers the release of feel-good endorphins.",
        icon: Smile,
        iconBg: "bg-teal-500",
        gradientFrom: "from-teal-950/60",
    },
    {
        id: 41,
        title: "Strength training",
        description: "Lifting weights twice a week protects bone density and improves metabolic rate.",
        icon: Dumbbell,
        iconBg: "bg-green-500",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 42,
        title: "Limit alcohol",
        description: "Cutting back on alcohol improves sleep quality almost immediately and aids weight management.",
        icon: GlassWater,
        iconBg: "bg-lime-700",
        gradientFrom: "from-lime-950/60",
    },
    {
        id: 43,
        title: "Practice forgiveness",
        description: "Letting go of grudges lowers blood pressure and significantly reduces anxiety.",
        icon: Heart,
        iconBg: "bg-emerald-700",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 44,
        title: "Foam rolling",
        description: "Self-massage with a foam roller breaks up tight fascia and speeds up muscle recovery.",
        icon: Activity,
        iconBg: "bg-teal-700",
        gradientFrom: "from-teal-950/60",
    },
    {
        id: 45,
        title: "Social connection",
        description: "Strong relationships are a better predictor of a long, healthy life than exercise.",
        icon: User,
        iconBg: "bg-green-600",
        gradientFrom: "from-green-950/50",
    },
    {
        id: 46,
        title: "Eat healthy fats",
        description: "Avocados, olive oil, and nuts help absorb vitamins and keep your brain sharp.",
        icon: Apple,
        iconBg: "bg-lime-500",
        gradientFrom: "from-lime-950/60",
    },
    {
        id: 47,
        title: "Limit fast food",
        description: "Reducing fast food intake cuts out trans fats, which are highly inflammatory.",
        icon: Shield,
        iconBg: "bg-emerald-600",
        gradientFrom: "from-emerald-950/50",
    },
    {
        id: 48,
        title: "Take mini-breaks",
        description: "Working in 90-minute sprints followed by 10-minute rests maximizes productivity and prevents burnout.",
        icon: Timer,
        iconBg: "bg-teal-600",
        gradientFrom: "from-teal-950/60",
    },
    {
        id: 49,
        title: "Stay consistent",
        description: "Small habits done daily yield massive results over time compared to intense, sporadic efforts.",
        icon: Activity,
        iconBg: "bg-green-700",
        gradientFrom: "from-green-950/50",
    }
];

export default function HealthTips() {
    return (
        <div className="text-white pb-32">

            <h1 className="text-5xl font-author font-bold">
                <GradientText colors={["#84CC16", "#10B981", "#cda6f1"]} animationSpeed={8}>
                     Health Tips  
                </GradientText>
            </h1>
            <p className="text-zinc-400 mt-1 text-sm font-chillax">
                Bite-sized, evidence-based habits to upgrade how you feel every day.
            </p>

            {/* Tips Grid */}
            <div className="grid grid-cols-2 gap-3 mt-5">
                {tips.map((tip) => {
                    const Icon = tip.icon;
                    return (
                        <div
                            key={tip.id}
                            className={`
                                relative overflow-hidden rounded-2xl
                                bg-linear-to-br ${tip.gradientFrom} to-neutral-900
                                border border-gray-500/25 p-4
                            `}
                        >
                            <div className={`w-11 h-11 rounded-2xl ${tip.iconBg} flex items-center justify-center mb-3`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="font-bold text-white text-[14px] leading-snug font-exposer">
                                {tip.title}
                            </p>
                            <p className="text-zinc-300 text-[12px] mt-1.5 leading-relaxed">
                                {tip.description}
                            </p>
                        </div>
                    );
                })}

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