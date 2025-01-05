export interface GtagEvent {
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

export interface TrackingEvent {
  category: string
  action: string
  label?: string
  value?: number
}

export interface PageView {
  path: string
  title?: string
} 