import React, { useState, useRef } from "react";
// 1. ADDED 'Search' TO IMPORTS
import { ScanLine, House, User, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import QuaggaScanner from "../Components/Cam.jsx";

export default function Scan() {
  const navigate = useNavigate();

  const [barcode, setBarcode] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scanLock = useRef(false);

  // 2. STATE FOR THE SEARCH BAR
  const [searchQuery, setSearchQuery] = useState("");

  const handleDetected = async (barcodeNumber) => {
    if (scanLock.current) return;
    scanLock.current = true;

    setBarcode(barcodeNumber);
    setProduct(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcodeNumber}.json`,
      );
      const data = await res.json();

      if (data.status === 0) {
        setError("Product not found in database.");
      } else {
        setProduct(data.product);
        // Navigate to the results page and pass the product data
        navigate("/result", { state: { product: data.product } });
      }
    } catch {
      setError("Network error. Please check your connection.");
    }

    setLoading(false);
    setTimeout(() => {
      scanLock.current = false;
    }, 3000);
  };

  // 3. NEW FUNCTION FOR MANUAL TEXT SEARCH
  const handleTextSearch = async (e) => {
    e.preventDefault(); // Prevents page reload on enter
    if (!searchQuery.trim()) return;

    setBarcode(null); // Clear barcode state
    setProduct(null);
    setError(null);
    setLoading(true);

    try {
      // Use the text search API endpoint
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchQuery)}&search_simple=1&action=process&json=1`,
      );
      const data = await res.json();

      if (!data.products || data.products.length === 0) {
        setError(`No products found for "${searchQuery}".`);
      } else {
        // Grab the first (most relevant) product from the search results
        const foundProduct = data.products[0];

        // Navigate to the results page just like the barcode scanner does
        navigate("/result", { state: { product: foundProduct } });
      }
    } catch {
      setError("Network error. Please check your connection.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-dvh text-white overflow-x-hidden pb-28">
      {/* Header */}
      <header className=" top-0 left-0 z-50 p-5 sm:p-4 text-center flex items-center justify-center w-full">
        <h4 className="text-lg font-medium text-zinc-300 font-chillax">
          SCANNER
        </h4>
      </header>

      {/* Info Text */}
      <div className="text-center pt-20 p-6 flex flex-col items-center justify-center w-full">
        <p className="text-4xl text-white font-exposebl">
          Position the barcode
        </p>
        <p className="text-[16px] text-zinc-400 mt-1 font-exposer">
          Align it within the frame to start scanning
        </p>
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

      {/* --- NEW: MANUAL SEARCH BAR UI --- */}
      <div className="mx-6 mt-8 max-w-sm sm:mx-auto">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase">
            Or Search Manually
          </span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <form onSubmit={handleTextSearch} className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g., Nutella, Evian..."
            className="w-full bg-zinc-900/60 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-white placeholder-zinc-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all shadow-lg"
          />
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
      {/* --------------------------------- */}

      {/* Results / Status Indicators */}
      <div className="mt-5 mx-5">
        {loading && (
          <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-2xl flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-300 font-medium">Searching database...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-center">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
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
