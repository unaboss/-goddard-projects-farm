import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-earth': '#1A1410',
        'rich-soil': '#261F1A',
        'forest-canopy': '#2D5A27',
        'forest-canopy-light': '#3F7840',
        'harvest-gold': '#C8A951',
        'harvest-gold-light': '#D4AF37',
        'warm-cream': '#F5F0E8',
        'dusty-clay': '#A89880',
        'subtle-earth': '#3A3228',
      },
      fontFamily: {
        heading: ["'Playfair Display'", 'serif'],
        body: ["'DM Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
