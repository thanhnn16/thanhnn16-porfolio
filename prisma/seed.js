import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create default admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'thanhnn16.work@gmail.com' },
    update: {},
    create: {
      email: 'thanhnn16.work@gmail.com',
      name: 'Thanh Nguyen',
      password: adminPassword,
      role: 'ADMIN',
      avatar: 'https://github.com/thanhnn16.png'
    }
  })

  // Create some default tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'web-development' },
      update: {},
      create: {
        name: 'Web Development',
        slug: 'web-development'
      }
    }),
    prisma.tag.upsert({
      where: { slug: 'mobile-development' },
      update: {},
      create: {
        name: 'Mobile Development',
        slug: 'mobile-development'
      }
    }),
    prisma.tag.upsert({
      where: { slug: 'ai' },
      update: {},
      create: {
        name: 'AI',
        slug: 'ai'
      }
    })
  ])

  console.log({ admin, tags })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 