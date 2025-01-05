import { defineEventHandler } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        tags: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })

    return {
      posts: posts.map((post: any) => ({
        ...post,
        tags: post.tags.map((tag: any) => tag.name)
      }))
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch blog posts'
    })
  }
}) 