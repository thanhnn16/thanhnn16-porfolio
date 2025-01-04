import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
      console.error('Global error:', error)
      console.error('Error info:', info)

      // Có thể gửi error tới service như Sentry
      // if (import.meta.client) {
      //   Sentry.captureException(error)
      // }
    }

    // Handle unhandled promise rejections
    if (import.meta.client) {
      window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason)
        // Sentry.captureException(event.reason)
      })
    }
  }
})
