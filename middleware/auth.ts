export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, user } = useUserSession()

  // Kiểm tra nếu route yêu cầu xác thực
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    if (!loggedIn.value) {
      return navigateTo('/admin/login')
    }

    // Kiểm tra quyền admin bằng email
    if (user.value?.email !== 'thanhnn16.work@gmail.com') {
      throw createError({
        statusCode: 403,
        message: 'Bạn không có quyền truy cập'
      })
    }
  }

  // Set admin layout for authenticated users in admin routes
  if (loggedIn.value && to.path.startsWith('/admin')) {
    setPageLayout('admin')
  }

  // Nếu đã đăng nhập và cố gắng truy cập trang login
  if (loggedIn.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
}) 