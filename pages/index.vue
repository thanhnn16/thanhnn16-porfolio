<template>
  <div class="pt-24">
    <!-- Hero Section -->
    <section class="min-h-[80vh] flex items-center">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 
            class="text-4xl md:text-6xl font-bold mb-6"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0 }"
          >
            {{ t('hero.title') }}
          </h1>
          
          <p 
            class="text-xl text-gray-600 dark:text-gray-400 mb-8"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          >
            {{ t('hero.subtitle') }}
          </p>

          <div 
            class="flex gap-4 justify-center"
            v-motion
            :initial="{ opacity: 0 }"
            :visible="{ opacity: 1, transition: { delay: 400 } }"
          >
            <NuxtLink 
              to="/projects"
              class="px-6 py-3 bg-primary-500 dark:bg-primary-600 dark:text-white rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
            >
              {{ t('hero.viewWork') }}
            </NuxtLink>
            <NuxtLink 
              to="/contact"
              class="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:text-white text-gray-900 hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
            >
              {{ t('hero.contactMe') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <h2 
          class="text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :visible="{ opacity: 1, y: 0 }"
        >
          {{ t('projects.featured') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Project Cards -->
          <div 
            v-for="(project, index) in featuredProjects" 
            :key="project.id"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: index * 200 } }"
            class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
              <NuxtLink :to="project.link" class="text-primary-500 hover:text-primary-600">
                {{ t('projects.learnMore') }} →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const featuredProjects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of the project and its key features.',
    image: '/images/project1.jpg',
    link: '/projects/1'
  },
  // Add more projects...
]
</script>
