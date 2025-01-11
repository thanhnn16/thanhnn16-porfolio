import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  // Validate slug parameter
  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required',
      data: {
        code: 'MISSING_SLUG'
      }
    })
  }

  try {
    console.log(`Fetching project with slug: ${slug}`)
    const project = await prisma.project.findUnique({
      where: {
        slug
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
        status: true,
        featured: true,
        startDate: true,
        endDate: true,
        views: true,
        images: true,
        author: {
          select: {
            name: true,
            avatar: true
          }
        },
        tags: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    console.log('Project query result:', JSON.stringify(project, null, 2))

    // Handle project not found
    if (!project) {
      throw createError({
        statusCode: 404,
        message: 'Project not found',
        data: {
          code: 'PROJECT_NOT_FOUND',
          slug
        }
      })
    }

    // Handle draft projects
    if (project.status === 'DRAFT') {
      throw createError({
        statusCode: 403,
        message: 'This project is not published yet',
        data: {
          code: 'PROJECT_NOT_PUBLISHED',
          slug,
          status: project.status
        }
      })
    }

    // Only increment view count if status is PUBLISHED
    try {
      await prisma.project.update({
        where: { slug },
        data: { views: { increment: 1 } }
      })
    } catch (updateError) {
      console.error('Error updating view count:', updateError)
      // Continue execution even if view count update fails
    }

    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    
    // Handle Prisma specific errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'Duplicate project slug',
        data: {
          code: 'DUPLICATE_SLUG',
          slug
        }
      })
    }

    // If it's already a H3 error, rethrow it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Default server error
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
      data: {
        code: 'SERVER_ERROR'
      }
    })
  }
}) 