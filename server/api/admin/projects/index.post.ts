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

  try {
    const body = await readBody(event)
    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: body.description,
        category: body.category,
        technologies: body.technologies,
        sourceUrl: body.sourceUrl,
        demoUrl: body.demoUrl,
        thumbnail: body.thumbnail,
        status: body.status,
        authorId: session.user.id
      }
    })

    // Parse technologies back to array in response
    return {
      ...project,
      technologies: project.technologies
    }
  } catch (error) {
    console.error('Error creating project:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}) 