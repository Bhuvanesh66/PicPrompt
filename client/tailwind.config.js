/**
 * Tailwind CSS Configuration
 *
 * This file configures the Tailwind CSS framework for the project.
 *
 * Features:
 * - Dark mode support using class strategy
 * - Custom color scheme with CSS variables
 * - Content configuration for purging
 * - Safe list for dynamically used classes
 * - Extended theme configuration
 *
 * Configuration includes:
 * - Content paths for purging unused styles
 * - Dark mode configuration
 * - Custom color definitions
 * - Theme extensions
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  darkMode: "class",
  safelist: ["text-gray-400", "dark:text-gray-500"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
