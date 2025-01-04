<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- PWA Install Prompt -->
    <PWAPrompt type="install" :show-prompt="canInstall" @action="install" @close="canInstall = false" />

    <!-- PWA Update Prompt -->
    <!-- <PWAPrompt type="update" :show-prompt="needRefresh" @action="update" @close="needRefresh = false" /> -->
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'
import { useLangStore } from '~/stores/lang'
import { defaultMetaData } from '~/utils/seo'
import { usePWA } from '~/composables/usePWA'

const themeStore = useThemeStore()
const langStore = useLangStore()
const { canInstall, install } = usePWA()

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
    { property: 'og:site_name', content: defaultMetaData.title },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'msapplication-TileColor', content: '#ffffff' },
    { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
    { name: 'theme-color', content: '#ffffff' }
  ],
  link: [
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
    { rel: 'manifest', href: '/manifest.json' }
  ]
})
</script>
