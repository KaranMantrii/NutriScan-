import ShinyText from '../../Components/ShinyText.jsx';
import GradientText from '../../Components/GradientText.jsx';
import GlassSurface from '../../Components/GlassSurface.jsx';
import ElectricBorder from '../../Components/ElectricBorder.jsx'; 
import Stepper,{Step} from '../../Components/Stepper.jsx';
import {  useRef } from 'react';
import '../../styles.css';

import { PhoneMockup } from '../../Components/PhoneMockup.jsx';

import {
  ScanBarcode,
  ScanLine,
  MoveRight,
  Zap,
  Salad,
  Dumbbell
} from 'lucide-react';

function Index() {
  const nextSectionRef = useRef(null);

  function scrollToNext() {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className="w-full overflow-x-hidden bg-hero">

      {/* ================= NAVBAR ================= */}

      <GlassSurface
        displace={0.5}
        distortionScale={-180}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        brightness={50}
        opacity={0.93}
        width="100%"
        height={65}
        borderRadius={20}
        mixBlendMode="screen"
      >
        <nav className="fixed top-0 left-0 right-0 w-full h-16 z-50">

          <div className="w-full h-full px-4 sm:px-6 flex items-center justify-between">

            {/* Logo */}
            <div className="text-2xl font-bold text-white flex items-center gap-1.5 font-stardom">

              <ScanBarcode
                className="text-green-400"
                size={28}
              />

              <span>
                <ShinyText
                  text="NutriScan+"
                  speed={2}
                  delay={0}
                  color="#b5b5b5"
                  shineColor="#84CC16"
                  spread={120}
                  direction="left"
                />
              </span>

            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 font-chillax">

              <a
                href="#features"
                className="text-white hover:text-green-400 transition"
              >
                Features
              </a>

              <a
                href="#"
                className="text-white hover:text-green-400 transition"
              >
                How It Works
              </a>

              <a
                href="#"
                className="text-white hover:text-green-400 transition"
              >
                About Us
              </a>

              <a
                href="#"
                className="text-white hover:text-green-400 transition"
              >
                Contact Us
              </a>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

              <button className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-outfit font-extrabold text-white shadow-lg shadow-green-500/30 transition-all duration-300 ease-out hover:scale-105 hover:bg-green-400 hover:shadow-green-400/50 hover:-translate-y-1 active:scale-95">
                Open App
              </button>

            </div>

          </div>

        </nav>
      </GlassSurface>

      {/* ================= HERO SECTION ================= */}

      <section className="relative min-h-screen px-4 sm:px-6 overflow-hidden">

        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-noise-overlay opacity-30 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[40%] bg-hero-glow pointer-events-none" />

        {/* Hero Text */}
        <div className="absolute top-1 sm:top-32 md:top-36 left-1/2 -translate-x-1/2 z-10 w-full px-4 text-center font-author font-extrabold text-[44px] sm:text-5xl md:text-7xl">

          <GradientText
            colors={["#84CC16", "#10B981", "#cda6f1"]}
            animationSpeed={8}
            showBorder={false}
            className="custom-class"
          >
            Nutrition, Decoded!<br/>
           <p className='text-[22px]'>Scan. Analyze. Improve.</p>
          </GradientText>

        </div>

        {/* Phone Mockup */}
        <div className="absolute top-95 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 text-center pointer-events-none">

          <PhoneMockup />

        </div>

        {/* Bottom Buttons */}
        <div className="absolute top-150 inset-x-0 bottom-25 z-10 flex flex-col sm:flex-row items-center justify-center gap-3 px-4">

          {/* Scroll Button */}
          <button
            className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-outfit font-extrabold text-white shadow-lg shadow-green-500/30 transition-all duration-300 ease-out hover:scale-105 hover:bg-green-400 hover:shadow-green-400/50 hover:-translate-y-1 active:scale-95"
          >

            <ScanLine className="h-5 w-5" />

            Get Started

            <MoveRight className="h-5 w-5" />

          </button>

          {/* Secondary Button */}
          <button
            className="flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-outfit font-extrabold text-white backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:bg-white/20 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(255,255,255,0.16)] active:scale-95"
          >
            How To
          </button>

        </div>

      </section>

      {/* ================= FEATURES SECTION ================= */}

      <section
        id="features"
        ref={nextSectionRef}
        className="relative min-h-screen px-4 sm:px-6 overflow-hidden">

        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-overlay pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[40%] bg-hero-glow pointer-events-none" />

        {/* Hero Text */}
        <div className="absolute top-25 sm:top-32 md:top-36 left-1/2 -translate-x-1/2 z-10 px-4 text-center font-author whitespace-nowrap font-extrabold text-5xl sm:text-5xl md:text-7xl ">
          <div className="inline-block">
          <GradientText
            colors={["#84CC16", "#10B981", "#cda6f1"]}
            animationSpeed={8}
            showBorder={false}
            className="custom-class"
          >
           Why Nutriscan+ ?
          </GradientText></div>
        </div>
        {/* Features List */}
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 z-0 flex flex-col md:flex-row items-center justify-center gap-6 w-full px-4">
          <ElectricBorder
            color="#84CC16"
            speed={0.2}
            chaos={0.05}
            thickness={2}
            style={{ borderRadius: 20 }}
          >
  <div className="group relative w-[90vw] max-w-85 sm:max-w-full overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl p-5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(132,204,22,0.18)]">

    {/* Content */}
    <div className="relative flex flex-col gap-4">

      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10">
        <Zap className="h-5 w-5 text-lime-300" />
      </div>

      {/* Text */}
      <div>

        {/* Title */}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl font-bold text-white">
            Instant Scan
          </h3>

          <div className="rounded-full bg-lime-400/10 border border-lime-400/20 px-2 py-1 text-[10px] font-semibold text-lime-300">
            LIVE
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-[16px] leading-7 text-zinc-300">
          Scan food products instantly with 3-level barcode verification and ingredient analysis.
        </p>

      </div>
    </div>
  </div>
</ElectricBorder>

<ElectricBorder
  color="#84CC16"
  speed={0.2}
  chaos={0.05}
  thickness={2}
  style={{ borderRadius: 20 }}
>
  <div className="group relative w-[90vw] max-w-85 sm:max-w-full overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl p-5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(132,204,22,0.18)]">


    {/* Content */}
    <div className="relative flex flex-col gap-4">

      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10">
        <Salad className="h-5 w-5 text-lime-300" />
      </div>

      {/* Text */}
      <div>

        {/* Title */}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl font-bold text-white">
            Nutrition Insights
          </h3>

          <div className="rounded-full bg-lime-400/10 border border-lime-400/20 px-2 py-1 text-[10px] font-semibold text-lime-300">
            ACCURATE
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-[16px] leading-7 text-zinc-300">
          Get detailed nutritional information and insights about the food products you scan.
        </p>

      </div>
    </div>
  </div>
</ElectricBorder>
<ElectricBorder
  color="#84CC16"
  speed={0.2}
  chaos={0.05}
  thickness={2}
  style={{ borderRadius: 20 }}
>
  <div className="group relative w-[90vw] max-w-85 sm:max-w-full overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl p-5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(132,204,22,0.18)]">


    {/* Content */}
    <div className="relative flex flex-col gap-4">

      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10">
        <Dumbbell className="h-5 w-5 text-lime-300" />
      </div>

      {/* Text */}
      <div>

        {/* Title */}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl font-bold text-white">
            Fitness Plans
          </h3>

          <div className="rounded-full bg-lime-400/10 border border-lime-400/20 px-2 py-1 text-[10px] font-semibold text-lime-300">
            PERSONALIZED
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-[16px] leading-7 text-zinc-300">
          Adaptive fitness plans tailored to your goals, nutrition, and daily progress.
        </p>

      </div>
    </div>
  </div>
</ElectricBorder>
        </div>
      </section>

    <section
        id="howto"
        ref={nextSectionRef}
        className="relative min-h-screen px-4 sm:px-6 overflow-hidden">

        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-overlay pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[40%] bg-hero-glow pointer-events-none" />

        {/* Hero Text */}
        <div className="absolute top-25 sm:top-32 md:top-36 left-1/2 -translate-x-1/2 z-10 px-4 text-center font-author whitespace-nowrap font-extrabold text-6xl sm:text-5xl md:text-7xl ">
          <div className="inline-block">
          <GradientText
            colors={["#84CC16", "#10B981", "#cda6f1"]}
            animationSpeed={8}
            showBorder={false}
            className="custom-class"
          >
           How To ?
          </GradientText></div>
          </div>
          <div className="mt-50 flex justify-center">
  <Stepper
    initialStep={1}
    onStepChange={(step) => console.log(step)}
    backButtonText="Previous"
    nextButtonText="Next"
  >
    <Step>
      <div className="space-y-4">
        <p className="text-2xl font-epilogue text-white">
          Step 1
        </p>

        <p className="text-lg leading-relaxed font-outfit text-zinc-300">
          Click on the "Get Started" button and place
          the barcode inside the frame for scanning.
        </p>
      </div>
    </Step>

    <Step>
      <div className="space-y-4">
        <p className="text-2xl font-epilogue text-white">
          Step 2
        </p>

        <p className="text-lg leading-relaxed font-outfit text-zinc-300">
          After a few seconds of scanning, the
          nutritional information will appear instantly.
        </p>
      </div>
    </Step>

    <Step>
      <div className="space-y-4">
        <p className="text-2xl font-epilogue text-white">
          Step 3
        </p>

        <p className="text-lg leading-relaxed font-outfit text-zinc-300">
          Analyze the nutritional insights carefully
          and choose healthier options for your diet.
        </p>
      </div>
    </Step>

    <Step>
      <div className="space-y-4">
        <p className="text-2xl font-epilogue text-white">
          Step 4
        </p>

        <p className="text-lg leading-relaxed font-outfit text-zinc-300">
          Continue scanning more products and track
          your nutrition regularly to achieve your
          health goals.
        </p>
      </div>
    </Step>
  </Stepper>
</div>

      </section>
    </div>
  );
}

export default Index;
