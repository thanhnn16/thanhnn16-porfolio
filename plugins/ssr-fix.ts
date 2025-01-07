import { toRaw } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('vue:error', (error: any) => {
    if (error.message.includes('Cannot stringify arbitrary non-POJOs')) {
      console.warn('SSR Serialization warning:', error.message)
    }
  })

  // Helper function to convert reactive objects to plain objects
  const toPlainObject = (obj: any): any => {
    if (!obj) return obj
    if (Array.isArray(obj)) {
      return obj.map(toPlainObject)
    }
    if (typeof obj === 'object') {
      const raw = toRaw(obj)
      const result: any = {}
      for (const key in raw) {
        result[key] = toPlainObject(raw[key])
      }
      return result
    }
    return obj
  }

  return {
    provide: {
      toPlainObject
    }
  }
}) 