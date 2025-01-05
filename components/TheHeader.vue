<template>
  <header
    class="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800"
    v-motion :initial="{ opacity: 0, y: -100 }" :enter="{ opacity: 1, y: 0 }">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="text-2xl font-bold relative z-20">
        <img src="@/assets/images/thanhnn16-logo-300x128.svg" alt="thanhnn16 logo" class="h-12 w-auto dark:invert" />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <NuxtLink v-for="item in navItems" :key="item.path" :to="localePath(item.path)"
          class="px-3 py-2 rounded-lg transition-all duration-300" :class="{
            'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium': route.path === item.path,
            'hover:bg-gray-100 dark:hover:bg-gray-800': route.path !== item.path
          }">
          {{ t(`nav.${item.name.toLowerCase()}`) }}
        </NuxtLink>

        <div class="flex items-center gap-4">
          <!-- Language Switch -->
          <LanguageSwitch />

          <!-- Dark mode toggle -->
          <button @click="toggleTheme"
            class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 flex items-center justify-center overflow-hidden relative"
            :aria-label="t(themeStore.isDark ? 'theme.light' : 'theme.dark')">
            <div class="relative w-5 h-5">
              <Icon name="heroicons:sun" class="w-5 h-5 absolute inset-0 transform transition-all duration-500" :class="{
                'rotate-[360deg] scale-100 opacity-100': !themeStore.isDark,
                'rotate-[-360deg] scale-0 opacity-0': themeStore.isDark
              }" />
              <Icon name="heroicons:moon" class="w-5 h-5 absolute inset-0 transform transition-all duration-500" :class="{
                'rotate-[360deg] scale-100 opacity-100': themeStore.isDark,
                'rotate-[-360deg] scale-0 opacity-0': !themeStore.isDark
              }" />
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative z-[99999]"
        @click="isMenuOpen = !isMenuOpen" :aria-expanded="isMenuOpen" aria-controls="mobile-menu"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'">
        <Icon :name="isMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
      </button>

      <!-- Mobile Menu -->
      <div id="mobile-menu"
        class="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-[9999] transform transition-all duration-300"
        :class="isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'">
        <div class="min-h-screen flex flex-col pt-20">
          <!-- Menu content -->
          <div class="flex-1 bg-white dark:bg-gray-900">
            <div class="container mx-auto px-4">
              <div class="flex flex-col space-y-4">
                <NuxtLink v-for="item in navItems" :key="item.path" :to="localePath(item.path)"
                  class="text-lg font-medium px-4 py-2.5 rounded-lg transition-all duration-300" :class="{
                    'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400': route.path === item.path,
                    'hover:bg-gray-100 dark:hover:bg-gray-800': route.path !== item.path
                  }" @click="isMenuOpen = false">
                  {{ t(`nav.${item.name.toLowerCase()}`) }}
                </NuxtLink>
              </div>

              <div class="flex items-center gap-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-800 px-4">
                <LanguageSwitch />
                <button @click="toggleTheme"
                  class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 flex items-center justify-center overflow-hidden relative"
                  :aria-label="t(themeStore.isDark ? 'theme.light' : 'theme.dark')">
                  <div class="relative w-6 h-6">
                    <Icon name="heroicons:sun" class="w-6 h-6 absolute inset-0 transform transition-all duration-500"
                      :class="{
                        'rotate-[360deg] scale-100 opacity-100': !themeStore.isDark,
                        'rotate-[-360deg] scale-0 opacity-0': themeStore.isDark
                      }" />
                    <Icon name="heroicons:moon" class="w-6 h-6 absolute inset-0 transform transition-all duration-500"
                      :class="{
                        'rotate-[360deg] scale-100 opacity-100': themeStore.isDark,
                        'rotate-[-360deg] scale-0 opacity-0': !themeStore.isDark
                      }" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const themeStore = useThemeStore()
const isMenuOpen = ref(false)

// Thêm overlay element vào DOM khi component được mount
onMounted(() => {
  if (import.meta.client) {
    const overlay = document.createElement('div')
    overlay.className = 'theme-transition-overlay'
    document.body.appendChild(overlay)
  }
})

const toggleTheme = (event: MouseEvent) => {
  if (import.meta.client) {
    // Cập nhật vị trí chuột cho overlay
    const overlay = document.querySelector('.theme-transition-overlay') as HTMLElement
    if (overlay) {
      overlay.style.setProperty('--mouse-x', `${event.clientX}px`)
      overlay.style.setProperty('--mouse-y', `${event.clientY}px`)
    }

    // Animation chuyển theme
    gsap.to('body', {
      duration: 0.3,
      ease: 'power2.inOut',
      onStart: () => {
        themeStore.toggleTheme()
      }
    })
  }
}

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
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