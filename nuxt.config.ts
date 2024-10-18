// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxt/icon', 'vue3-carousel-nuxt'],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json'
      },
      {
        code: 'vi',
        file: 'vi-VN.json'
      }
    ],
    defaultLocale: 'vi',
    strategy: 'no_prefix',
    langDir: 'locales',
    detectBrowserLanguage: false,
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Noto+Sans:wght@300;400;500;700&display=swap'
        }
      ]
    }
  },
  plugins: [
    { src: '~/plugins/gsap.client.js', mode: 'client' }
  ],
  nitro: {
    preset: 'vercel'
  },
})
