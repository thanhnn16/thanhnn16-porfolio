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

      <template v-if="project && !loading">
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

      <!-- Loading state -->
      <div v-else-if="loading" class="animate-pulse max-w-4xl mx-auto">
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-6"></div>
        <div class="aspect-video rounded-xl bg-gray-200 dark:bg-gray-700 mb-8"></div>
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>

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

// Project state
const project = ref<Project | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Get project data
const { data } = await useFetch<Project>(`/api/projects/${route.params.slug}`)
if (data.value) {
  project.value = data.value
  loading.value = false
} else {
  error.value = t('projects.notFound')
  loading.value = false
}

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