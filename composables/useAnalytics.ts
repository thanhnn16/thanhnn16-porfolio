import type { TrackingEvent, PageView } from '~/types/analytics'

export const useAnalytics = () => {
  const { gtag } = useGtag()

  const trackEvent = (event: TrackingEvent) => {
    if (import.meta.client) {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      })
    }
  }

  const trackPageView = (pageView: PageView) => {
    if (import.meta.client) {
      gtag('event', 'page_view', {
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