import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { prisma } from '~/server/utils/prisma'

const HOSTNAME = 'https://thanhnn16.id.vn'
const LANGUAGES = ['vi', 'en']

export default defineEventHandler(async (event) => {
  try {
    // Fetch data directly from database
    const [projects, posts] = await Promise.all([
      prisma.project.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          slug: true,
          updatedAt: true
        }
      }),
      prisma.post.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          slug: true,
          updatedAt: true
        }
      })
    ])

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: HOSTNAME
    })

    const links = []

    // Add static pages with language alternates
    const staticPages = ['', 'about', 'projects', 'blog', 'contact', 'skills']
    for (const page of staticPages) {
      const url = page === '' ? '/' : `/${page}`
      const link = {
        url,
        changefreq: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        links: LANGUAGES.map(lang => ({
          lang,
          url: lang === 'vi' ? url : `/${lang}${url}`
        }))
      }
      links.push(link)
    }

    // Add dynamic project pages
    if (projects?.length) {
      for (const project of projects) {
        const link = {
          url: `/projects/${project.slug}`,
          lastmod: project.updatedAt.toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
          links: LANGUAGES.map(lang => ({
            lang,
            url: lang === 'vi' ? `/projects/${project.slug}` : `/${lang}/projects/${project.slug}`
          }))
        }
        links.push(link)
      }
    }

    // Add dynamic blog posts
    if (posts?.length) {
      for (const post of posts) {
        const link = {
          url: `/blog/${post.slug}`,
          lastmod: post.updatedAt.toISOString(),
          changefreq: 'weekly',
          priority: 0.7,
          links: LANGUAGES.map(lang => ({
            lang,
            url: lang === 'vi' ? `/blog/${post.slug}` : `/${lang}/blog/${post.slug}`
          }))
        }
        links.push(link)
      }
    }

    // Add all links to the stream
    const sitemapContent = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data: Buffer) => data.toString())

    // Set headers
    setHeader(event, 'content-type', 'application/xml')
    setHeader(event, 'cache-control', 'max-age=3600, must-revalidate')
    
    return sitemapContent
  } catch (error) {
    console.error('Error generating sitemap:', error)
    throw createError({
      statusCode: 500,
      message: 'Error generating sitemap'
    })
  }
}) 