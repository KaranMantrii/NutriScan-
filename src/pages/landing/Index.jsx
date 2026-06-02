import React from "react";
import { PhoneMockup } from "../../Components/PhoneMockup.jsx";
import ShinyText from "../../Components/ShinyText.jsx";
import GradientText from "../../Components/GradientText.jsx";
import GlassSurface from "../../Components/GlassSurface.jsx";
import ElectricBorder from "../../Components/ElectricBorder.jsx";
import Stepper, { Step } from "../../Components/Stepper.jsx";
import {
  ScanBarcode,
  ScanLine,
  MoveRight,
  Zap,
  Salad,
  Dumbbell,
} from "lucide-react";
import "../../styles.css";

// 1. ADDED Navigate and useNavigate to imports
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Home from "../Home.jsx";
import Scan from "../Scan.jsx";
import Fitness from "../fitness.jsx";
import Tips from "../tips.jsx";
import Result from "../Results.jsx";
import Recipe from "../Recipes.jsx";
import Profile from "../Profile.jsx";
import InstallButton from "../../Components/InstallButton.jsx";

function LandingContent() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    localStorage.setItem("hasVisited", "true");
    navigate("/home");
  };

  return (
    <>
      {/* ================= NAVIGATION ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4">
        <GlassSurface
          brightness={50}
          opacity={0.9}
          width="100%"
          height="auto"
          borderRadius={24}
        >
          <nav className="flex justify-start py-3 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 font-stardom">
              <ScanBarcode className="text-green-400 w-6 h-6 sm:w-8 sm:h-8" />
              <div className="text-2xl sm:text-2xl font-bold ">
                <ShinyText
                  text="NutriScan+"
                  speed={2}
                  color="#b5b5b5"
                  shineColor="#84CC16"
                />
              </div>
            </div>
          </nav>
        </GlassSurface>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[calc(100dvh-6rem)] flex flex-col items-center pt-[5vh] pb-12 px-4">
        <div className="absolute inset-0 bg-grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-full bg-hero-glow pointer-events-none" />

        <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
          <h1 className="font-author font-extrabold leading-[1.1] tracking-tight text-[clamp(2.5rem,7vw,5rem)]">
            <GradientText
              colors={["#84CC16", "#10B981", "#cda6f1"]}
              animationSpeed={8}
            >
              Nutrition, Decoded!
            </GradientText>
          </h1>
          <p className="mt-4 text-zinc-400 font-outfit text-base sm:text-lg max-w-xl mx-auto px-2">
            Scan any product. Get instant insights. Build a healthier you with
            NutriScan+.
          </p>
        </div>

        <div className="relative z-0 mt-5 w-full max-w-65 sm:max-w-[320px] h-auto drop-shadow-[0_0_40px_rgba(132,204,22,0.15)]">
          <PhoneMockup />
        </div>

        <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-4 w-full max-w-xs mx-auto">
          {/* Removed the <Link> tag here, letting the button's onClick handle it cleanly */}
          <button
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 px-8 py-4 rounded-xl font-black font-outfit text-base transition-all hover:-translate-y-0.5 shadow-xl shadow-green-500/30 text-black cursor-pointer"
            onClick={handleGetStarted}
          >
            <ScanLine className="w-5 h-5" />
            Get Started
            <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-400 font-chillax text-xs uppercase tracking-[0.2em] mb-2 block">
            Core Capabilities
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-author py-2">
            <GradientText colors={["#84CC16", "#cda6f1"]}>
              Beyond Scanning
            </GradientText>
          </h2>
          <p className="text-zinc-500 font-outfit max-w-md mx-auto mt-1 text-sm">
            NutriScan+ transforms raw barcode data into actionable health
            insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap />}
            title="Instant Scan"
            tag="LIVE"
            desc="Our proprietary 3-layer verification scans barcodes and cross-references global databases in under 0.8 seconds."
          />
          <FeatureCard
            icon={<Salad />}
            title="Clean Label"
            tag="SMART"
            desc="Instantly identify ultra-processed ingredients, hidden sugars, and harmful additives with a simple color grade."
          />
          <FeatureCard
            icon={<Dumbbell />}
            title="Custom Macro"
            tag="PRO"
            desc="Set your fitness goals and let Nutriscan+ calculate if a product fits your daily protein and calorie windows."
          />
        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section className="relative z-10 py-16 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-4xl font-bold mb-2 font-author py-1">
            <GradientText colors={["#ffffff", "#84CC16"]}>
              How it Works
            </GradientText>
          </h2>
          <p className="text-zinc-500 font-outfit text-sm">
            Three simple steps to nutritional clarity.
          </p>
        </div>

        <div className="bg-white/2 border border-white/5 rounded-3xl p-6 backdrop-blur-3xl overflow-hidden">
          <Stepper initialStep={1}>
            <Step title="1. Aim">
              <p className="text-zinc-400 text-base font-light font-outfit">
                Click the get started button to navigate to the home page, then
                hold your mobile phone steady and place the product barcode in
                the barcode scanning frame.
              </p>
            </Step>
            <Step title="2. Analyze">
              <p className="text-zinc-400 text-base font-light font-outfit">
                The system will immediately lock onto the tracking lines,
                decipher the manufacturing data, and cross-reference massive
                nutritional networks in a split second.
              </p>
            </Step>
            <Step title="3. Choose">
              <p className="text-zinc-400 text-base font-light font-outfit">
                You can then review how the item impacts your personal daily
                goals, explore healthier alternative items recommended by our
                analysis, and confidently make the best decision for your
                lifestyle without guessing.
              </p>
            </Step>
          </Stepper>
        </div>
      </section>
    </>
  );
}

// 3. MASTER ROUTER
function Index() {
  const hasVisited = localStorage.getItem("hasVisited");

  return (
    <BrowserRouter>
      <div className="w-full min-h-dvh bg-hero text-white overflow-x-hidden font-outfit">
        <InstallButton />
        <main className="max-w-7xl mx-auto px-4 pt-13">
          <Routes>
            {/* The Smart Route */}
            <Route
              path="/"
              element={
                hasVisited ? (
                  <Navigate to="/home" replace />
                ) : (
                  <LandingContent />
                )
              }
            />

            {/* Standard Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/result" element={<Result />} />
            <Route path="/recipes" element={<Recipe />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

// ==============================================================
// FEATURE CARD COMPONENT
// ==============================================================
function FeatureCard({ icon, title, tag, desc }) {
  return (
    <ElectricBorder
      color="#84CC16"
      speed={0.15}
      chaos={0.05}
      thickness={2}
      style={{ borderRadius: 24 }}
    >
      <div className="h-full p-6 rounded-[22px] bg-white/3 backdrop-blur-2xl border border-white/5 flex flex-col group transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-6 group-hover:scale-105 transition-transform duration-300">
          {React.cloneElement(icon, { size: 22 })}
        </div>
        <div className="flex items-center gap-3 mb-3 font-author">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {title}
          </h3>
          <span className="text-[9px] font-black tracking-widest bg-white/10 px-1.5 py-0.5 rounded text-zinc-300 uppercase">
            {tag}
          </span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed font-light font-outfit">
          {desc}
        </p>
      </div>
    </ElectricBorder>
  );
}

export default Index;
