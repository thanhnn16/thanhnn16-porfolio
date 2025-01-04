export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()

  // Initialize theme on client side
  if (import.meta.client) {
    // Initialize theme state
    themeStore.initTheme()

    // Watch system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        themeStore.isDark = e.matches
        if (e.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    })
  }
})