import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'vue3-carousel-nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    [
      '@vite-pwa/nuxt',
      {
        registerType: 'autoUpdate',
        manifest: {
          name: 'Thanh Nguyen Portfolio',
          short_name: 'Portfolio',
          description: 'Full-stack Developer & UI/UX Designer Portfolio',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/android-icon-36x36.png',
              sizes: '36x36',
              type: 'image/png',
              density: '0.75'
            },
            {
              src: '/android-icon-48x48.png',
              sizes: '48x48',
              type: 'image/png',
              density: '1.0'
            },
            {
              src: '/android-icon-72x72.png',
              sizes: '72x72',
              type: 'image/png',
              density: '1.5'
            },
            {
              src: '/android-icon-96x96.png',
              sizes: '96x96',
              type: 'image/png',
              density: '2.0'
            },
            {
              src: '/android-icon-144x144.png',
              sizes: '144x144',
              type: 'image/png',
              density: '3.0'
            },
            {
              src: '/android-icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              density: '4.0'
            },
            {
              src: '/apple-icon-57x57.png',
              sizes: '57x57',
              type: 'image/png'
            },
            {
              src: '/apple-icon-60x60.png',
              sizes: '60x60',
              type: 'image/png'
            },
            {
              src: '/apple-icon-72x72.png',
              sizes: '72x72',
              type: 'image/png'
            },
            {
              src: '/apple-icon-76x76.png',
              sizes: '76x76',
              type: 'image/png'
            },
            {
              src: '/apple-icon-114x114.png',
              sizes: '114x114',
              type: 'image/png'
            },
            {
              src: '/apple-icon-120x120.png',
              sizes: '120x120',
              type: 'image/png'
            },
            {
              src: '/apple-icon-144x144.png',
              sizes: '144x144',
              type: 'image/png'
            },
            {
              src: '/apple-icon-152x152.png',
              sizes: '152x152',
              type: 'image/png'
            },
            {
              src: '/apple-icon-180x180.png',
              sizes: '180x180',
              type: 'image/png'
            },
            {
              src: '/ms-icon-70x70.png',
              sizes: '70x70',
              type: 'image/png'
            },
            {
              src: '/ms-icon-144x144.png',
              sizes: '144x144',
              type: 'image/png'
            },
            {
              src: '/ms-icon-150x150.png',
              sizes: '150x150',
              type: 'image/png'
            },
            {
              src: '/ms-icon-310x310.png',
              sizes: '310x310',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          navigateFallback: '/',
          globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico}'],
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        client: {
          installPrompt: true,
          periodicSyncForUpdates: 20
        },
        devOptions: {
          enabled: true,
          suppressWarnings: true,
          type: 'module',
          navigateFallback: '/'
        }
      }
    ]
  ],
  icon: {
    size: '24px',
    class: 'icon',
    aliases: {
      'vi': 'flag:vn',
      'en': 'flag:gb'
    }
  },
  i18n: {
    vueI18n: './i18n/i18n.config.ts',
    locales: [
      {
        code: 'en',
        file: 'en.ts'
      },
      {
        code: 'vi',
        file: 'vi.ts'
      }
    ],
    defaultLocale: 'vi',
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true
    }
  },
  app: {
    head: {
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://api.iconify.design; frame-ancestors 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Noto+Sans:wght@300;400;500;700&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    keepalive: true
  },
  plugins: [
    { src: '~/plugins/gsap.client.js', mode: 'client' }
  ],
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true,
    timing: true,
    storage: {
      redis: {
        driver: 'redis',
        /* redis options */
      }
    }
  },
  motion: {
    directives: {
      'pop-bottom': {
        initial: {
          scale: 0,
          opacity: 0,
          y: 100
        },
        visible: {
          scale: 1,
          opacity: 1,
          y: 0
        }
      }
    }
  },
  css: ['~/assets/css/main.scss'],
  image: {
    provider: 'ipx',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 80,
          height: 80,
        }
      },
      project: {
        modifiers: {
          format: 'webp',
          width: 800,
          height: 400,
        }
      }
    }
  },
  experimental: {
    viewTransition: true,
    payloadExtraction: true
  },
  runtimeConfig: {
    public: {
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
      name: process.env.AUTHOR_NAME || 'Thanh Nguyen',
      email: process.env.AUTHOR_EMAIL || 'thanhnn16@gmail.com',
      github: process.env.GITHUB_URL || 'https://github.com/thanhnn16',
      linkedin: process.env.LINKEDIN_URL || 'https://linkedin.com/in/thanhnn16'
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: '_nuxt/[name]-[hash].js',
          entryFileNames: '_nuxt/[name]-[hash].js',
          assetFileNames: '_nuxt/[name]-[hash][extname]'
        }
      }
    },
    optimizeDeps: {
      include: ['vue', '@vueuse/core', 'pinia', 'gsap', 'swiper', 'vue-i18n']
    },
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    },
    plugins: []
  }
})