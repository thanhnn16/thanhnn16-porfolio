import type { FirstInputEntry, LayoutShiftEntry } from '~/types/performance'

export const usePerformance = () => {
  const isLCP = ref(false)
  const isFID = ref(false)
  const isCLS = ref(false)

  const initializeObservers = () => {
    if (process.client && 'PerformanceObserver' in window) {
      // Observe LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        const lcp = lastEntry.startTime
        isLCP.value = lcp < 2500
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Observe FID
      const fidObserver = new PerformanceObserver((entryList) => {
        const firstInput = entryList.getEntries()[0] as FirstInputEntry
        const delay = firstInput.processingStart - firstInput.startTime
        isFID.value = delay < 100
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Observe CLS
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as LayoutShiftEntry[]
        let clsScore = 0
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value
          }
        })
        isCLS.value = clsScore < 0.1
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }

  if (process.client) {
    initializeObservers()
  }

  return {
    isLCP,
    isFID,
    isCLS
  }
} 