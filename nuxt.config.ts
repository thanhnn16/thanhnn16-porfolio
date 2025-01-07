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
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'mask-icon.svg'
        ],
        manifest: {
          name: 'Thanh Nguyen Portfolio',
          short_name: 'ThanhNN16',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          navigateFallback: '/',
          globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg}'],
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
            },
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
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        // Performance hints
        { name: 'dns-prefetch', content: 'https://fonts.googleapis.com' },
        { name: 'dns-prefetch', content: 'https://fonts.gstatic.com' }
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
    '~/plugins/error-handler.ts',
    '~/plugins/ssr-fix.ts'
  ],
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true,
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/projects',
        '/blog',
        '/contact',
        '/skills',
        '/sitemap.xml'
      ]
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
    treeshakeClientOnly: true,
    componentIslands: true
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
    // Static pages
    '/': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/skills': { prerender: true },

    // Dynamic pages with ISR
    '/projects': { isr: 86400 },
    '/projects/[slug]': { isr: 86400 },
    '/blog/**': { isr: 86400 },

    // Special routes
    '/admin/**': { ssr: false },
    '/sitemap.xml': { prerender: true }
  }
})