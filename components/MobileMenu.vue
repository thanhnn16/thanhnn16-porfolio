<template>
  <TransitionRoot appear :show="show" as="template">
    <div class="fixed inset-0 z-10 md:hidden">
      <!-- Backdrop -->
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div 
          class="absolute inset-0 bg-black/25 backdrop-blur-sm"
          @click="$emit('close')"
        />
      </TransitionChild>

      <!-- Menu Content -->
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0 -translate-y-full"
        enter-to="opacity-100 translate-y-0"
        leave="duration-200 ease-in"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 -translate-y-full"
      >
        <div class="absolute inset-x-0 top-0 pt-24 pb-8 bg-white dark:bg-gray-900 shadow-lg">
          <div class="container mx-auto px-4">
            <div class="flex flex-col space-y-4">
              <NuxtLink 
                v-for="item in navItems" 
                :key="item.path"
                :to="item.path"
                class="py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-lg"
                :class="{ 'text-primary-500 bg-primary-50 dark:bg-primary-900/10': route.path === item.path }"
                @click="$emit('close')"
              >
                {{ item.name }}
              </NuxtLink>
            </div>

            <!-- Social Links -->
            <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div class="flex justify-center gap-4">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  class="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Icon :name="social.icon" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import type { NavItem, SocialLink } from '~/types/ui'

const route = useRoute()

defineProps<{
  show: boolean
  navItems: NavItem[]
}>()

defineEmits<{
  (e: 'close'): void
}>()

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'heroicons:code-bracket'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'heroicons:link'
  }
]
</script> 