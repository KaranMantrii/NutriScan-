import React from "react";
import { ScanLine, House, User } from 'lucide-react';
import { Link } from "react-router-dom";
import QuaggaScanner from "../Components/Cam.jsx";  

export default function Scan() {
    return (
        <div className="min-h-dvh text-white overflow-x-hidden pb-28">
            
            {/* Header */}
            <header className="fixed top-0 left-0 z-50 p-5 sm:p-4 text-center flex items-center justify-center w-full">
                <h4 className="text-lg font-medium text-zinc-300 font-chillax">SCANNER</h4>
            </header>

            {/* Info Text */}
            <div className="text-center pt-20 p-6 flex flex-col items-center justify-center w-full"> 
                <p className="text-4xl text-white font-exposebl">Position the barcode</p>
                <p className="text-[16px] text-zinc-400 mt-1 font-exposer">Align it within the frame to start scanning</p>
            </div>

            {/* Outer Green Rectangular Scanner Frame */}
<div className="w-90 h-70 mx-auto mt-6 rounded-2xl flex items-center justify-center border-2 border-green-500/30 relative shadow-lg shadow-green-900/20 ">
    
    {/* Inner Transparent Viewfinder Window */}
    <div className="w-87.5 h-62.5  rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
        <QuaggaScanner />
        </div>
        
        {/* Glowing Scanner Corners */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-green-400 rounded-tl-xl z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-green-400 rounded-tr-xl z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-green-400 rounded-bl-xl z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-green-400 rounded-br-xl z-10 pointer-events-none"></div>
        
        {/* Full-Width Scanline Locked Perfectly in the Middle */}
        <div className="w-full h-0.5 bg-green-400 absolute top-1/2 left-0 -translate-y-1/2 shadow-[0_0_12px_rgba(74,222,128,0.8)] animate-pulse z-10 pointer-events-none"></div>
    </div>
</div>

            {/* Footer Navigation */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-4">
                <div className="w-full h-auto rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-xl">
                    <div className="flex w-full items-center justify-around p-3 text-white">
                        
                        {/* Home Link */}
                        <Link 
                            to="/home" 
                            className="text-[22px] sm:text-2xl font-medium flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity font-chillax"
                        >
                            <House className="w-6 h-6 text-white" />
                            <span className="text-sm font-normal">Home</span>
                        </Link>

                        {/* Scanner Core Button */}
                        <button 
                            onClick={() => console.log("Footer scan clicked")}
                            className="rounded-2xl flex items-center justify-center bg-green-400 p-3 
                            shadow-[0_0_25px_rgba(74,222,128,0.45),0_0_50px_rgba(74,222,128,0.2)] 
                            border border-green-300/40 w-44 cursor-pointer transition-all duration-150
                            hover:brightness-105 active:scale-95"
                        >
                            <ScanLine className="w-8 h-8 text-black" />
                        </button>
                        
                        {/* Profile Link */}
                        <Link 
                            to="/profile" 
                            className="text-[22px] sm:text-2xl font-medium flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity font-chillax"
                        >
                            <User className="w-6 h-6 text-white" />
                            <span className="text-sm font-normal">Profile</span>
                        </Link>

                    </div>
                </div>
            </footer>

        </div>
    );
}