import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Automatically updates the app when you push new code
      includeAssets: ["favicon.ico", "apple-touch-icon.png"], // Add these to your public folder
      manifest: {
        name: "NutriScan+",
        short_name: "NutriScan",
        description: "Your AI-powered nutrition assistant",
        theme_color: "#09090b", // Matches your zinc-950 background
        background_color: "#09090b",
        display: "standalone", // This hides the browser URL bar!
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
