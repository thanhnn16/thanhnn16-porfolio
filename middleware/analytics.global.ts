export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const analytics = useAnalytics()
    
    // Track page view on route change
    nextTick(() => {
      analytics.trackPageView({
        path: to.path,
        title: document.title
      })
    })
  }
}) 