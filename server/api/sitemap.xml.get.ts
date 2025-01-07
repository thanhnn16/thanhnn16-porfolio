import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await Promise.all([
    $fetch('/api/projects'),
    $fetch('/api/blog/posts')
  ])

  const [projects, posts] = docs

  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: 'https://thanhnn16.id.vn'
  })

  const links = [
    // Static pages
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/projects', changefreq: 'weekly', priority: 0.8 },
    { url: '/blog', changefreq: 'daily', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    { url: '/skills', changefreq: 'monthly', priority: 0.8 },

    // Dynamic project pages
    ...projects.map((project: any) => ({
      url: `/projects/${project.slug}`,
      lastmod: project.updatedAt,
      changefreq: 'weekly',
      priority: 0.7
    })),

    // Dynamic blog posts
    ...posts.map((post: any) => ({
      url: `/blog/${post.slug}`,
      lastmod: post.updatedAt,
      changefreq: 'weekly',
      priority: 0.7
    }))
  ]

  // Add all links to the stream
  const sitemapContent = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString())

  event.node.res.setHeader('content-type', 'application/xml')
  return sitemapContent
}) 