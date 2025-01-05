<template>
  <div class="pt-24 pb-20">
    <div class="container mx-auto px-4">
      <!-- Back Button -->
      <NuxtLink 
        to="/projects"
        class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-8"
      >
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        {{ t('projects.backToProjects') }}
      </NuxtLink>

      <template v-if="project">
        <!-- Project Header -->
        <div class="max-w-4xl mx-auto">
          <h1 
            class="text-4xl font-bold mb-6"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0 }"
          >
            {{ project.title }}
          </h1>

          <!-- Project Image -->
          <div 
            class="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 200 } }"
          >
            <BaseImage :src="project.image" :alt="project.title" class="w-full h-auto" />
          </div>

          <!-- Project Content -->
          <div 
            class="prose dark:prose-invert max-w-none"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          >
            <h2>{{ t('projects.overview') }}</h2>
            <p>{{ project.description }}</p>

            <h2>{{ t('projects.technologies') }}</h2>
            <div class="flex flex-wrap gap-2 not-prose mb-8">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Project Links -->
            <div class="flex gap-4 mt-8">
              <a 
                v-if="project.link"
                :href="project.link" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600"
              >
                <Icon name="heroicons:link" class="w-5 h-5" />
                {{ t('projects.viewLive') }}
              </a>
              <a 
                v-if="project.github"
                :href="project.github" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600"
              >
                <Icon name="mdi:github" class="w-5 h-5" />
                {{ t('projects.viewSource') }}
              </a>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">
            {{ t('projects.notFound') }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Get route params
const route = useRoute()
const slug = route.params.slug as string

// Define project type
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

// Get all projects (in a real app, this would be an API call)
const projects: Project[] = [
  // Mobile Applications
  {
    id: 1,
    title: 'Đừng Quên Em',
    description: t('projects.items.dungquenem.description'),
    category: 'mobile',
    image: '/images/projects/dungquenem/thumbnail.jpg',
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
    image: '/images/projects/allure-spa/thumbnail.jpg',
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
    image: '/images/projects/allure-spa/admin-thumbnail.jpg',
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
    image: '/images/projects/scg-lucky-draw/thumbnail.jpg',
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
    image: '/images/projects/marine-trace/thumbnail.jpg',
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
    image: '/images/projects/portfolio/thumbnail.jpg',
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
    image: '/images/projects/allure-spa/staff-thumbnail.jpg',
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
    image: '/images/projects/allure-spa/customer-thumbnail.jpg',
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
    image: '/images/projects/bong-tuyet-trang/thumbnail.jpg',
    technologies: ['Zalo Mini App'],
    link: 'https://github.com/thanhnn16/bongtuyettrang',
    github: 'https://github.com/thanhnn16/bongtuyettrang',
    slug: 'bongtuyettrang'
  }
]

// Find project by slug
const project = computed(() => projects.find(p => p.slug === slug))

// Handle 404
if (!project.value) {
  throw createError({
    statusCode: 404,
    message: 'Project not found'
  })
}
</script> 