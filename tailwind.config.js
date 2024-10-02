/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include your source files
    "./node_modules/preline/preline.js",
    "./node_modules/preline/dist/*.js", // Add this for Preline
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("preline/plugin"), // Add Preline as a plugin
  ],
 
};
