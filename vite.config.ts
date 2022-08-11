import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { icons } from "react-icons";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets:["assets/favicon.ico","assets/apple-touch-icon.png", "assets/masked-icon.png"],
      manifest: {
        name: "Public-Transport-Radar",
        short_name: "Public-Transport-Radar",
        display: "standalone",
        description: "Finde deine nächsten Abfahrten in wenigen Sekunden!",
        lang: "german",
        theme_color: "#789E9E",
        background_color: "#1A202C",
        orientation: "portrait",
        icons: [
          {
            src: "assets/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "assets/pwa-192x192.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "assets/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        screenshots: [
          {
            src: "assets/screenshots/Screenshot1.PNG",
            sizes: "389x842",
            type: "image/png",
          },
          {
            src: "assets/screenshots/Screenshot2.PNG",
            sizes: "389x842",
            type: "image/png",
          },
          {
            src: "assets/screenshots/Screenshot3.PNG",
            sizes: "389x842",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
