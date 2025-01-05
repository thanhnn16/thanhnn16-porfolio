<template>
  <footer class="bg-gray-50 dark:bg-gray-800/50 py-8 mt-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Contact Info -->
        <div v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0 }">
          <h3 class="text-lg font-bold mb-4">{{ t('footer.contact') }}</h3>
          <div class="space-y-2">
            <a :href="`mailto:${contactInfo.email}`" class="flex items-center gap-2 hover:text-primary-500">
              <Icon name="heroicons:envelope" class="w-5 h-5" />
              <span>{{ contactInfo.email }}</span>
            </a>
            <a :href="`tel:${contactInfo.phone}`" class="flex items-center gap-2 hover:text-primary-500">
              <Icon name="heroicons:phone" class="w-5 h-5" />
              <span>{{ contactInfo.phone }}</span>
            </a>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:map-pin" class="w-5 h-5" />
              <span>{{ contactInfo.location }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0, transition: { delay: 200 } }">
          <h3 class="text-lg font-bold mb-4">{{ t('footer.quickLinks') }}</h3>
          <div class="space-y-2">
            <NuxtLink v-for="item in navItems" :key="item.path" :to="localePath(item.path)"
              class="block hover:text-primary-500">
              {{ t(`nav.${item.name.toLowerCase()}`) }}
            </NuxtLink>
          </div>
        </div>

        <!-- Social Media -->
        <div v-motion :initial="{ opacity: 0, y: 100 }" :visible="{ opacity: 1, y: 0, transition: { delay: 400 } }">
          <h3 class="text-lg font-bold mb-4">{{ t('footer.followMe') }}</h3>
          <div class="flex flex-wrap gap-4">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" :aria-label="social.name"
              target="_blank" class="hover:text-primary-500 transition-colors flex items-center gap-2">
              <Icon :name="social.icon" class="w-6 h-6" />
              <span class="text-sm">{{ social.name }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Nông Nguyễn Thành. {{ t('footer.allRightsReserved') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#imports'
import type { ContactInfo, SocialLink } from '~/types/form'

const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig().public

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/thanhnn16',
    icon: 'mdi:github'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/thanhnn16/',
    icon: 'mdi:linkedin'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/thanhnn16',
    icon: 'mdi:facebook'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/thanhnn16',
    icon: 'mdi:instagram'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@thanhnn16',
    icon: 'mdi:youtube'
  }
]

const contactInfo: ContactInfo = {
  email: 'thanhnn16.work@gmail.com',
  phone: '+84 879 159 499',
  location: 'Gò Vấp, TP.HCM'
}
</script>