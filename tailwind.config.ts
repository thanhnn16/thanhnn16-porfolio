import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/@nuxt/ui-templates/**/*.{js,ts,vue}",
    "./node_modules/@nuxt/ui/**/*.{js,vue,ts}"
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9FAFB',
          accent: '#F3F4F6'
        },
        dark: {
          DEFAULT: '#18181B',
          secondary: '#27272A',
          accent: '#3F3F46'
        },
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
          900: '#111827',
          950: '#030712'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  }
} satisfies Config
