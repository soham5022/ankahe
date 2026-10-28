/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ankahe: {
          // 1. Restored Original Palette
          bg: '#111216',             // Primary background (deep charcoal-black)
          secondary: '#191A20',      // Secondary background
          elevated: '#202127',       // Elevated surfaces
          card: '#191A20',           // Card surfaces
          
          // Primary & secondary text
          text: '#F3EFE8',           // Primary text (warm ivory for headings and high contrast)
          muted: '#AAA6A1',          // Secondary text (soft, warm grey)
          faint: '#75726D',          // Subdued metadata text
          
          // Muted gold accents
          gold: '#C7A878',           // Muted gold accent
          'gold-light': '#DFC49B',   // Soft light gold for italics/hover
          'gold-dark': '#9E8055',    // Deep gold for borders
          
          // Subtle borders
          border: '#34343A',         // Subtle borders
          'border-light': '#45454E', // Lighter border for interactive states
          
          // Warm ivory & paper surfaces
          paper: '#F2EDE4',          // Warm ivory surface
          'paper-light': '#FAF7F2',   // Soft paper highlight
          'paper-dark': '#292722',   // Dark text on ivory surfaces
          'paper-border': '#DFD7CA', // Border for ivory elements
          'paper-muted': '#E8E1D5',  // Secondary background on paper
          'paper-faint': '#78736B',  // Subdued labels on paper
          
          // Semantic alias for editorial compatibility
          brown: '#C7A878',          // Points to muted gold
          'brown-light': '#DFC49B',    // Points to soft gold
          'faded-rose': '#B58C88',
          burgundy: '#573A40',
          ink: '#292722',
          cream: '#FAF7F2',
          ivory: '#F2EDE4',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
        nastaliq: ['"Noto Nastaliq Urdu"', '"Noto Sans Devanagari"', 'serif'],
        handwriting: ['"Kalam"', '"Caveat"', 'cursive'],
      },
      boxShadow: {
        'paper': '0 8px 24px -6px rgba(0, 0, 0, 0.35), 0 2px 6px -2px rgba(0, 0, 0, 0.2)',
        'paper-warm': '0 12px 30px -8px rgba(17, 18, 22, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)',
        'subtle': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'gold-glow': '0 0 20px -3px rgba(199, 168, 120, 0.18)',
      }
    },
  },
  plugins: [],
}
