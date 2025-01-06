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
            {{ t('personalInfo.name') }}
          </h1>
          
          <p 
            class="text-2xl text-gray-600 dark:text-gray-400 mb-4"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          >
            {{ t('personalInfo.role') }}
          </p>

          <p 
            class="text-xl text-gray-600 dark:text-gray-400 mb-8"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          >
            <TypewriterText 
              :text="t('hero.subtitle')"
              :delay="500"
              :speed="25"
            />
          </p>

          <div 
            class="flex gap-4 justify-center"
            v-motion
            :initial="{ opacity: 0 }"
            :visible="{ opacity: 1, transition: { delay: 400 } }"
          >
            <NuxtLink 
              to="/projects"
              class="px-6 py-3 bg-primary-500 dark:bg-primary-600 text-primary-contrast rounded-lg hover:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
            >
              {{ t('hero.viewWork') }}
            </NuxtLink>
            <NuxtLink 
              to="/contact"
              class="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
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
            <BaseImage :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
              <div class="flex justify-between items-center">
                <NuxtLink :to="project.link" class="text-primary-500 hover:text-primary-600">
                  {{ t('projects.learnMore') }} →
                </NuxtLink>
                <a :href="project.github" target="_blank" class="text-gray-500 hover:text-primary-500">
                  <Icon name="mdi:github" class="w-6 h-6" />
                </a>
              </div>
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
    title: 'Allure Spa',
    description: t('projects.items.allureSpa.description'),
    image: '/images/projects/allure-spa/thumbnail.jpg',
    link: '/projects/allure-spa',
    github: 'https://github.com/thanhnn16/allure-spa'
  },
  {
    id: 2,
    title: 'Marine Trace',
    description: t('projects.items.marineTrace.description'),
    image: '/images/projects/marine-trace/thumbnail.jpg',
    link: '/projects/marine-trace',
    github: 'https://github.com/thanhnn16/marine-trace'
  },
  {
    id: 3,
    title: 'Allure Spa Admin',
    description: t('projects.items.allureSpaAdmin.description'),
    image: '/images/projects/allure-spa-admin/thumbnail.jpg',
    link: '/projects/allure-spa-admin',
    github: 'https://github.com/thanhnn16/allure-spa-admin'
  }
]
</script>
