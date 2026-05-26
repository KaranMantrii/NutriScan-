import React, { useRef, useEffect, useState } from "react";
import Quagga from "@ericblade/quagga2";

let stopTimer = null;
let quaggaActive = false;

const REQUIRED_HITS = 5; // same code must appear this many times in a row

const QuaggaScanner = ({ onDetected }) => {
    const scannerRef = useRef(null);
    const onDetectedRef = useRef(onDetected);
    const lastCode = useRef(null);
    const hitCount = useRef(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        onDetectedRef.current = onDetected;
    }, [onDetected]);

    useEffect(() => {
        if (!scannerRef.current) return;

        const handleDetected = (result) => {
            const code = result?.codeResult?.code;
            if (!code) return;

            if (code === lastCode.current) {
                hitCount.current += 1;
                if (hitCount.current >= REQUIRED_HITS) {
                    // Confirmed — reset and fire
                    lastCode.current = null;
                    hitCount.current = 0;
                    onDetectedRef.current?.(code);
                }
            } else {
                // Different code — start fresh count
                lastCode.current = code;
                hitCount.current = 1;
            }
        };

        Quagga.onDetected(handleDetected);

        if (stopTimer !== null) {
            clearTimeout(stopTimer);
            stopTimer = null;
        } else if (!quaggaActive) {
            quaggaActive = true;
            Quagga.init(
                {
                    inputStream: {
                        type: "LiveStream",
                        target: scannerRef.current,
                        constraints: {
                            facingMode: "environment",
                            aspectRatio: { ideal: 16 / 9 },
                        },
                    },
                    locator: { patchSize: "large", halfSample: true },
                    numOfWorkers: 0,
                    decoder: {
                        readers: ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"],
                    },
                    locate: true,
                },
                (err) => {
                    if (err) {
                        console.error("Quagga init failed:", err);
                        quaggaActive = false;
                        setError("Camera failed to start.");
                        return;
                    }
                    Quagga.start();
                }
            );
        }

        return () => {
            Quagga.offDetected(handleDetected);
            stopTimer = setTimeout(() => {
                stopTimer = null;
                quaggaActive = false;
                Quagga.stop();
            }, 150);
        };
    }, []);

    if (error) {
        return (
            <div
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                className="flex items-center justify-center p-4"
            >
                <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
        );
    }

    return (
        <>
            <style>{`
                .nutriscan-cam video {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                }
                .nutriscan-cam canvas { display: none !important; }
            `}</style>
            <div
                ref={scannerRef}
                className="nutriscan-cam"
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                }}
            />
        </>
    );
};

export default QuaggaScanner;
