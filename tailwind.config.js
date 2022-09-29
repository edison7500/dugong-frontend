module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      // padding: '2rem',
    },
    // color: {
    //   transparent: "transparent",
    //   black: "#000",
    //   white: "#fff",
    // },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
  ],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: ["light", "dark", "business"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    // darkTheme: "dark",
  },
}
