<template>
  <footer class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.about.title') }}</h3>
          <p class="text-gray-600 dark:text-gray-400">{{ t('footer.about.description') }}</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.quickLinks.title') }}</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                {{ t('nav.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/projects" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                {{ t('nav.projects') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/skills" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                {{ t('nav.skills') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                {{ t('nav.blog') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                {{ t('nav.about') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                {{ t('nav.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.contact.title') }}</h3>
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <Icon name="i-heroicons-envelope" class="w-5 h-5" />
              <a href="mailto:thanhnn16.work@gmail.com" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                thanhnn16.work@gmail.com
              </a>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="i-heroicons-phone" class="w-5 h-5" />
              <a href="tel:+84879159499" class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                +84 879 159 499
              </a>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="i-heroicons-map-pin" class="w-5 h-5" />
              <span class="text-gray-600 dark:text-gray-400">
                {{ t('footer.contact.address') }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ t('footer.social.title') }}</h3>
          <div class="flex gap-4">
            <a href="https://github.com/thanhnn16" target="_blank" rel="noopener noreferrer"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
              <Icon name="i-simple-icons-github" class="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/thanhnn16" target="_blank" rel="noopener noreferrer"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
              <Icon name="i-simple-icons-linkedin" class="w-6 h-6" />
            </a>
            <a href="https://facebook.com/thanhnn16" target="_blank" rel="noopener noreferrer"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
              <Icon name="i-simple-icons-facebook" class="w-6 h-6" />
            </a>
            <a href="https://instagram.com/thanhnn16" target="_blank" rel="noopener noreferrer"
              class="text-gray-600 dark:text-gray-400 hover:text-primary-500">
              <Icon name="i-simple-icons-instagram" class="w-6 h-6" />
            </a>
          </div>
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

</script>