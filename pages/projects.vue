<template>
  <div class="pt-24 pb-20">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 
          class="text-4xl font-bold mb-6"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          {{ t('projects.title') }}
        </h1>
        <p 
          class="text-lg text-gray-600 dark:text-gray-400"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 200 } }"
        >
          {{ t('projects.description') }}
        </p>
      </div>

      <!-- Filter Categories -->
      <div 
        class="flex flex-wrap justify-center gap-4 mb-12"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
      >
        <button 
          v-for="category in categories" 
          :key="category.value"
          @click="selectedCategory = category.value"
          :class="[
            'px-4 py-2 rounded-full transition-all',
            selectedCategory === category.value 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-if="isLoading">
          <ProjectCardSkeleton v-for="i in 6" :key="i" />
        </template>
        <template v-else>
          <ProjectCard
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            :project="{
              title: project.title,
              description: project.description,
              thumbnail: project.thumbnail || undefined,
              technologies: project.technologies,
              sourceUrl: project.sourceUrl || undefined,
              slug: project.slug
            }"
            v-motion
            :initial="{ opacity: 0, x: 100 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
          />
        </template>
      </div>

      <!-- No Results Message -->
      <div 
        v-if="!isLoading && filteredProjects.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-600 dark:text-gray-400">
          {{ t('projects.noResults') }}
        </p>
      </div>

      <!-- Error Alert -->
      <ErrorAlert
        :error="error ? { message: error } : null"
        @close="error = null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Project {
  id: number
  title: string
  description: string
  category: string
  thumbnail: string | null
  technologies: string[]
  sourceUrl: string | null
  demoUrl: string | null
  slug: string
  status: string
}

const isLoading = ref(true)
const error = ref<string | null>(null)
const projects = ref<Project[]>([])
const selectedCategory = ref('all')

const categories = [
  { value: 'all', label: t('projects.categories.all') },
  { value: 'web', label: t('projects.categories.web') },
  { value: 'mobile', label: t('projects.categories.mobile') },
  { value: 'zalo', label: t('projects.categories.zalo') }
]

// Fetch projects
onMounted(async () => {
  try {
    const response = await $fetch<Project[]>('/api/projects')
    projects.value = response
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
})

// Filter projects by category
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => project.category === selectedCategory.value)
})
</script>
