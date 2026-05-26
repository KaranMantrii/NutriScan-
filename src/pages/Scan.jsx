import React, { useState, useRef } from "react";
import { ScanLine, House, User } from 'lucide-react';
import { Link } from "react-router-dom";
import QuaggaScanner from "../Components/Cam.jsx";
import { useNavigate } from "react-router-dom";
import Result from "./Results.jsx";
import { div } from "motion/react-client";

export default function Scan() {
    const navigate = useNavigate();
    
    const [barcode, setBarcode] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const scanLock = useRef(false);

    const handleDetected = async (barcodeNumber) => {
        if (scanLock.current) return;
        scanLock.current = true;

        setBarcode(barcodeNumber);
        setProduct(null);
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcodeNumber}.json`);
            const data = await res.json();
            
            if (data.status === 0) {
                setError("Product not found in database.");
            } else {
                setProduct(data.product);
                // Navigate to the results page and pass the product data
                navigate('/result', { state: { product: data.product } }); 
            }
        } catch {
            setError("Network error. Please check your connection.");
        }

        setLoading(false);
        setTimeout(() => { scanLock.current = false; }, 3000);
    };

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

            {/* Scanner Frame */}
            <div className="w-90 h-70 mx-auto mt-6 rounded-2xl flex items-center justify-center border-2 border-green-500/30 relative shadow-lg shadow-green-900/20">
                <div className="w-full h-full rounded-xl relative overflow-hidden">
                    <QuaggaScanner onDetected={handleDetected} />
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-green-400 rounded-tl-xl z-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-green-400 rounded-tr-xl z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-green-400 rounded-bl-xl z-10 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-green-400 rounded-br-xl z-10 pointer-events-none"></div>
                    <div className="w-full h-0.5 bg-green-400 absolute top-1/2 left-0 -translate-y-1/2 shadow-[0_0_12px_rgba(74,222,128,0.8)] animate-pulse z-10 pointer-events-none"></div>
                </div>
            </div>

            {/* Results */}
            {barcode && (
                <div className="mt-5 mx-5 p-4 bg-zinc-900/60 border border-white/10 rounded-2xl space-y-3">
                    <div>
                        <p className="text-zinc-500 text-xs mb-0.5">Barcode</p>
                        <p className="text-white font-mono text-lg">{barcode}</p>
                    </div>

                    {loading && (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                            <p className="text-zinc-400 text-sm">Looking up product…</p>
                        </div>
                    )}

                    {product && (
                        <div>
                            <p className="text-zinc-500 text-xs mb-0.5">Product</p>
                            <p className="text-green-400 font-bold">{product.product_name || "Unknown name"}</p>
                            {product.brands && (
                                <p className="text-zinc-400 text-sm">{product.brands}</p>
                            )}
                        </div>
                    )}

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}
                </div>
            )}

            {/* Footer Navigation */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-4">
                <div className="w-full h-auto rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-xl">
                    <div className="flex w-full items-center justify-around p-3 text-white">

                        <Link
                            to="/home"
                            className="text-[22px] sm:text-2xl font-medium flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:opacity-80 transition-opacity font-chillax"
                        >
                            <House className="w-6 h-6 text-white" />
                            <span className="text-sm font-normal">Home</span>
                        </Link>

                        <button
                            className="rounded-2xl flex items-center justify-center bg-green-400 p-3
                            shadow-[0_0_25px_rgba(74,222,128,0.45),0_0_50px_rgba(74,222,128,0.2)]
                            border border-green-300/40 w-44 cursor-pointer transition-all duration-150
                            hover:brightness-105 active:scale-95"
                        >
                            <ScanLine className="w-8 h-8 text-black" />
                        </button>

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
