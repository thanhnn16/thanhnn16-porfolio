<template>
  <footer class="bg-gray-50 dark:bg-gray-800/50 py-8 mt-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Contact Info -->
        <div v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0 }">
          <h3 class="text-lg font-bold mb-4">{{ t('footer.contact') }}</h3>
          <div class="space-y-2">
            <a :href="`mailto:${config.email}`" class="flex items-center gap-2 hover:text-primary-500">
              <Icon name="heroicons:envelope" class="w-5 h-5" />
              <span>{{ config.email }}</span>
            </a>
            <a :href="config.github" target="_blank" class="flex items-center gap-2 hover:text-primary-500">
              <Icon name="heroicons:code-bracket" class="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0, transition: { delay: 200 } }">
          <h3 class="text-lg font-bold mb-4">{{ t('footer.quickLinks') }}</h3>
          <div class="space-y-2">
            <NuxtLink v-for="item in navItems" 
              :key="item.path" 
              :to="localePath(item.path)"
              class="block hover:text-primary-500">
              {{ t(`nav.${item.name.toLowerCase()}`) }}
            </NuxtLink>
          </div>
        </div>

        <!-- Social Media -->
        <div v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0, transition: { delay: 400 } }">
          <h3 class="text-lg font-bold mb-4">{{ t('footer.followMe') }}</h3>
          <div class="flex gap-4">
            <a v-for="social in socialLinks"
               :key="social.name"
               :href="social.url"
               :aria-label="social.name"
               target="_blank"
               class="hover:text-primary-500 transition-colors">
              <Icon :name="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} {{ config.name }}. {{ t('footer.allRightsReserved') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#imports'

const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig().public

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const socialLinks = [
  {
    name: 'GitHub',
    url: config.github,
    icon: 'heroicons:code-bracket'
  },
  {
    name: 'LinkedIn',
    url: config.linkedin,
    icon: 'heroicons:link'
  }
]
</script> 