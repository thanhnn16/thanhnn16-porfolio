export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, user } = useUserSession()

  // Kiểm tra nếu route yêu cầu xác thực
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    if (!loggedIn.value) {
      return navigateTo('/admin/login')
    }

    // Kiểm tra quyền admin
    if (user.value?.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        message: 'Bạn không có quyền truy cập'
      })
    }
  }

  // Nếu đã đăng nhập và cố gắng truy cập trang login
  if (loggedIn.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
}) 