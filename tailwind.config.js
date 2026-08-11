/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#eab308',
            600: '#ca8a04',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
            950: '#3b0764',
          },
          dark: '#111827',
          card: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Hero', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.25)',
        'glow-yellow': '0 0 25px -5px rgba(253, 224, 71, 0.35)',
        'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
