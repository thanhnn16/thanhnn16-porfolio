export default defineNuxtRouteMiddleware((to) => {
  // Prevent open redirect
  if (to.query.redirect) {
    const redirect = to.query.redirect as string
    if (!redirect.startsWith('/')) {
      return navigateTo('/')
    }
  }

  // Check authentication for protected routes
  if (to.meta.requiresAuth) {
    // Add your auth check logic here
  }

  // Rate limiting for form submissions
  if (to.meta.hasForm) {
    const now = Date.now()
    const lastSubmit = parseInt(localStorage.getItem('lastFormSubmit') || '0')
    if (now - lastSubmit < 1000) { // 1 second cooldown
      return abortNavigation('Please wait before submitting again')
    }
  }
}) 