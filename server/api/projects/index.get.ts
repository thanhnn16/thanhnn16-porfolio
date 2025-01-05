import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 'published'
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        thumbnail: true,
        technologies: true,
        sourceUrl: true,
        demoUrl: true,
        slug: true,
        status: true
      },
      orderBy: {
        order: 'asc'
      }
    })

    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}) 