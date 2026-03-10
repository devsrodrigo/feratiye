/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7A142C",
        forest: "#21463E",
        soft: "#c1c2a9",
        blush: "#E4A2A0",
        dark: "#111616",
        cream: "#FAF9F6",
      },
    },
  },
  plugins: [],
};

export default config;

