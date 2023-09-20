/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./components/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
  "./features/**/*.{ts,tsx}",
  "./layout/**/*.{ts,tsx}",
];
export const theme = {

  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      dark: {
        50: '#BFBFBF',
        100: '#B5B5B5',
        200: '#A1A1A1',
        300: '#8C8C8C',
        400: '#787878',
        500: '#646464',
        600: '#4F4F4F',
        700: '#3B3B3B',
        800: '#262626',
        900: '#121212',
        950: '#040404'
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};
export const plugins = [
  require("tailwindcss-animate"),
  require("@tailwindcss/typography"),
];
