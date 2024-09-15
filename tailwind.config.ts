import daisyui from "daisyui";
import flowbite from "flowbite/plugin";
import forms from "@tailwindcss/forms";

module.exports = {
  content: ["./formkit-theme.js", "./node_modules/flowbite/**/*.{js,ts}"],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        custom: {
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
    ],
  },
};
