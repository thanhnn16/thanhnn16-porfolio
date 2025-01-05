<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
    <BaseImage v-if="project.thumbnail" :src="project.thumbnail" :alt="project.title" class="w-full h-48 object-cover" />
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tech in project.technologies" 
          :key="tech"
          class="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded"
        >
          {{ tech }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <NuxtLink :to="`/projects/${project.slug}`" class="text-primary-500 hover:text-primary-600">
          {{ t('projects.learnMore') }} →
        </NuxtLink>
        <a v-if="project.sourceUrl" :href="project.sourceUrl" target="_blank" class="text-gray-500 hover:text-primary-500">
          <Icon name="mdi:github" class="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  project: {
    title: string
    description: string
    thumbnail?: string
    technologies: string[]
    sourceUrl?: string
    slug: string
  }
}>()
</script>
