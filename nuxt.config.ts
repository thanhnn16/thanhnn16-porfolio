// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  debug: true,
  sourcemap: true,
  ssr: true,
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/color-mode', '@nuxt/image', '@vueuse/motion/nuxt', '@nuxtjs/i18n', '@nuxtjs/google-fonts', [
    '@vite-pwa/nuxt',
    {
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'mask-icon.svg',
        'android-icon-*.png',
        'apple-icon-*.png',
        'ms-icon-*.png'
      ],
      manifest: false,
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
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
        periodicSyncForUpdates: 3600,
        registerPlugin: true,
        autoRegister: true
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    }
  ], 'nuxt-nodemailer', '@nuxt/ui', '@nuxt/icon', [
    'nuxt-auth-utils',
    {
      session: {
        name: 'nuxt-session',
        password: process.env.SESSION_PASSWORD || 'your-secret-password'
      }
    }
  ], ['nuxt-gtag', {
    id: process.env.GOOGLE_ANALYTICS_ID,
    config: {
      send_page_view: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: false
    }
  }]],
  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700],
      'Noto+Sans': [300, 400, 500, 700]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: false,
    base64: false
  },
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
        file: 'en.ts',
        iso: 'en-US'
      },
      {
        code: 'vi',
        file: 'vi.ts',
        iso: 'vi-VN'
      }
    ],
    defaultLocale: 'vi',
    strategy: 'prefix_except_default',
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
      htmlAttrs: {
        lang: 'vi'
      },
      link: [
        // Preconnect to important domains
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        // Fonts
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Noto+Sans:wght@300;400;500;700&display=swap',
          crossorigin: 'anonymous'
        }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        // Security
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'referrer', content: 'no-referrer-when-downgrade' },
        // PWA
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ]
    },
    pageTransition: { 
      name: 'page', 
      mode: 'out-in',
      duration: 200
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    keepalive: {
      max: 10
    }
  },
  plugins: [
    { src: '~/plugins/gsap.client', mode: 'client' },
    { src: '~/plugins/auth', mode: 'client' },
    '~/plugins/theme.client.ts',
    '~/plugins/image-fallback.ts',
    '~/plugins/error-handler.ts',
    '~/plugins/ssr-fix.ts'
  ],
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: false,
      ignore: [
        '/admin/**'
      ]
    },
    timing: true,
    storage: {
      fs: {
        driver: 'fs',
        base: './.data/storage'
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
    treeshakeClientOnly: true,
    componentIslands: true
  },
  runtimeConfig: {
    public: {
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
      name: process.env.AUTHOR_NAME || 'thanhnn16',
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
    // Static pages with SSR
    '/': { ssr: true },
    '/about': { ssr: true },
    '/contact': { ssr: true },
    '/skills': { ssr: true },

    // Dynamic pages with ISR
    '/projects': { isr: 86400 },
    '/projects/[slug]': { isr: 86400 },
    '/blog/**': { isr: 86400 },

    // Special routes
    '/admin/**': { ssr: false },
    '/sitemap.xml': { isr: 604800 }
  }
})