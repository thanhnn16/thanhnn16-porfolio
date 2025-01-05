import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'
import { compare } from 'bcrypt'

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
    }
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Email hoặc mật khẩu không đúng'
    })
  }

  // Verify password
  const isValidPassword = await compare(password, user.password)
  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      message: 'Email hoặc mật khẩu không đúng'
    })
  }

  // Check admin by email
  if (email !== 'thanhnn16.work@gmail.com') {
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
    }
  })

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  }
}) 