import React, {useRef, useEffect, useState} from "react";
import Quagga from "@ericblade/quagga2";

const QuaggaScanner = () =>{
    const scannerRef = useRef(null);
    const [barcode, setBarcode] = useState("")
    const [error, setError] = useState(null); 

    useEffect(()=>{
        Quagga.init(
            {
                inputStream: {
                    type:"LiveStream",
                    target: scannerRef.current,
                    constraints:{
                        facingMode:"environment",
                        width: {min: 640},
                        height: {min: 480},
                    },
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true,
                },
                numOfWorkers: navigator.hardwareConcurrency || 2,
                decoder: {
                    readers: [
                       "ean_reader",
                       "ean_8_reader",
                       "upc_reader",
                       "upc_e_reader" 
                    ]
                },
                locate: true,
            },
            (err) => {
                if (err) {
                    console.error("Initialization failed:",err);
                    setError("Camera permission denied or not supported.");
                    return;
                }
                Quagga.start();
            }
        );

        const handleDetected = (result) => {
            if (result && result.codeResult && result.codeResult.code){
                const scannedCode = result.codeResult.code;
                setBarcode(scannedCode);
            }
        };

        Quagga.onDetected(handleDetected);

        return () =>{
            Quagga.offDetected(handleDetected);
            Quagga.stop();
        };
    },[]);

    return (
    <div style={{ maxWidth: "500px" }}>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        /* The video feed will be injected into this div */
        <div 
          ref={scannerRef} 
          style={{ 
            width: "100%", 
            borderRadius: "8px", 
            overflow: "hidden", 
            border: "2px solid #ccc",
            position: "relative"
          }} 
        >
            {/* Quagga injects <video> and <canvas> tags here dynamically */}
        </div>
      )}

      {/* Displaying the Result */}
      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
        {barcode ? (
          <p style={{ margin: 0 }}><strong>Scanned Code:</strong> {barcode}</p>
        ) : (
          <p style={{ margin: 0, color: "#666" }}>Point your camera at a barcode...</p>
        )}
      </div>
    </div>
  );
};

export default QuaggaScanner;
