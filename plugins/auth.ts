export default defineNuxtPlugin(async () => {
  const { loggedIn, fetch: refreshSession } = useUserSession()

  // Refresh session on client side
  if (process.client) {
    try {
      await refreshSession()
    } catch (error) {
      console.error('Failed to refresh session:', error)
    }
  }

  return {
    provide: {
      isAuthenticated: () => loggedIn.value
    }
  }
}) 