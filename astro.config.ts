import { defineConfig } from "astro/config";

// Integrations
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import compress from "astro-compress";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    compress(),
    react(),
  ],
});
