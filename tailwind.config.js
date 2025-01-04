module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme
        light: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9FAFB',
          accent: '#F3F4F6'
        },
        // Dark theme 
        dark: {
          DEFAULT: '#18181B',
          secondary: '#27272A',
          accent: '#3F3F46'
        },
        // Primary colors
        primary: {
          DEFAULT: '#4F46E5',
          50: '#EEF2FF',
          100: '#E0E7FF', 
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81'
        },
        // Gray scale
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB', 
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        },
        // System colors
        success: '#10B981',
        warning: '#F59E0B', 
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'none': 'none'
      }
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        ':root': {
          '--color-primary': '#4F46E5',
          '--color-text': '#111827',
          '--color-text-secondary': '#4B5563',
          '--color-background': '#FFFFFF',
          '--color-background-secondary': '#F9FAFB',
        },
        '.dark': {
          '--color-primary': '#818CF8',
          '--color-text': '#F9FAFB',
          '--color-text-secondary': '#9CA3AF',
          '--color-background': '#18181B',
          '--color-background-secondary': '#27272A',
        }
      })
    }
  ],
}
