import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  // Check authentication
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const id = parseInt(event.context.params?.id as string)
  
  try {
    await prisma.project.delete({
      where: { id }
    })
    return { message: 'Project deleted successfully' }
  } catch (error) {
    console.error('Error deleting project:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}) 