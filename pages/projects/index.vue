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
            v-for="project in projectsData.projects"
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

      <!-- Pagination -->
      <div v-if="!isLoading && projectsData.pagination.totalPages > 1" 
        class="mt-12 flex justify-center items-center gap-4"
      >
        <button 
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ t('projects.pagination.prev') }}
        </button>
        
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {{ t('projects.pagination.showing') }} 
          {{ (currentPage - 1) * limit + 1 }}-{{ Math.min(currentPage * limit, projectsData.pagination.total) }} 
          {{ t('projects.pagination.of') }} 
          {{ projectsData.pagination.total }} 
          {{ t('projects.pagination.results') }}
        </span>

        <button 
          @click="currentPage++"
          :disabled="currentPage === projectsData.pagination.totalPages"
          class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ t('projects.pagination.next') }}
        </button>
      </div>

      <!-- No Results Message -->
      <div 
        v-if="!isLoading && projectsData.projects.length === 0"
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
import type { PaginatedResponse } from '~/types/project'

const { t } = useI18n()

const isLoading = ref(true)
const error = ref<string | null>(null)
const projectsData = ref<PaginatedResponse>({
  projects: [],
  pagination: {
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0
  }
})

const currentPage = ref(1)
const limit = 9
const selectedCategory = ref('all')

const categories = [
  { value: 'all', label: t('projects.categories.all') },
  { value: 'web', label: t('projects.categories.web') },
  { value: 'mobile', label: t('projects.categories.mobile') },
  { value: 'zalo', label: t('projects.categories.zalo') }
]

// Fetch projects
const fetchProjects = async () => {
  isLoading.value = true
  try {
    const response = await $fetch<PaginatedResponse>('/api/projects', {
      params: {
        page: currentPage.value,
        limit,
        category: selectedCategory.value
      }
    })
    projectsData.value = response
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}

// Watch for changes in page or category
watch([currentPage, selectedCategory], () => {
  fetchProjects()
})

// Initial fetch
onMounted(() => {
  fetchProjects()
})
</script>
