export const useOptimizedImage = () => {
  const nuxtApp = useNuxtApp()

  const getOptimizedImage = (src: string, options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpeg' | 'png'
  } = {}) => {
    const defaults = {
      width: 800,
      quality: 80,
      format: 'webp' as const
    }

    const opts = { ...defaults, ...options }
    
    // Nếu src là URL đầy đủ, trả về nguyên bản
    if (src.startsWith('http')) return src

    // Xử lý ảnh local với Nuxt Image
    return `/_ipx/w_${opts.width},q_${opts.quality}/${src.replace(/^\//, '')}`
  }

  return {
    getOptimizedImage
  }
} 