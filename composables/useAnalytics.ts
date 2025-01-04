interface GtagEvent {
  event: (action: string, params: {
    event_category?: string
    event_label?: string
    value?: number
    [key: string]: any
  }) => void
  pageview: (params: {
    page_path: string
    page_title?: string
    [key: string]: any
  }) => void
}

interface TrackingEvent {
  category: string
  action: string
  label?: string
  value?: number
}

interface PageView {
  path: string
  title?: string
}

export const useAnalytics = () => {
  const nuxtApp = useNuxtApp()
  const $gtag = nuxtApp.$gtag as GtagEvent

  const trackEvent = (event: TrackingEvent) => {
    if (import.meta.client) {
      $gtag.event(event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      })
    }
  }

  const trackPageView = (pageView: PageView) => {
    if (import.meta.client) {
      $gtag.pageview({
        page_path: pageView.path,
        page_title: pageView.title
      })
    }
  }

  const trackError = (error: Error, componentName?: string) => {
    trackEvent({
      category: 'Error',
      action: error.name || 'Unknown Error',
      label: `${componentName || 'Unknown Component'}: ${error.message}`
    })
  }

  const trackInteraction = (elementName: string, action: string = 'click') => {
    trackEvent({
      category: 'User Interaction',
      action,
      label: elementName
    })
  }

  return {
    trackEvent,
    trackPageView,
    trackError,
    trackInteraction
  }
} 