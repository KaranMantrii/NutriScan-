import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share, PlusSquare, X, Smartphone } from "lucide-react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Check if the app is already installed
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;

    if (isStandalone) return; // Don't show if already installed!

    // 2. Handle Android / Desktop Chrome
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari =
      /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);

    if (isIosDevice && isSafari) {
      setIsIOS(true);
      setShowPrompt(true);
    }

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 z-[100] max-w-lg mx-auto"
        >
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
                <Smartphone className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-outfit font-bold text-sm">
                  Install NutriScan+
                </h4>
                {isIOS ? (
                  <p className="text-zinc-400 text-xs font-outfit flex items-center gap-1 mt-0.5">
                    Tap <Share className="w-3 h-3" /> then{" "}
                    <PlusSquare className="w-3 h-3" /> Add to Home Screen
                  </p>
                ) : (
                  <p className="text-zinc-400 text-xs font-outfit mt-0.5">
                    Add to home screen for quick access.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isIOS && (
                <button
                  onClick={handleInstallClick}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-xl text-xs font-bold font-outfit transition-colors"
                >
                  Install
                </button>
              )}
              <button
                onClick={() => setShowPrompt(false)}
                className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
