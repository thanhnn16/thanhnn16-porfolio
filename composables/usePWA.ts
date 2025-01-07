import { ref, onMounted, computed } from 'vue'
import type { PWAInstallPrompt } from '~/types/pwa'

export const usePWA = () => {
  // Only create refs if we're on the client side
  const canInstall = ref(false)
  const deferredPrompt = ref<PWAInstallPrompt | null>(null)

  // Initialize PWA listeners only on client side
  onMounted(() => {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      // Don't prevent default here to allow the browser to show its own prompt
      deferredPrompt.value = e as PWAInstallPrompt
      canInstall.value = true
    })

    // Reset install prompt after installation
    window.addEventListener('appinstalled', () => {
      deferredPrompt.value = null
      canInstall.value = false
    })
  })

  const install = async () => {
    if (!deferredPrompt.value) {
      console.warn('No installation prompt available')
      return
    }

    try {
      // Show the installation prompt
      await deferredPrompt.value.prompt()
      
      // Wait for the user's choice
      const { outcome } = await deferredPrompt.value.userChoice
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted')
        canInstall.value = false
        deferredPrompt.value = null
      } else {
        console.log('PWA installation rejected')
      }
    } catch (error) {
      console.error('Error during PWA installation:', error)
    }
  }

  return {
    canInstall: computed(() => canInstall.value),
    install
  }
} 