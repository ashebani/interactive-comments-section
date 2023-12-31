/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryModerateBlue: "hsl(238, 40%, 52%)",
        primarySoftRed: "hsl(358, 79%, 66%)",
        primaryLightGrayishBlue: "hsl(239, 57%, 85%)",
        primaryPaleRed: "hsl(357, 100%, 86%)",
        primaryDarkBlue: "hsl(212, 24%, 26%)",
        neutralGrayishBlue: "hsl(211, 10%, 45%)",
        neutralLightGray: "hsl(223, 19%, 93%)",
        neutralVeryLightGray: "hsl(228, 33%, 97%)",
        neutralWhite: "hsl(0, 0%, 100%)",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
