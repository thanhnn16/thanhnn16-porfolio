export const defaultMetaData = {
  title: 'Thanh Nong Nguyen - Portfolio',
  description: 'Full-stack Developer & UI/UX Designer specializing in modern web technologies',
  image: '/images/avatar.png',
  url: 'https://thanhnn16.id.vn',
  locale: 'en',
  type: 'website',
  author: 'Nong Nguyen Thanh',
  keywords: 'Full-stack Developer, UI/UX Designer, Mobile Developer, Web Developer, Flutter, React Native, Nuxt.js, Laravel'
}

export const generateMeta = (pageMeta?: Partial<typeof defaultMetaData>) => {
  const meta = { ...defaultMetaData, ...pageMeta }

  return {
    title: meta.title,
    ogTitle: meta.title,
    description: meta.description,
    ogDescription: meta.description,
    ogImage: meta.image,
    ogUrl: meta.url,
    ogType: meta.type,
    ogLocale: meta.locale,
    ogLocaleAlternate: meta.locale === 'en' ? 'vi' : 'en',
    author: meta.author,
    keywords: meta.keywords,
    twitterCard: 'summary_large_image',
    twitterTitle: meta.title,
    twitterDescription: meta.description,
    twitterImage: meta.image,
    twitterCreator: '@thanhnn16',
    robots: 'index, follow',
    googlebot: 'index, follow',
    canonical: meta.url,
    alternateLocales: [
      { hreflang: 'en', href: `${meta.url}/en` },
      { hreflang: 'vi', href: `${meta.url}/vi` },
      { hreflang: 'x-default', href: meta.url }
    ]
  }
} 