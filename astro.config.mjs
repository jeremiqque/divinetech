// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  // Fonts are downloaded from Fontshare when the site is built or run,
  // then served from the site itself (not from Fontshare) to visitors.
  fonts: [
    {
      name: "Clash Grotesk",
      cssVariable: "--font-clash-grotesk",
      provider: fontProviders.fontshare(),
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      name: "General Sans",
      cssVariable: "--font-general-sans",
      provider: fontProviders.fontshare(),
      weights: [400, 500, 600],
      styles: ["normal"],
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
});
