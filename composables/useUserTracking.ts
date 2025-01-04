import { debounce } from 'lodash-es'
import { useAnalytics } from './useAnalytics'

export const useUserTracking = () => {
  const analytics = useAnalytics()
  
  // Track scroll depth
  const trackScrollDepth = () => {
    if (!import.meta.client) return
    
    let maxScroll = 0
    const checkScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
      )
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage
        if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          analytics.trackEvent({
            category: 'Scroll Depth',
            action: 'scroll',
            label: `${maxScroll}%`,
            value: maxScroll
          })
        }
      }
    }

    window.addEventListener('scroll', debounce(checkScroll, 100))
  }

  // Track time on page
  const trackTimeOnPage = () => {
    if (!import.meta.client) return
    
    const startTime = Date.now()
    const trackInterval = 30000 // Track every 30 seconds
    
    const interval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      analytics.trackEvent({
        category: 'Engagement',
        action: 'time_on_page',
        value: timeSpent
      })
    }, trackInterval)

    onUnmounted(() => {
      clearInterval(interval)
    })
  }

  return {
    trackScrollDepth,
    trackTimeOnPage
  }
} 