import React, { useRef } from 'react';
import { PhoneMockup } from '../../Components/PhoneMockup.jsx';
import ShinyText from '../../Components/ShinyText.jsx';
import GradientText from '../../Components/GradientText.jsx';
import GlassSurface from '../../Components/GlassSurface.jsx';
import ElectricBorder from '../../Components/ElectricBorder.jsx';
import Stepper, { Step } from '../../Components/Stepper.jsx';
import { ScanBarcode, ScanLine, MoveRight, Zap, Salad, Dumbbell } from 'lucide-react';
import '../../styles.css';

function Index() {
  const featuresRef = useRef(null);
  const howToRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="w-full min-h-[100dvh] bg-hero text-white overflow-x-hidden">
      
      {/* ================= NAVIGATION ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6">
        <GlassSurface
          brightness={50}
          opacity={0.9}
          width="100%"
          height="auto" // Changed to auto for padding-based height
          borderRadius={24}
        >
          <nav className="flex items-center justify-between py-3 px-4 sm:px-8 max-w-7xl mx-auto gap-28">
            <div className="flex items-center gap-2 font-stardom">
              <ScanBarcode className="text-green-400 w-6 h-6 sm:w-8 sm:h-8" />
              <div className="text-xl sm:text-2xl font-bold">
                <ShinyText text="NutriScan+" speed={2} color="#b5b5b5" shineColor="#84CC16" />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-10 font-chillax text-sm uppercase tracking-widest">
              <button onClick={() => scrollTo(featuresRef)} className="hover:text-green-400 transition-colors">Features</button>
              <button onClick={() => scrollTo(howToRef)} className="hover:text-green-400 transition-colors">Process</button>
              <a href="#" className="hover:text-green-400 transition-colors">About</a>
            </div>

            <button className="bg-green-500 hover:bg-green-400 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm font-black shadow-xl shadow-green-500/20 active:scale-95 transition-all">
              LAUNCH APP
            </button>
          </nav>
        </GlassSurface>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[100dvh] flex flex-col items-center pt-[15vh] pb-12 px-6">
        {/* Background Layering */}
        <div className="absolute inset-0 bg-grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-full bg-hero-glow pointer-events-none" />

        <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
          {/* Clamp ensures text scales between 2.5rem and 6rem based on screen size */}
          <h1 className="font-author font-extrabold leading-[1.1] tracking-tight text-[clamp(2.5rem,8vw,6rem)]">
            <GradientText colors={["#84CC16", "#10B981", "#cda6f1"]} animationSpeed={8}>
              Nutrition, Decoded!
            </GradientText>
          </h1>
          <p className="mt-6 text-zinc-400 font-outfit text-base sm:text-xl md:text-2xl max-w-2xl mx-auto px-4">
            Scan any product. Get instant insights. Build a healthier you with NutriScan+.
          </p>
        </div>

        {/* Dynamic Phone Container: Scales based on height (vh) to avoid clipping */}
        <div className="relative z-0 mt-8 md:mt-12 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px] h-auto drop-shadow-[0_0_50px_rgba(132,204,22,0.2)]">
          <PhoneMockup />
        </div>

        {/* Action Group */}
        <div className="relative z-10 mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 px-10 py-5 rounded-2xl font-black text-lg transition-all hover:-translate-y-1 shadow-2xl shadow-green-500/40">
            <ScanLine className="w-5 h-5" />
            Get Started
            <MoveRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollTo(howToRef)}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all font-bold"
          >
            Watch Demo
          </button>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section ref={featuresRef} className="py-24 sm:py-32 px-6 relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter">
            <GradientText colors={["#84CC16", "#cda6f1"]}>Beyond Scanning</GradientText>
          </h2>
        </div>

        {/* auto-fit grid ensures responsiveness without media queries for every size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
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
      <section ref={howToRef} className="py-24 px-6 md:px-12 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl sm:text-5xl font-bold mb-4">How it Works</h2>
             <p className="text-zinc-500">Three simple steps to nutritional clarity.</p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-6 sm:p-12 backdrop-blur-3xl overflow-hidden">
            <Stepper initialStep={1}>
              <Step title="1. Aim">
                <p className="text-zinc-400 text-lg sm:text-xl font-light">Open the scanner and align any product barcode within the neon frame.</p>
              </Step>
              <Step title="2. Analyze">
                <p className="text-zinc-400 text-lg sm:text-xl font-light">Watch as our AI breaks down ingredients into readable, honest insights.</p>
              </Step>
              <Step title="3. Choose">
                <p className="text-zinc-400 text-lg sm:text-xl font-light">Compare alternatives suggested by Nutriscan+ and make the better choice.</p>
              </Step>
            </Stepper>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, tag, desc }) {
  return (
    <ElectricBorder color="#84CC16" speed={0.15} chaos={0.05} thickness={2} style={{ borderRadius: 32 }}>
      <div className="h-full p-10 rounded-[30px] bg-white/[0.03] backdrop-blur-2xl border border-white/5 flex flex-col group hover:bg-white/[0.07] transition-all duration-500">
        <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-8 group-hover:scale-110 transition-transform duration-500">
          {React.cloneElement(icon, { size: 28 })}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
          <span className="text-[10px] font-black tracking-widest bg-white/10 px-2 py-1 rounded-md text-zinc-300 uppercase">{tag}</span>
        </div>
        <p className="text-zinc-400 text-lg leading-relaxed font-light">{desc}</p>
      </div>
    </ElectricBorder>
  );
}

export default Index;