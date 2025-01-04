export const defaultMetaData = {
  title: 'Thanh Nong Nguyen (thanhnn16) - Full-stack Developer Portfolio',
  description: 'Nong Nguyen Thanh (thanhnn16) - Full-stack Developer & UI/UX Designer from Vietnam. Expertise in Web Development, Mobile Apps, Flutter, React Native, Nuxt.js, and Laravel',
  image: '/images/avatar.png',
  url: 'https://thanhnn16.id.vn',
  locale: 'en',
  type: 'website',
  author: 'Nong Nguyen Thanh (thanhnn16)',
  keywords: 'thanhnn16, Nong Nguyen Thanh, Full-stack Developer, UI/UX Designer, Mobile Developer, Web Developer, Flutter Developer, React Native Developer, Nuxt.js Developer, Laravel Developer, Vietnam Developer, Portfolio'
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