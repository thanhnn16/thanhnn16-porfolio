import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    if (!session) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                tags: true
            }
        })
        return posts
    } catch (error) {
        console.error('Error fetching blog posts:', error)
        throw createError({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
}) 