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
  { value: 'zalo', label: t('projects.categories.zalo') }
]

interface Project {
  id: number
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  link: string
  github: string
  slug: string
}

const projects: Project[] = [
  // Mobile Applications
  {
    id: 1,
    title: 'Đừng Quên Em',
    description: t('projects.items.dungquenem.description'),
    category: 'mobile',
    image: '/images/dungquenem.jpg',
    technologies: ['Flutter'],
    link: 'https://github.com/thanhnn16/dungquenem',
    github: 'https://github.com/thanhnn16/dungquenem',
    slug: 'dungquenem'
  },
  {
    id: 2,
    title: 'Allure Spa',
    description: t('projects.items.allureSpa.description'),
    category: 'mobile',
    image: '/images/allure-spa.jpg',
    technologies: ['Expo', 'React Native'],
    link: 'https://github.com/thanhnn16/allure-spa',
    github: 'https://github.com/thanhnn16/allure-spa',
    slug: 'allure-spa'
  },

  // Web Applications
  {
    id: 3,
    title: 'Allure Spa Admin',
    description: t('projects.items.allureSpaAdmin.description'),
    category: 'web',
    image: '/images/allure-spa-admin.jpg',
    technologies: ['Laravel', 'Inertia', 'Vue.js'],
    link: 'https://github.com/thanhnn16/allure-spa-admin',
    github: 'https://github.com/thanhnn16/allure-spa-admin',
    slug: 'allure-spa-admin'
  },
  {
    id: 4,
    title: 'SCG VN - Lucky Draw',
    description: t('projects.items.scgLuckyDraw.description'),
    category: 'web',
    image: '/images/scg-lucky-draw.jpg',
    technologies: ['Vue.js', 'Node.js'],
    link: 'https://github.com/thanhnn16/scg-vn-quay-so-trung-thuong',
    github: 'https://github.com/thanhnn16/scg-vn-quay-so-trung-thuong',
    slug: 'scg-lucky-draw'
  },
  {
    id: 5,
    title: 'Marine Trace',
    description: t('projects.items.marineTrace.description'),
    category: 'web',
    image: '/images/marine-trace.jpg',
    technologies: ['Nuxt.js', 'TailwindCSS'],
    link: 'https://github.com/thanhnn16/marine-trace',
    github: 'https://github.com/thanhnn16/marine-trace',
    slug: 'marine-trace'
  },
  {
    id: 6,
    title: 'Portfolio',
    description: t('projects.items.portfolio.description'),
    category: 'web',
    image: '/images/portfolio.jpg',
    technologies: ['Nuxt.js', 'TailwindCSS'],
    link: 'https://github.com/thanhnn16/portfolio',
    github: 'https://github.com/thanhnn16/portfolio',
    slug: 'portfolio'
  },

  // Zalo Mini Apps
  {
    id: 7,
    title: 'Allure Spa Staff',
    description: t('projects.items.allureSpaStaff.description'),
    category: 'zalo',
    image: '/images/allure-spa-staff.jpg',
    technologies: ['Zalo Mini App'],
    link: 'https://github.com/thanhnn16/allure-spa-staff',
    github: 'https://github.com/thanhnn16/allure-spa-staff',
    slug: 'allure-spa-staff'
  },
  {
    id: 8,
    title: 'Allure Spa Customer',
    description: t('projects.items.allureSpaCustomer.description'),
    category: 'zalo',
    image: '/images/allure-spa-customer.jpg',
    technologies: ['Zalo Mini App'],
    link: 'https://github.com/thanhnn16/allure-spa-customer',
    github: 'https://github.com/thanhnn16/allure-spa-customer',
    slug: 'allure-spa-customer'
  },
  {
    id: 9,
    title: 'Bông Tuyết Trắng',
    description: t('projects.items.bongtuyettrang.description'),
    category: 'zalo',
    image: '/images/bongtuyettrang.jpg',
    technologies: ['Zalo Mini App'],
    link: 'https://github.com/thanhnn16/bongtuyettrang',
    github: 'https://github.com/thanhnn16/bongtuyettrang',
    slug: 'bongtuyettrang'
  }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') return projects
  return projects.filter(project => project.category === selectedCategory.value)
})
</script>
