import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // Check authentication
    const session = await getUserSession(event)
    if (!session) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const id = event.context?.params?.id

    try {
        // Delete post and its relationships
        await prisma.post.delete({
            where: { id: Number(id) }
        })

        return { message: 'Blog post deleted successfully' }
    } catch (error) {
        console.error('Error deleting blog post:', error)
        throw createError({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
}) 