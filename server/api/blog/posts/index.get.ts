import { defineEventHandler, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'
import type { Post, BlogResponse } from '~/types/blog'

export default defineEventHandler(async (event): Promise<BlogResponse> => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED'
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })

    return {
      posts: posts.map((post) => ({
        ...post,
        tags: post.tags.map(tag => tag.name),
        publishedAt: post.publishedAt?.toISOString() || null,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
      })) as unknown as Post[]
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch blog posts'
    })
  }
}) 