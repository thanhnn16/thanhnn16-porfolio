<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />

    <!-- PWA Install Prompt -->
    <PWAPrompt type="install" :show-prompt="canInstall" @action="install" @close="canInstall = false" />

    <!-- PWA Update Prompt -->
    <PWAPrompt type="update" :show-prompt="needRefresh" @action="update" @close="needRefresh = false" />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'
import { useLangStore } from '~/stores/lang'
import { defaultMetaData } from '~/utils/seo'
import { usePWA } from '~/composables/usePWA'

const themeStore = useThemeStore()
const langStore = useLangStore()
const { canInstall, needRefresh, install, update } = usePWA()

// Initialize theme and language on mount
onMounted(() => {
  themeStore.initTheme()
  langStore.initLang()
})

// Default SEO Meta
useHead({
  titleTemplate: (title) => title ? `${title} - Portfolio` : defaultMetaData.title,
  meta: [
    { name: 'description', content: defaultMetaData.description },
    { name: 'author', content: defaultMetaData.author },
    { name: 'keywords', content: defaultMetaData.keywords },
    
    // Open Graph
    { property: 'og:site_name', content: defaultMetaData.title },
    { property: 'og:type', content: defaultMetaData.type },
    { property: 'og:url', content: defaultMetaData.url },
    { property: 'og:title', content: defaultMetaData.title },
    { property: 'og:description', content: defaultMetaData.description },
    { property: 'og:image', content: defaultMetaData.image },
    { property: 'og:locale', content: defaultMetaData.locale },
    { property: 'og:locale:alternate', content: defaultMetaData.locale === 'en' ? 'vi' : 'en' },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@thanhnn16' },
    { name: 'twitter:creator', content: '@thanhnn16' },
    { name: 'twitter:title', content: defaultMetaData.title },
    { name: 'twitter:description', content: defaultMetaData.description },
    { name: 'twitter:image', content: defaultMetaData.image },
    
    // PWA & Mobile
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: defaultMetaData.title },
    { name: 'application-name', content: defaultMetaData.title },
    { name: 'msapplication-TileColor', content: '#ffffff' },
    { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
    { name: 'theme-color', content: '#ffffff' },
    
    // SEO
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' }
  ],
  link: [
    // Favicon
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/manifest.json' },
    
    // Alternate languages
    { rel: 'alternate', hreflang: 'en', href: `${defaultMetaData.url}/en` },
    { rel: 'alternate', hreflang: 'vi', href: `${defaultMetaData.url}/vi` },
    { rel: 'alternate', hreflang: 'x-default', href: defaultMetaData.url },
    
    // Canonical
    { rel: 'canonical', href: defaultMetaData.url }
  ]
})
</script>
