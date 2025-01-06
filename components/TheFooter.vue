<template>
  <footer class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.about.title') }}</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ t('footer.about.description') }}</p>
          <!-- Social Links -->
          <div class="flex gap-4">
            <a v-for="social in socials" 
               :key="social.name"
               :href="social.url" 
               target="_blank" 
               rel="noopener noreferrer"
               class="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
               :title="social.name">
              <Icon :name="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.quickLinks.title') }}</h3>
          <div class="grid grid-cols-2 gap-2">
            <NuxtLink v-for="link in quickLinks" 
                     :key="link.path" 
                     :to="link.path"
                     class="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
              {{ t(`nav.${link.name.toLowerCase()}`) }}
            </NuxtLink>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.contact.title') }}</h3>
          <ul class="space-y-3">
            <li v-for="contact in contacts" 
                :key="contact.type" 
                class="flex items-center gap-2">
              <Icon :name="contact.icon" class="w-5 h-5 flex-shrink-0" />
              <a v-if="contact.link" 
                 :href="contact.link"
                 class="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                {{ contact.text }}
              </a>
              <span v-else class="text-gray-600 dark:text-gray-400">
                {{ contact.text }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p class="text-center text-gray-600 dark:text-gray-400">
          {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const socials = [
  { name: 'GitHub', url: 'https://github.com/thanhnn16', icon: 'i-simple-icons-github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/thanhnn16', icon: 'i-simple-icons-linkedin' },
  { name: 'Facebook', url: 'https://facebook.com/thanhnn16', icon: 'i-simple-icons-facebook' },
  { name: 'Instagram', url: 'https://instagram.com/thanhnn16', icon: 'i-simple-icons-instagram' }
]

const contacts = [
  { 
    type: 'email',
    icon: 'i-heroicons-envelope',
    text: 'thanhnn16.work@gmail.com',
    link: 'mailto:thanhnn16.work@gmail.com'
  },
  {
    type: 'phone',
    icon: 'i-heroicons-phone',
    text: '+84 879 159 499',
    link: 'tel:+84879159499'
  },
  {
    type: 'address',
    icon: 'i-heroicons-map-pin',
    text: t('footer.contact.address'),
    link: null
  }
]
</script>