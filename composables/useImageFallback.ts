import { ref } from 'vue'

export function useImageFallback() {
  const fallbackImage = 'https://placehold.co/800x600?text=Update+soon'

  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement
    img.src = fallbackImage
  }

  return {
    fallbackImage,
    handleImageError
  }
} 