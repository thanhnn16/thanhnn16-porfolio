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
          {{ t('personalInfo.role') }}
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
          <div class="aspect-square rounded-2xl overflow-hidden bg-light-secondary dark:bg-dark-secondary relative group">
            <BaseImage 
              src="/images/avatar.png" 
              alt="Profile" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        <div 
          class="flex flex-col justify-center"
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
        >
          <h2 class="text-2xl font-bold mb-4">{{ t('personalInfo.name') }}</h2>
          <div class="space-y-4 text-gray-600 dark:text-gray-400 mb-6">
            <div class="flex items-center gap-2">
              <Icon name="heroicons:calendar" class="w-5 h-5" />
              <span>{{ t('personalInfo.birthDate') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:envelope" class="w-5 h-5" />
              <span>{{ t('personalInfo.email') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:phone" class="w-5 h-5" />
              <span>{{ t('personalInfo.phone') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:map-pin" class="w-5 h-5" />
              <span>{{ t('personalInfo.location') }}</span>
            </div>
          </div>
          <div class="flex gap-4">
            <a 
              href="/cv.pdf" 
              target="_blank"
              class="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {{ t('about.downloadCV') }}
            </a>
            <NuxtLink 
              :to="localePath('/contact')"
              class="px-6 py-3 bg-primary-500 text-primary-contrast rounded-lg hover:bg-primary-600 transition-colors"
            >
              {{ t('contact.title') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div class="max-w-7xl mx-auto">
        <h2 
          class="text-4xl font-bold text-center mb-16"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0 }"
        >
          {{ t('about.journey') }}
        </h2>

        <TimelineSection 
          :items="timelineItems" 
          class="max-w-7xl mx-auto px-4"
        />
      </div>

      <!-- Interesting Facts Section -->
      <div class="max-w-6xl mx-auto mt-20">
        <h2 
          class="text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0 }"
        >
          {{ t('about.interestingFacts') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Languages -->
          <div 
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible="{ opacity: 1, x: 0 }"
          >
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="heroicons:language" class="w-6 h-6 text-primary-500" />
              {{ t('about.languages.title') }}
            </h3>
            <ul class="space-y-3">
              <li class="flex items-center justify-between">
                <span>{{ t('about.languages.vietnamese') }}</span>
                <span class="text-primary-500">{{ t('about.languages.native') }}</span>
              </li>
              <li class="flex items-center justify-between">
                <span>{{ t('about.languages.english') }}</span>
                <span class="text-primary-500">{{ t('about.languages.advanced') }}</span>
              </li>
              <li class="flex items-center justify-between">
                <span>{{ t('about.languages.japanese') }}</span>
                <span class="text-primary-500">{{ t('about.languages.n3') }}</span>
              </li>
              <li class="flex items-center justify-between">
                <span>{{ t('about.languages.japanese') }}</span>
                <span class="text-primary-500">{{ t('about.languages.n2Target') }}</span>
              </li>
            </ul>
          </div>

          <!-- Hobbies -->
          <div 
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible="{ opacity: 1, x: 0 }"
          >
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="heroicons:heart" class="w-6 h-6 text-primary-500" />
              {{ t('about.hobbies.title') }}
            </h3>
            <ul class="space-y-3 text-gray-600 dark:text-gray-400">
              <li v-for="hobby in hobbies" :key="hobby" class="flex items-center gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary-500" />
                {{ hobby }}
              </li>
            </ul>
          </div>

          <!-- Fun Facts -->
          <div 
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible="{ opacity: 1, x: 0 }"
          >
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="heroicons:light-bulb" class="w-6 h-6 text-primary-500" />
              {{ t('about.funFacts.title') }}
            </h3>
            <ul class="space-y-3 text-gray-600 dark:text-gray-400">
              <li v-for="fact in funFacts" :key="fact" class="flex items-center gap-2">
                <Icon name="heroicons:star" class="w-5 h-5 text-primary-500" />
                {{ fact }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const localePath = useLocalePath()

const timelineItems = [
  {
    id: 1,
    year: '2017',
    title: t('about.timeline.highSchool.title'),
    institution: t('about.timeline.highSchool.institution'),
    description: t('about.timeline.highSchool.description'),
    image: '/images/timeline/high-school.jpg'
  },
  {
    id: 2,
    year: '2017-2021',
    title: t('about.timeline.university.title'),
    institution: t('about.timeline.university.institution'),
    description: t('about.timeline.university.description'),
    image: '/images/timeline/university.jpg'
  },
  {
    id: 3,
    year: '2022',
    title: t('about.timeline.fptStart.title'),
    institution: t('about.timeline.fptStart.institution'),
    description: t('about.timeline.fptStart.description'),
    image: '/images/timeline/fpt.jpg'
  },
  {
    id: 4,
    year: '2023',
    title: t('about.timeline.internship.title'),
    institution: t('about.timeline.internship.institution'),
    description: t('about.timeline.internship.description'),
    image: '/images/timeline/internship.jpg'
  },
  {
    id: 5,
    year: t('about.timeline.currentJob.year'),
    title: t('about.timeline.currentJob.title'),
    institution: t('about.timeline.currentJob.institution'),
    description: t('about.timeline.currentJob.description'),
    image: '/images/timeline/current-job.jpg'
  },
  {
    id: 6,
    year: '2024',
    title: t('about.timeline.graduation.title'),
    institution: t('about.timeline.graduation.institution'),
    description: t('about.timeline.graduation.description'),
    image: '/images/timeline/graduation.jpg'
  }
]

const languages = [
  { name: '🇻🇳 ' + t('about.languages.vietnamese'), level: t('about.languages.native') },
  { name: '🇬🇧 ' + t('about.languages.english'), level: t('about.languages.advanced') },
  { name: '🇯🇵 ' + t('about.languages.japanese'), level: t('about.languages.n3') }
]

const hobbies = [
  t('about.hobbies.reading'),
  t('about.hobbies.music'),
  t('about.hobbies.traveling'),
  t('about.hobbies.coding')
]

const funFacts = [
  t('about.funFacts.birthdate'),
  t('about.funFacts.numerology'),
  t('about.funFacts.wuxia'),
]
</script>
