import { useThrottleFn } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const analytics = useAnalytics()
    const performance = usePerformance()
    
    // Track performance metrics
    const trackPerformance = useThrottleFn(() => {
      if (performance.isLCP.value) {
        analytics.trackEvent({
          category: 'Performance',
          action: 'LCP',
          label: 'Good'
        })
      }
      
      if (performance.isFID.value) {
        analytics.trackEvent({
          category: 'Performance',
          action: 'FID',
          label: 'Good'
        })
      }
      
      if (performance.isCLS.value) {
        analytics.trackEvent({
          category: 'Performance',
          action: 'CLS',
          label: 'Good'
        })
      }
    }, 1000)
    
    // Track performance on route change
    nextTick(() => {
      trackPerformance()
    })
  }
}) 