import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Fundesoemco Tracker App",
        short_name: "Fundesoemo Tracker",
        description:
          "Fundesoemco Tracker App es una aplicación web/mobile diseñada para gestionar y registrar el ingreso de los trabajadores de la empresa Fundesoemco en obras o campo mediante escaneo de códigos",
        theme_color: "#ffffff",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/iconAppMobile.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/iconApp.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:5173\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "local-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400,
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
  },
});
