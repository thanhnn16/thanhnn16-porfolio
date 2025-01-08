<template>
  <div class="pt-24 pb-20">
    <div class="container mx-auto px-4">
      <!-- Back Button -->
      <NuxtLink 
        :to="localePath('/projects')"
        class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-8"
      >
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        {{ t('projects.backToProjects') }}
      </NuxtLink>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="max-w-4xl mx-auto">
        <!-- Title Skeleton -->
        <div 
          class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-6 animate-pulse"
        ></div>

        <!-- Image Skeleton -->
        <div 
          class="aspect-video rounded-xl bg-gray-200 dark:bg-gray-700 mb-8 animate-pulse"
        ></div>

        <!-- Content Skeleton -->
        <div class="space-y-8">
          <!-- Overview Section -->
          <div class="space-y-4">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>

          <!-- Technologies Section -->
          <div class="space-y-4">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="i in 4" 
                :key="i" 
                class="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
              ></div>
            </div>
          </div>

          <!-- Links Section -->
          <div class="flex gap-4 mt-8">
            <div 
              v-for="i in 2" 
              :key="i"
              class="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center gap-2"
            >
              <div class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div class="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Content -->
      <template v-else-if="project">
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
            <BaseImage :src="thumbnailSrc" :alt="project.title" class="w-full h-auto" />
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
                v-if="project.demoUrl"
                :href="project.demoUrl" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600"
              >
                <Icon name="heroicons:link" class="w-5 h-5" />
                {{ t('projects.viewLive') }}
              </a>
              <a 
                v-if="project.sourceUrl"
                :href="project.sourceUrl" 
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

      <!-- Error state -->
      <template v-else>
        <div class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-400">
            {{ error || t('projects.notFound') }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/project'
import { useI18n } from 'vue-i18n'
import { generateMeta } from '~/utils/seo'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

// Project state
const project = ref<Project | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Sử dụng composable riêng để fetch data
const fetchProject = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await $fetch<Project>(`/api/projects/${route.params.slug}`)
    
    if (response && response.id) {
      project.value = response
    } else {
      error.value = t('projects.notFound')
    }
  } catch (err) {
    console.error('Error fetching project:', err)
    error.value = t('projects.notFound')
  } finally {
    loading.value = false
  }
}

// Fetch data khi component được mount
onMounted(() => {
  fetchProject()
})

// Watch route changes để fetch lại data khi URL thay đổi 
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    project.value = null
    fetchProject()
  }
})

// Compute thumbnail source
const thumbnailSrc = computed(() => {
  return project.value?.thumbnail || '/images/project-placeholder.jpg'
})

// SEO Meta Tags
useHead(() => {
  if (!project.value) return {}

  return {
    title: project.value.title,
    meta: [
      {
        name: 'description',
        content: project.value.description
      },
      {
        property: 'og:title',
        content: project.value.title
      },
      {
        property: 'og:description',
        content: project.value.description
      },
      {
        property: 'og:image',
        content: thumbnailSrc.value
      },
      {
        property: 'og:type',
        content: 'article'
      },
      {
        property: 'og:url',
        content: `https://thanhnn16.id.vn/projects/${route.params.slug}`
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: project.value.title
      },
      {
        name: 'twitter:description',
        content: project.value.description
      },
      {
        name: 'twitter:image',
        content: thumbnailSrc.value
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Project',
          name: project.value.title,
          description: project.value.description,
          image: thumbnailSrc.value,
          datePublished: project.value.createdAt,
          dateModified: project.value.updatedAt,
          author: {
            '@type': 'Person',
            name: 'Thanh Nguyen'
          },
          keywords: project.value.technologies?.join(', '),
          url: `https://thanhnn16.id.vn/projects/${route.params.slug}`,
        })
      }
    ]
  }
})
</script>