export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    // Safer approach for localStorage
    const safeStorage = {
      getItem: (key: string) => {
        try {
          const value = localStorage.getItem(key)
          return value ? decodeURIComponent(value) : null
        } catch {
          return null
        }
      },
      setItem: (key: string, value: string) => {
        try {
          localStorage.setItem(key, encodeURIComponent(value))
        } catch {
          console.warn('Failed to save to localStorage')
        }
      },
      removeItem: (key: string) => {
        try {
          localStorage.removeItem(key)
        } catch {
          console.warn('Failed to remove from localStorage')
        }
      }
    }

    // Make safeStorage available globally
    nuxtApp.provide('safeStorage', safeStorage)
  }
}) 