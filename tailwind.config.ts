import daisyui from "daisyui";

module.exports = {
  content: ["./formkit-theme.js"],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#26cf80",

          secondary: "#7dd3fc",

          accent: "#ddd6fe",

          neutral: "#86efac",

          "base-100": "#ffffff",

          info: "#7dd3fc",

          success: "#86efac",

          warning: "#fde047",

          error: "#ef4444",
        },
      },
    ],
  },
};
