/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cafe: {
          primary: "#6f9169",
          "primary-content": "#fdfcfb",
          secondary: "#887367",
          "secondary-content": "#fdfcfb",
          accent: "#c0848c",
          "accent-content": "#fdfcfb",
          neutral: "#b3a69e",
          "neutral-content": "#ffffff",
          "base-100": "#fdfcfb",
          "base-200": "#f6f1ea",
          "base-300": "#f1eae0",
          "base-content": "#5c5650",
          info: "#6eabb6",
          "info-content": "#fdfcfb",
          success: "#91ad6a",
          "success-content": "#fdfcfb",
          warning: "#c4863a",
          "warning-content": "#fdfcfb",
          error: "#bb5049",
          "error-content": "#fdfcfb",
        },
      },
    ],
  },
};
