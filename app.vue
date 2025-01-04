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
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>
