import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  // Get request body
  const { email, password } = await readBody(event)

  // Validate input
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email và mật khẩu không được để trống'
    })
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      avatar: true,
      role: true
    }
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Email hoặc mật khẩu không đúng'
    })
  }

  // Verify password
  if (password !== user.password) {
    throw createError({
      statusCode: 401,
      message: 'Email hoặc mật khẩu không đúng'
    })
  }

  // Check admin role
  if (user.role !== 'ADMIN') {
    throw createError({
      statusCode: 403,
      message: 'Bạn không có quyền truy cập'
    })
  }

  // Create session
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role
    }
  })

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    role: user.role
  }
}) 