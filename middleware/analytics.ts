export default defineNuxtRouteMiddleware((to) => {
  const { trackPageView } = useAnalytics()
  
  // Only track page views on client side
  if (import.meta.client) {
    trackPageView({
      path: to.path,
      title: document.title
    })
  }
}) 