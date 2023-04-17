/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-text": "#262626",
        "gray-text": " #70757A",
        "gray-border": "#e6e6e6",
        "bg-light-blue": "#E5F6FD",
        "bg-blue": "#00A5E5",
        "body-bg": "#F8F9FA",
        "dark-blue-bg": "#0a0c21",
      },
      fontSize: {
        sm: "10px",
        base: "13px",
        xl: "15px",
        "2xl": "19px",
        "3xl": "26px",
        23: "23px",
      },
    },
  },
  plugins: [],
};
