/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          tertiary: '#F1F5F9',
        },
        primary: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
          pale: '#EFF6FF',
        },
        cyan: {
          DEFAULT: '#0891B2',
          light: '#06B6D4',
        },
        emerald: {
          DEFAULT: '#059669',
          light: '#10B981',
        },
        amber: {
          DEFAULT: '#D97706',
          light: '#F59E0B',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          tertiary: '#94A3B8',
          onPrimary: '#FFFFFF',
        },
        border: {
          light: '#E2E8F0',
          medium: '#CBD5E1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
        en: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        medium: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        large: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
        glow: '0 0 30px rgba(37, 99, 235, 0.2)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563EB 0%, #0891B2 100%)',
        'gradient-alternative': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #3B82F6 0%, #0EA5E9 100%)',
      },
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

