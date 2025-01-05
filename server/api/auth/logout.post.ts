export default defineEventHandler(async (event) => {
  // Clear session
  await clearUserSession(event)
  return { success: true }
}) 