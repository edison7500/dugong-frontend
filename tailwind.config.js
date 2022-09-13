module.exports = {
  content: [
    "node_modules/preline/dist/*.js",
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
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: ["light", "black"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    // darkTheme: "black",
  },
}
