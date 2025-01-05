import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'thanhnn16.work@gmail.com' },
    update: {},
    create: {
      email: 'thanhnn16.work@gmail.com',
      name: 'Nong Nguyen Thanh',
      password: password,
      avatar: 'https://avatars.githubusercontent.com/u/91744029'
    },
  })

  // Create tags first
  const mobileDev = await prisma.tag.upsert({
    where: { name: 'Mobile Development' },
    update: {},
    create: {
      name: 'Mobile Development',
      slug: 'mobile-development',
      description: 'Mobile application development projects'
    }
  })

  const webDev = await prisma.tag.upsert({
    where: { name: 'Web Development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Web application development projects'
    }
  })

  const zaloMiniApp = await prisma.tag.upsert({
    where: { name: 'Zalo Mini App' },
    update: {},
    create: {
      name: 'Zalo Mini App',
      slug: 'zalo-mini-app',
      description: 'Zalo Mini App development projects'
    }
  })

  // Create projects
  const dungQuenem = await prisma.project.upsert({
    where: { slug: 'dung-quen-em' },
    update: {},
    create: {
      title: "Đừng Quên Em",
      slug: "dung-quen-em",
      description: "A Flutter mobile application project",
      category: "Mobile",
      technologies: ["Flutter", "Dart"],
      sourceUrl: "https://github.com/thanhnn16/dungquenem",
      status: "PUBLISHED",
      featured: true,
      authorId: admin.id,
      tags: {
        connect: [{ id: mobileDev.id }]
      }
    }
  })

  const allureSpa = await prisma.project.upsert({
    where: { slug: 'allure-spa' },
    update: {},
    create: {
      title: "Allure Spa",
      slug: "allure-spa",
      description: "A mobile application built with Expo",
      category: "Mobile",
      technologies: ["React Native", "Expo", "TypeScript"],
      sourceUrl: "https://github.com/thanhnn16/allure-spa",
      status: "PUBLISHED",
      featured: true,
      authorId: admin.id,
      tags: {
        connect: [{ id: mobileDev.id }]
      }
    }
  })

  const allureSpaAdmin = await prisma.project.upsert({
    where: { slug: 'allure-spa-admin' },
    update: {},
    create: {
      title: "Allure Spa Admin",
      slug: "allure-spa-admin",
      description: "Admin dashboard for Allure Spa built with Laravel Inertia",
      category: "Web",
      technologies: ["Laravel", "Inertia", "Vue.js", "TailwindCSS"],
      sourceUrl: "https://github.com/thanhnn16/allure-spa-admin",
      status: "PUBLISHED",
      featured: true,
      authorId: admin.id,
      tags: {
        connect: [{ id: webDev.id }]
      }
    }
  })

  const scgLuckyDraw = await prisma.project.upsert({
    where: { slug: 'scg-vn-lucky-draw' },
    update: {},
    create: {
      title: "SCG VN - Lucky Draw",
      slug: "scg-vn-lucky-draw",
      description: "A lucky draw web application",
      category: "Web",
      technologies: ["Vue.js", "Node.js"],
      sourceUrl: "https://github.com/thanhnn16/scg-vn-quay-so-trung-thuong",
      status: "PUBLISHED",
      authorId: admin.id,
      tags: {
        connect: [{ id: webDev.id }]
      }
    }
  })

  const marineTrace = await prisma.project.upsert({
    where: { slug: 'marine-trace' },
    update: {},
    create: {
      title: "Marine Trace",
      slug: "marine-trace",
      description: "A web application built with Nuxt.js",
      category: "Web",
      technologies: ["Nuxt.js", "Vue.js", "TailwindCSS"],
      sourceUrl: "https://github.com/thanhnn16/marine-trace",
      status: "PUBLISHED",
      authorId: admin.id,
      tags: {
        connect: [{ id: webDev.id }]
      }
    }
  })

  const portfolio = await prisma.project.upsert({
    where: { slug: 'portfolio' },
    update: {},
    create: {
      title: "Portfolio",
      slug: "portfolio",
      description: "Personal portfolio website built with Nuxt.js",
      category: "Web",
      technologies: ["Nuxt.js", "Vue.js", "TailwindCSS", "TypeScript"],
      sourceUrl: "https://github.com/thanhnn16/portfolio",
      status: "PUBLISHED",
      featured: true,
      authorId: admin.id,
      tags: {
        connect: [{ id: webDev.id }]
      }
    }
  })

  const allureSpaStaff = await prisma.project.upsert({
    where: { slug: 'allure-spa-staff' },
    update: {},
    create: {
      title: "Allure Spa Staff",
      slug: "allure-spa-staff",
      description: "Zalo Mini App for Allure Spa staff",
      category: "Mobile",
      technologies: ["Zalo Mini App", "JavaScript"],
      sourceUrl: "https://github.com/thanhnn16/allure-spa-staff",
      status: "PUBLISHED",
      authorId: admin.id,
      tags: {
        connect: [{ id: zaloMiniApp.id }]
      }
    }
  })

  const allureSpaCustomer = await prisma.project.upsert({
    where: { slug: 'allure-spa-customer' },
    update: {},
    create: {
      title: "Allure Spa Customer",
      slug: "allure-spa-customer",
      description: "Zalo Mini App for Allure Spa customers",
      category: "Mobile",
      technologies: ["Zalo Mini App", "JavaScript"],
      sourceUrl: "https://github.com/thanhnn16/allure-spa-customer",
      status: "PUBLISHED",
      authorId: admin.id,
      tags: {
        connect: [{ id: zaloMiniApp.id }]
      }
    }
  })

  const bongTuyetTrang = await prisma.project.upsert({
    where: { slug: 'bong-tuyet-trang' },
    update: {},
    create: {
      title: "Bông Tuyết Trắng",
      slug: "bong-tuyet-trang",
      description: "White Snow Zalo Mini App",
      category: "Mobile",
      technologies: ["Zalo Mini App", "JavaScript"],
      sourceUrl: "https://github.com/thanhnn16/bongtuyettrang",
      status: "PUBLISHED",
      authorId: admin.id,
      tags: {
        connect: [{ id: zaloMiniApp.id }]
      }
    }
  })

  console.log({ admin, projects: [
    dungQuenem,
    allureSpa,
    allureSpaAdmin,
    scgLuckyDraw,
    marineTrace,
    portfolio,
    allureSpaStaff,
    allureSpaCustomer,
    bongTuyetTrang
  ] })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 