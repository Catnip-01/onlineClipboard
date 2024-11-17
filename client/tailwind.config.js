module.exports = {
  content: ["./src/**/*.{js,jsx}"], // Ensures Tailwind scans all JS and JSX files in the src directory
  theme: {
    extend: {
      colors: {
        background: "#0d0d0d", // For general background
        objectBg: "#191919", // For objects like post backgrounds
        textColor: "#ffffff", // For text color to match dark theme
        gptGray: {
          // Custom gray shades as specified
          300: "#191919",
          400: "#202020",
          900: "#0d0d0d",
        },
      },
    },
  },
  plugins: [],
};
