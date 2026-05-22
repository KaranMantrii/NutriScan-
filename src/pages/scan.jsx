import React from "react";
import { Flame, ScanLine, Salad, Dumbbell, ScanHeart, Link } from 'lucide-react';
import GlassSurface from "../Components/GlassSurface.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Scan(){
    return (
        <div className=" min-h-dvh  text-white overflow-x-hidden">
            <header className="fixed top-0 left-0 z-50 p-5 sm:p-4 text-center flex items-center justify-center w-full">
                <h4 className=" text-lg font-medium text-zinc-300  font-chillax">SCANNER</h4>
            </header>

            <div className="left-0 text-center p-6 items-center justify-center w-full"> 
                <p className="text-4xl text-white font-exposebl">Position the barcode</p>
                <p className="text-[16px] text-zinc-400 mt-1 font-exposer">Align it within the  frame to start scanning</p>
            </div>

                <div className="w-95 h-80 mx-auto mt-3 rounded-2xl flex items-center justify-center border-2 border-green-500/30 relative shadow-lg shadow-green-900/50">
                <div className="w-85 h-70 mx-auto bg-black rounded-2xl flex items-center justify-center shadow-lg relative">
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-400 rounded-tl-2xl"></div>
                
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-400 rounded-tr-2xl"></div>
                
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-400 rounded-bl-2xl"></div>
                
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-400 rounded-br-2xl"></div>
                    <ScanLine className="w-full h-1 bg-green-400 absolute animate-pulse" />
                </div>
        </div>
        </div>
    );
};