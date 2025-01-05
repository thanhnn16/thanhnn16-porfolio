import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required'
    })
  }

  try {
    const project = await prisma.project.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        thumbnail: true,
        technologies: true,
        sourceUrl: true,
        demoUrl: true,
        slug: true
      }
    })

    if (!project) {
      throw createError({
        statusCode: 404,
        message: 'Project not found'
      })
    }

    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}) 