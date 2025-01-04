import { ref } from 'vue'

export const usePWA = () => {

  const canInstall = ref(false)
  const deferredPrompt = ref<any>(null)

  // Check if app can be installed
  if (import.meta.client) {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      canInstall.value = true
    })
  }

  const install = async () => {
    if (!deferredPrompt.value) return

    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice

    if (outcome === 'accepted') {
      canInstall.value = false
      deferredPrompt.value = null
    }
  }

  return {
    canInstall,
    install
  }
} 