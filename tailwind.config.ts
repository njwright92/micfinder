import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'custom': '0.625rem'
      },
      colors: {
        foreground: 'rgb(var(--foreground-rgb))',
        backgroundStart: 'rgb(var(--background-start-rgb))',
        backgroundEnd: 'rgb(var(--background-end-rgb))',
        neuButtonBorder: '#ffffff',
        modernInputBorder: '#c0c0c0',
        modernInputBg: '#e5e0e0',
        eventItemBorder: '#005eff',
        modalContainerBg: '#f5f5f5',
        modalContainerBorder: '#646262',
        authButtonBg: '#000000',
        closeButton: '#6b7280',
        standardInputBorder: '#d1d5db',
        standardInputBg: '#f9fafb',
        theText: '#4b5563',
        // Add other custom colors as needed
      },
      boxShadow: {
        neuButton: '2px 2px 5px rgb(255, 255, 255), -2px -2px 5px rgb(255, 255, 255)',
        // Add other custom shadows as needed
      },
      backgroundImage: {
        // Define a custom gradient
        'gradient-to-b': 'linear-gradient(to bottom, var(--background-start-rgb), var(--background-end-rgb))',
      },
    },
  },
  plugins: [],
};

export default config;
