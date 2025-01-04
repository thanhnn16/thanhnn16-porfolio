import { ref, onMounted, onUnmounted } from 'vue'

export const useHoverEffect = () => {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const isHovering = ref(false)

  const handleMouseMove = (event: MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    mouseX.value = event.clientX - rect.left
    mouseY.value = event.clientY - rect.top
  }

  return {
    mouseX,
    mouseY,
    isHovering,
    handleMouseMove,
    handleMouseEnter: () => isHovering.value = true,
    handleMouseLeave: () => isHovering.value = false
  }
} 