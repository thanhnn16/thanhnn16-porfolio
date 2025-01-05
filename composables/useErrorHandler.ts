import { ref } from 'vue'
import type { ErrorState } from '~/types/error'

export const useErrorHandler = () => {
  const analytics = useAnalytics()
  const error = ref<ErrorState | null>(null)
  const isLoading = ref(false)

  const handleError = (err: any, componentName?: string) => {
    console.error('Error occurred:', err)
    
    // Track error in analytics
    analytics.trackError(err, componentName)
    
    if (err?.response?.data) {
      // Handle API errors
      error.value = {
        message: err.response.data.message || 'An error occurred',
        code: err.response.status,
        details: err.response.data
      }
    } else if (err instanceof Error) {
      // Handle JavaScript errors
      error.value = {
        message: err.message,
        details: err.stack
      }
    } else {
      // Handle unknown errors
      error.value = {
        message: 'An unexpected error occurred',
        details: err
      }
    }
  }

  const clearError = () => {
    error.value = null
  }

  // Wrapper for async functions with error handling
  const withAsync = async <T>(
    asyncFn: () => Promise<T>,
    options: {
      loading?: boolean
      onSuccess?: (data: T) => void
      onError?: (error: ErrorState) => void
    } = {}
  ) => {
    const { loading = true, onSuccess, onError } = options

    try {
      if (loading) isLoading.value = true
      clearError()
      
      const result = await asyncFn()
      
      if (onSuccess) onSuccess(result)
      return result
    } catch (err: any) {
      handleError(err)
      if (onError) onError(error.value!)
      throw err
    } finally {
      if (loading) isLoading.value = false
    }
  }

  return {
    error,
    isLoading,
    handleError,
    clearError,
    withAsync
  }
} 