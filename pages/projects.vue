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
            :project="project"
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
        :error="error"
        @close="clearError"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useErrorHandler } from '../composables/useErrorHandler'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { error, isLoading, withAsync, clearError } = useErrorHandler()

// Simulate API call
const fetchProjects = async () => {
  return withAsync(
    async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate API error (uncomment to test)
      // throw new Error('Failed to fetch projects')
      
      return projects
    },
    {
      onError: (err) => {
        // Handle specific error cases
        console.error('Failed to fetch projects:', err)
      }
    }
  )
}

// Fetch projects on mount
onMounted(async () => {
  try {
    await fetchProjects()
  } catch {
    // Error is already handled by withAsync
  }
})

const selectedCategory = ref('all')

const categories = [
  { value: 'all', label: t('projects.categories.all') },
  { value: 'web', label: t('projects.categories.web') },
  { value: 'mobile', label: t('projects.categories.mobile') },
  { value: 'design', label: t('projects.categories.design') }
]

const projects = [
  {
    id: 1,
    title: t('projects.items.ecommerce.title'),
    description: t('projects.items.ecommerce.description'),
    category: 'web',
    image: '/images/project1.jpg',
    technologies: ['Nuxt 3', 'Vue', 'Tailwind CSS', 'Node.js'],
    link: '/projects/e-commerce-platform'
  },
  {
    id: 2,
    title: t('projects.items.mobileApp.title'),
    description: t('projects.items.mobileApp.description'),
    category: 'design',
    image: '/images/project2.jpg',
    technologies: ['Figma', 'Adobe XD'],
    link: '/projects/fitness-app-design'
  }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') return projects
  return projects.filter(project => project.category === selectedCategory.value)
})
</script>
