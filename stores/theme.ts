import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      // Save preference to localStorage
      if (import.meta.client) {
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
        // Update document class
        if (this.isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    },

    initTheme() {
      if (import.meta.client) {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
          this.isDark = savedTheme === 'dark'
        } else {
          // Check system preference
          this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        // Update initial class
        if (this.isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }
  }
}) 