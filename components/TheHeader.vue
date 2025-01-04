<template>
  <header 
    class="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800"
    v-motion
    :initial="{ opacity: 0, y: -100 }"
    :enter="{ opacity: 1, y: 0 }"
  >
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="text-2xl font-bold relative z-20">
        {{ t('welcome') }}
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path"
          :to="localePath(item.path)"
          class="hover:text-primary-500 transition-colors"
          :class="{ 'text-primary-500': route.path === item.path }"
        >
          {{ t(`nav.${item.name.toLowerCase()}`) }}
        </NuxtLink>

        <div class="flex items-center gap-4">
          <!-- Language Switch -->
          <LanguageSwitch />

          <!-- Dark mode toggle -->
          <button 
            @click="themeStore.toggleTheme()"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :aria-label="t(themeStore.isDark ? 'theme.light' : 'theme.dark')"
          >
            <Icon
              :name="themeStore.isDark ? 'heroicons:sun' : 'heroicons:moon'"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="isMenuOpen = !isMenuOpen"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
      >
        <Icon :name="isMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
      </button>

      <!-- Mobile Menu -->
      <div 
        id="mobile-menu"
        class="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-10 transform transition-transform duration-300"
        :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="container mx-auto px-4 py-20">
          <div class="flex flex-col space-y-8">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="localePath(item.path)"
              class="text-2xl hover:text-primary-500 transition-colors"
              :class="{ 'text-primary-500': route.path === item.path }"
              @click="isMenuOpen = false"
            >
              {{ t(`nav.${item.name.toLowerCase()}`) }}
            </NuxtLink>

            <div class="flex items-center gap-4">
              <LanguageSwitch />
              <button 
                @click="themeStore.toggleTheme()"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                :aria-label="t(themeStore.isDark ? 'theme.light' : 'theme.dark')"
              >
                <Icon
                  :name="themeStore.isDark ? 'heroicons:sun' : 'heroicons:moon'"
                  class="w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'
import { useLangStore } from '~/stores/lang'
import { Icon } from '#components'
import { useLocalePath } from '#imports'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const themeStore = useThemeStore()
const langStore = useLangStore()
const isMenuOpen = ref(false)

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

// Close menu when route changes
watch(() => route.path, () => {
  isMenuOpen.value = false
})

// Prevent scroll when menu is open
watch(isMenuOpen, (value) => {
  if (import.meta.client) {
    document.body.style.overflow = value ? 'hidden' : ''
  }
})
</script> 