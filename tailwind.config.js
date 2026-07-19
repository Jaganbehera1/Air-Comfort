/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0b60a0',
        'brand-red': '#dc3a2d',
        'brand-orange': '#f26b2b',
        'brand-cyan': '#17a9d9',
        'brand-navy': '#0f2644',
        'brand-sand': '#fff7f1',
        'brand-ice': '#eef8ff',
      },
    },
  },
  plugins: [],
};
