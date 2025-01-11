import { ref, onMounted, computed } from 'vue'
import type { PWAInstallPrompt } from '~/types/pwa'

export const usePWA = () => {
  // Only create refs if we're on the client side
  const canInstall = ref(false)
  const needRefresh = ref(false)
  const deferredPrompt = ref<PWAInstallPrompt | null>(null)

  // Initialize PWA listeners only on client side
  onMounted(() => {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault() // Prevent default browser prompt
      deferredPrompt.value = e as PWAInstallPrompt
      canInstall.value = true
    })

    // Reset install prompt after installation
    window.addEventListener('appinstalled', () => {
      deferredPrompt.value = null
      canInstall.value = false
    })

    // Handle PWA updates if service worker is available
    if ('serviceWorker' in navigator) {
      const wb = navigator.serviceWorker
      
      wb.addEventListener('controllerchange', () => {
        needRefresh.value = true
      })
    }
  })

  const install = async () => {
    if (!deferredPrompt.value) {
      return
    }

    try {
      // Show the installation prompt
      await deferredPrompt.value.prompt()
      
      // Wait for the user's choice
      const { outcome } = await deferredPrompt.value.userChoice
      
      if (outcome === 'accepted') {
        canInstall.value = false
        deferredPrompt.value = null
      }
    } catch (error) {
      console.error('Error during PWA installation:', error)
    }
  }

  const update = () => {
    needRefresh.value = false
    window.location.reload()
  }

  return {
    canInstall: computed(() => canInstall.value),
    needRefresh: computed(() => needRefresh.value),
    install,
    update
  }
}