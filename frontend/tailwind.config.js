/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19', // Deep dark blue/black
        surface: '#1A1F2C', // Slightly lighter for cards
        primary: '#8B5CF6', // Vibrant purple
        secondary: '#3B82F6', // Vibrant blue
        accent: '#F472B6', // Pink accent
        textMain: '#F8FAFC',
        textMuted: '#94A3B8',
        danger: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
