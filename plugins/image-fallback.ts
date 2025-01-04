export default defineNuxtPlugin((nuxtApp) => {
  // Default placeholder image URL
  const placeholderImage = 'https://placehold.co/800x600?text=Image+Not+Found'

  // Global error handler for images
  nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
    if (err instanceof Error && err.message.includes('Failed to load image')) {
      // Replace failed image with placeholder
      if (instance?.$el instanceof HTMLImageElement) {
        instance.$el.src = placeholderImage
      }
    }
  }

  return {
    provide: {
      getImageUrl: (path: string) => {
        try {
          return new URL(`/public/${path}`, import.meta.url).href
        } catch {
          return placeholderImage
        }
      }
    }
  }
}) 