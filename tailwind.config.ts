import daisyui from "daisyui";

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        outline: "Bungee Outline, sans-serif",
      },
    },
  },
  content: ["./formkit-theme.js"],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mybooks: {
          primary: "#26cf80",

          secondary: "#7dd3fc",

          accent: "#ddd6fe",

          neutral: "#291334",

          "base-100": "#ffffff",

          info: "#7dd3fc",

          success: "#86efac",

          warning: "#fde047",

          error: "#ef4444",
        },
      },
      "cyberpunk",
      "halloween",
      "dark",
    ],
  },
};
