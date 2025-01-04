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
          {{ t('about.title') }}
        </h1>
        <p 
          class="text-xl text-gray-600 dark:text-gray-400"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 200 } }"
        >
          {{ t('about.description') }}
        </p>
      </div>

      <!-- Profile Section -->
      <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 mb-20">
        <div 
          class="relative"
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :enter="{ opacity: 1, x: 0 }"
        >
          <div class="aspect-square rounded-2xl overflow-hidden">
            <NuxtImg 
              src="/profile.jpg" 
              alt="Profile" 
              class="w-full h-full object-cover"
              loading="lazy"
              placeholder
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
        </div>

        <div 
          class="flex flex-col justify-center"
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
        >
          <h2 class="text-2xl font-bold mb-4">{{ t('about.greeting') }}</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            {{ t('about.introduction') }}
          </p>
          <div class="flex gap-4">
            <a 
              href="#" 
              class="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {{ t('about.downloadCV') }}
            </a>
            <a 
              href="#" 
              class="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors"
            >
              {{ t('about.contactMe') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div class="max-w-4xl mx-auto">
        <h2 
          class="text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0 }"
        >
          {{ t('about.journey') }}
        </h2>

        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-800"></div>

          <!-- Timeline Items -->
          <div class="space-y-12">
            <TimelineItem
              v-for="(item, index) in timelineItems"
              :key="item.id"
              :item="item"
              :position="index % 2 === 0 ? 'left' : 'right'"
            />
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="max-w-4xl mx-auto mt-20">
        <h2 
          class="text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0 }"
        >
          {{ t('about.skillsAndTech') }}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <SkillCard 
            v-for="skill in skills" 
            :key="skill.name"
            :skill="skill"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const timelineItems = [
  {
    id: 1,
    year: '2023',
    title: t('about.timeline.seniorDev.title'),
    company: t('about.timeline.seniorDev.company'),
    description: t('about.timeline.seniorDev.description')
  },
  {
    id: 2,
    year: '2021',
    title: t('about.timeline.fullstackDev.title'),
    company: t('about.timeline.fullstackDev.company'),
    description: t('about.timeline.fullstackDev.description')
  }
]

const skills = [
  {
    name: t('about.skills.vuejs.name'),
    icon: 'logos:vue',
    level: 90,
    description: t('about.skills.vuejs.description')
  },
  {
    name: t('about.skills.nodejs.name'),
    icon: 'logos:nodejs',
    level: 85,
    description: t('about.skills.nodejs.description')
  }
]
</script>
