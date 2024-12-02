// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6DECBF', // Main accent color
          light: '#40C1AB',  // Secondary tone for headers or buttons
          dark: '#0A8F96',   // Darker tone for links or subtle highlights
        },
        neutral: {
          background: '#D9DBDA', // Very light teal for backgrounds
          text: '#2E2E2E',       // Dark gray for text
        },
      },
    },
  },
  plugins: [],
};
