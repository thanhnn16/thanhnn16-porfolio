export default defineNuxtPlugin((nuxtApp) => {
  // Default placeholder image URL
  const placeholderImage = 'https://placehold.co/800x600?text=Update+soon'

  // Global error handler for images
  nuxtApp.vueApp.config.errorHandler = (err: any, instance: any, info: string) => {
    if (err instanceof Error && err.message.includes('Failed to load image')) {
      // Replace failed image with placeholder
      if (instance?.$el instanceof HTMLImageElement) {
        instance.$el.src = placeholderImage
      }
    }
  }

  // Register a global directive for handling image errors
  nuxtApp.vueApp.directive('img-fallback', {
    mounted(el: HTMLImageElement) {
      el.addEventListener('error', () => {
        el.src = placeholderImage
      })
    }
  })

  return {
    provide: {
      getImageUrl: (path: string) => {
        try {
          // Handle both public and direct paths
          if (path.startsWith('/public/')) {
            return new URL(path.replace('/public/', '/'), import.meta.url).href
          }
          return path
        } catch {
          return placeholderImage
        }
      }
    }
  }
})