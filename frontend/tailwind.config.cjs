const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("@tailwindcss/aspect-ratio"),
    require("daisyui"),
    iconsPlugin({
      collections: getIconCollections(["fluent", "uil"]),
    }),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
          // "primary": "blue",
        },
      },
    ],
  },
};
