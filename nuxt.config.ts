// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    '@nuxtjs/i18n',
    [
      '@vite-pwa/nuxt',
      {
        registerType: 'autoUpdate',
        manifest: false,
        workbox: {
          navigateFallback: '/',
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg}'],
          globDirectory: process.env.NODE_ENV === 'production' ? '.vercel/output/static' : '.nuxt/dev-sw-dist',
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 5,
                  maxAgeSeconds: 60 * 60 * 24 * 30
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 5,
                  maxAgeSeconds: 60 * 60 * 24 * 30
                }
              }
            },
            {
              urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'image-cache',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 7
                }
              }
            },
            {
              urlPattern: /\.(js|css)$/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-resources',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
                }
              }
            }
          ]
        },
        client: {
          installPrompt: true,
          periodicSyncForUpdates: 3600 // check for updates every hour
        },
        devOptions: {
          enabled: true,
          type: 'module'
        }
      }
    ],
    'nuxt-nodemailer',
    '@nuxt/ui',
    '@nuxt/icon',
    [
      'nuxt-auth-utils',
      {
        session: {
          name: 'nuxt-session',
          password: process.env.SESSION_PASSWORD || 'your-secret-password'
        }
      }
    ]
  ],
  ui: {
    global: true,
    safelistColors: ['primary', 'gray', 'green', 'yellow', 'red', 'blue', 'sky', 'brand']
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
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
    lazy: false,
    langDir: './locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      cookieSecure: true,
      fallbackLocale: 'vi'
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Noto+Sans:wght@300;400;500;700&display=swap',
          crossorigin: 'anonymous'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    keepalive: {
      max: 10
    }
  },
  plugins: [
    { src: '~/plugins/gsap.client', mode: 'client' },
    '~/plugins/analytics.client.ts',
    '~/plugins/theme.client.ts',
    '~/plugins/image-fallback.ts',
    '~/plugins/error-handler.ts'
  ],
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: false,
      routes: []
    },
    future: {
      nativeSWR: true
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
  css: [
    '~/assets/css/app.scss'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
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
      },
      default: {
        modifiers: {
          format: 'webp',
          placeholder: 'https://placehold.co/800x600?text=Image+Not+Found'
        }
      }
    }
  },
  experimental: {
    viewTransition: true,
    payloadExtraction: false,
    renderJsonPayloads: false,
    asyncContext: true,
    treeshakeClientOnly: true
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
    css: {
      preprocessorOptions: {
        scss: {}
      }
    },
    build: {
      manifest: true,
      ssrManifest: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@nuxt/ui')) {
                return 'ui';
              }
              if (id.includes('@vueuse/motion') || id.includes('gsap')) {
                return 'motion';
              }
              if (id.includes('vue') || id.includes('pinia')) {
                return 'vendor';
              }
              if (id.includes('i18n')) {
                return 'i18n';
              }
            }
          }
        }
      }
    },
    optimizeDeps: {
      include: ['vue', '@vueuse/core', 'pinia', 'gsap', 'vue-i18n']
    },
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    }
  },
  build: {
    transpile: ['gsap'],
    analyze: true
  },
  nodemailer: {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    },
    defaults: {
      from: process.env.GMAIL_USER
    }
  },
  routeRules: {
    '/': { ssr: true },
    '/about': { ssr: true },
    '/projects': { ssr: true },
    '/contact': { ssr: true },
    '/skills': { ssr: true },
    '/blog/**': { isr: 3600 },
    '/admin/**': { ssr: false }
  }
})