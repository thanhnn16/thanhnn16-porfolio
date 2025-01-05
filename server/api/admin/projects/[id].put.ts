import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

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
    const body = await readBody(event)
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        technologies: body.technologies,
        sourceUrl: body.sourceUrl,
        demoUrl: body.demoUrl,
        thumbnail: body.thumbnail,
        status: body.status,
      }
    })

    // Parse technologies back to array in response
    return {
      ...updatedProject,
      technologies: updatedProject.technologies
    }
  } catch (error) {
    console.error('Error updating project:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}) 