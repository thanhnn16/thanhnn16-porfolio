export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.vueApp.config.errorHandler = (error: any, instance: any, info: string) => {
      console.error('Global error:', error)
      console.error('Error info:', info)

      // Có thể gửi error tới service như Sentry
      // if (import.meta.client) {
      //   Sentry.captureException(error)
      // }
    }

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      // Sentry.captureException(event.reason)
    })
  }
})
