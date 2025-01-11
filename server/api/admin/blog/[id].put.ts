import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    // Check authentication
    const session = await getUserSession(event)
    if (!session?.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const id = event.context?.params?.id

    try {
        const body = await readBody(event)

        // Update post and its tags
        const post = await prisma.post.update({
            where: { id: Number(id) },
            data: {
                title: body.title,
                slug: body.slug,
                excerpt: body.description,
                content: body.content,
                thumbnail: body.featuredImage,
                status: body.status,
                updatedAt: new Date(),
                tags: {
                    // First disconnect all existing tags
                    set: [],
                    // Then connect or create new tags
                    connectOrCreate: body.tags.map((tag: string) => ({
                        where: { name: tag },
                        create: { 
                            name: tag,
                            slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        }
                    }))
                }
            },
            include: {
                tags: true
            }
        })

        return post
    } catch (error) {
        console.error('Error updating blog post:', error)
        throw createError({
            statusCode: 500,
            message: 'Internal Server Error'
        })
    }
}) 