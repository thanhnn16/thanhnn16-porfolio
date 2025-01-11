import { ref, onMounted, computed } from 'vue'
import type { PWAInstallPrompt } from '~/types/pwa'

export const usePWA = () => {
  // Only create refs if we're on the client side
  const canInstall = ref(false)
  const deferredPrompt = ref<PWAInstallPrompt | null>(null)

  // Initialize PWA listeners only on client side
  onMounted(() => {
    console.log('PWA: Initializing listeners')
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      console.log('PWA: beforeinstallprompt event triggered')
      // Don't prevent default here to allow the browser to show its own prompt
      deferredPrompt.value = e as PWAInstallPrompt
      canInstall.value = true
      console.log('PWA: canInstall set to true')
    })

    // Reset install prompt after installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA: appinstalled event triggered')
      deferredPrompt.value = null
      canInstall.value = false
      console.log('PWA: canInstall set to false')
    })
  })

  const install = async () => {
    if (!deferredPrompt.value) {
      console.warn('No installation prompt available')
      return
    }

    try {
      console.log('PWA: Showing installation prompt')
      // Show the installation prompt
      await deferredPrompt.value.prompt()
      
      // Wait for the user's choice
      const { outcome } = await deferredPrompt.value.userChoice
      console.log('PWA: User choice outcome:', outcome)
      
      if (outcome === 'accepted') {
        console.log('PWA: Installation accepted, setting canInstall to false')
        canInstall.value = false
        deferredPrompt.value = null
      } else {
        console.log('PWA: Installation rejected')
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