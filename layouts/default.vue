<template>
  <div class="min-h-screen flex flex-col">
    <ClientOnly>
      <template #fallback>
        <div class="sr-only">Loading navigation...</div>
      </template>
      <A11ySkipLink />
    </ClientOnly>
    
    <ClientOnly>
      <template #fallback>
        <header class="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
          <div class="container mx-auto px-4 h-16"></div>
        </header>
      </template>
      <TheHeader />
    </ClientOnly>
    
    <main 
      id="main-content"
      class="flex-grow"
      :aria-label="route.meta.title || 'Main content'"
    >
      <slot />
    </main>

    <ClientOnly>
      <template #fallback>
        <footer class="bg-gray-50 dark:bg-gray-800/50 py-8 mt-20">
          <div class="container mx-auto px-4"></div>
        </footer>
      </template>
      <TheFooter />
    </ClientOnly>

    <ClientOnly>
      <AIChatButton />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { usePerformance } from '~/composables/usePerformance'
import { useRoute } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const route = useRoute()

// Monitor performance metrics
const { isLCP, isFID, isCLS } = usePerformance()

// Report performance to analytics
watch([isLCP, isFID, isCLS], ([lcp, fid, cls]) => {
  if (lcp && fid && cls) {
    // All Core Web Vitals are good
    console.log('Good Core Web Vitals')
  }
})
</script> 