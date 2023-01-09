/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#74db69",

          secondary: "#fca4a5",

          accent: "#cd8df4",

          neutral: "#1B1622",

          "base-100": "#1f2937",

          info: "#80C6F4",

          success: "#1D9066",

          warning: "#F88F25",

          error: "#F65A6A",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
