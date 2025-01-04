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
              to="/contact" 
              class="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 transition-colors"
            >
              {{ t('about.contactMe') }}
            </NuxtLink>
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
          {{ t('about.education') }}
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

      <!-- Technical Skills Section -->
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

      <!-- Soft Skills Section -->
      <div class="max-w-4xl mx-auto mt-20">
        <h2 
          class="text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0 }"
        >
          {{ t('skills.softSkills.title') }}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="skill in softSkills" 
            :key="skill.name"
            class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <Icon :name="skill.icon" class="w-6 h-6 text-primary-500" />
              </div>
              <h3 class="font-medium text-sm">{{ skill.name }}</h3>
            </div>
            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-primary-500 rounded-full" :style="{ width: `${skill.level}%` }"></div>
            </div>
          </div>
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
    year: '2017',
    title: t('about.timeline.highSchool.title'),
    institution: t('about.timeline.highSchool.institution'),
    description: t('about.timeline.highSchool.description')
  },
  {
    id: 2,
    year: '2017-2021',
    title: t('about.timeline.university.title'),
    institution: t('about.timeline.university.institution'),
    description: t('about.timeline.university.description')
  },
  {
    id: 3,
    year: '2022',
    title: t('about.timeline.fptStart.title'),
    institution: t('about.timeline.fptStart.institution'),
    description: t('about.timeline.fptStart.description')
  },
  {
    id: 4,
    year: '2023',
    title: t('about.timeline.internship.title'),
    institution: t('about.timeline.internship.institution'),
    description: t('about.timeline.internship.description')
  },
  {
    id: 5,
    year: t('about.timeline.currentJob.year'),
    title: t('about.timeline.currentJob.title'),
    institution: t('about.timeline.currentJob.institution'),
    description: t('about.timeline.currentJob.description')
  },
  {
    id: 6,
    year: '2024',
    title: t('about.timeline.graduation.title'),
    institution: t('about.timeline.graduation.institution'),
    description: t('about.timeline.graduation.description')
  }
]

const skills = [
  {
    name: 'Flutter',
    icon: 'logos:flutter',
    level: 85,
    description: t('skills.flutterDescription')
  },
  {
    name: 'React Native',
    icon: 'logos:react',
    level: 80,
    description: t('skills.reactNativeDescription')
  },
  {
    name: 'Nuxt.js',
    icon: 'logos:nuxt-icon',
    level: 85,
    description: t('skills.nuxtjsDescription')
  },
  {
    name: 'Laravel',
    icon: 'logos:laravel',
    level: 80,
    description: t('skills.laravelDescription')
  },
  {
    name: 'Node.js',
    icon: 'logos:nodejs',
    level: 85,
    description: t('skills.nodejsDescription')
  },
  {
    name: 'TailwindCSS',
    icon: 'logos:tailwindcss-icon',
    level: 90,
    description: t('skills.tailwindDescription')
  },
  {
    name: 'MySQL',
    icon: 'logos:mysql',
    level: 85,
    description: t('skills.mysqlDescription')
  },
  {
    name: 'MongoDB',
    icon: 'logos:mongodb-icon',
    level: 75,
    description: t('skills.mongodbDescription')
  }
]

const softSkills = [
  {
    name: t('skills.softSkills.teamwork'),
    icon: 'heroicons:user-group',
    level: 90
  },
  {
    name: t('skills.softSkills.independent'),
    icon: 'heroicons:user',
    level: 85
  },
  {
    name: t('skills.softSkills.problemSolving'),
    icon: 'heroicons:light-bulb',
    level: 85
  },
  {
    name: t('skills.softSkills.timeManagement'),
    icon: 'heroicons:clock',
    level: 80
  },
  {
    name: t('skills.softSkills.stressManagement'),
    icon: 'heroicons:heart',
    level: 85
  },
  {
    name: t('skills.softSkills.communication'),
    icon: 'heroicons:chat-bubble-left-right',
    level: 85
  },
  {
    name: t('skills.softSkills.continuousLearning'),
    icon: 'heroicons:academic-cap',
    level: 90
  },
  {
    name: t('skills.softSkills.adaptability'),
    icon: 'heroicons:arrows-right-left',
    level: 85
  },
  {
    name: t('skills.softSkills.creativity'),
    icon: 'heroicons:sparkles',
    level: 80
  },
  {
    name: t('skills.softSkills.criticalThinking'),
    icon: 'heroicons:puzzle-piece',
    level: 85
  },
  {
    name: t('skills.softSkills.leadership'),
    icon: 'heroicons:flag',
    level: 75
  },
  {
    name: t('skills.softSkills.projectManagement'),
    icon: 'heroicons:clipboard-document-list',
    level: 80
  }
]
</script>
