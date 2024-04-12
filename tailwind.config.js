/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./formkit.config.js"],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
