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
        generateManifest: true,
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
    lazy: true,
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
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Noto+Sans:wght@300;400;500;700&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    keepalive: true
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
    prerender: {
      crawlLinks: true,
      routes: ['/']
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
    renderJsonPayloads: false
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
  },
  build: {
    transpile: [
      'gsap'
    ]
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
  }
})