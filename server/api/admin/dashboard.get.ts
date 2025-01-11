import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Get stats
    const [totalPosts, totalTags, recentPosts] = await Promise.all([
      prisma.post.count(),
      prisma.tag.count(),
      prisma.post.findMany({
        take: 5,
        orderBy: {
          publishedAt: 'desc'
        },
        include: {
          author: true,
          tags: true
        }
      })
    ])

    // Get total views (you might want to implement your own view tracking system)
    const totalViews = await prisma.post.aggregate({
      _sum: {
        views: true
      }
    })

    return {
      stats: {
        totalPosts,
        totalTags,
        totalViews: totalViews._sum.views || 0
      },
      recentPosts: recentPosts.map(post => ({
        ...post,
        tags: post.tags.map(tag => tag.name)
      }))
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch dashboard data'
    })
  }
}) 