export const defaultMetaData = {
  title: 'Your Name - Portfolio',
  description: 'Full-stack Developer & UI/UX Designer specializing in modern web technologies',
  image: '/images/og-image.jpg',
  url: 'https://your-domain.com'
}

export const generateMeta = (pageMeta?: Partial<typeof defaultMetaData>) => {
  const meta = { ...defaultMetaData, ...pageMeta }
  
  return {
    title: meta.title,
    ogTitle: meta.title,
    description: meta.description,
    ogDescription: meta.description,
    ogImage: meta.image,
    twitterCard: 'summary_large_image',
    twitterTitle: meta.title,
    twitterDescription: meta.description,
    twitterImage: meta.image
  }
} 