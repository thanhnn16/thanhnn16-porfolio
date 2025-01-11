export default defineNuxtRouteMiddleware(async () => {
  try {
    // Validate storage data
    const validateStorage = async () => {
      const keys = ['nuxt-color-mode', 'i18n_redirected']
      for (const key of keys) {
        try {
          const value = localStorage.getItem(key)
          if (value && typeof value === 'string') {
            JSON.parse(value)
          }
        } catch (e) {
          localStorage.removeItem(key)
        }
      }
    }

    if (import.meta.client) {
      await validateStorage()
    }
  } catch (error) {
    console.error('Storage validation error:', error)
  }
})