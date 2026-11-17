import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          dark: "#2A1D15",        // Deep espresso brown
          DEFAULT: "#3A281E",     // Classic antique brown
          light: "#5A4232",       // Warm walnut
          border: "#D8C7B5",      // Vintage edge/border
          borderDark: "#8C6F56",  // Darker vintage border
          cream: "#FAF6EE",       // Old parchment cream
          parchment: "#F5EFE4",   // Warm paper beige
          sand: "#EBDCCB",        // Sand tone
          gold: "#C59B4B",        // Soft antique gold
          goldDark: "#9E762E",    // Aged brass / dark gold
          goldLight: "#DFBF7A",   // Gentle warm gold highlight
          muted: "#78685A",       // Antique muted text
          charcoal: "#1F1813",    // Vintage dark text
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Jost'", "'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        vintage: "0 4px 20px -2px rgba(42, 29, 21, 0.08)",
        vintageHover: "0 8px 30px -4px rgba(42, 29, 21, 0.14)",
        vintageDrawer: "-4px 0 25px rgba(42, 29, 21, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
