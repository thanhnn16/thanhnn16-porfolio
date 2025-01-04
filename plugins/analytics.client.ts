import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  // Only initialize in production and when GA ID exists
  if (process.env.NODE_ENV === 'production' && config.public.googleAnalyticsId) {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: config.public.googleAnalyticsId
      }
    })
    
    // Track router changes
    const router = useRouter()
    trackRouter(router)
  }
  
  // Provide a mock gtag in development
  if (process.env.NODE_ENV === 'development') {
    nuxtApp.provide('gtag', {
      pageview: () => console.log('GA Pageview (dev)'),
      event: (...args: unknown[]) => console.log('GA Event (dev):', ...args)
    })
  }
}) 