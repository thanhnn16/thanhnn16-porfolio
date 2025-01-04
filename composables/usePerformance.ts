interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

export const usePerformance = () => {
  const isLCP = ref(false) // Largest Contentful Paint
  const isFID = ref(false) // First Input Delay
  const isCLS = ref(false) // Cumulative Layout Shift

  onMounted(() => {
    if ('PerformanceObserver' in window) {
      // Observe LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        const lcp = lastEntry.startTime
        isLCP.value = lcp < 2500 // Good LCP is under 2.5s
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Observe FID
      const fidObserver = new PerformanceObserver((entryList) => {
        const firstInput = entryList.getEntries()[0] as FirstInputEntry
        const delay = firstInput.processingStart - firstInput.startTime
        isFID.value = delay < 100 // Good FID is under 100ms
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
        isCLS.value = clsScore < 0.1 // Good CLS is under 0.1
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  })

  return {
    isLCP,
    isFID,
    isCLS
  }
} 