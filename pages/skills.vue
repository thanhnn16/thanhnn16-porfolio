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
          {{ t('skills.title') }}
        </h1>
        <p 
          class="text-xl text-gray-600 dark:text-gray-400"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 200 } }"
        >
          {{ t('skills.description') }}
        </p>
      </div>

      <!-- Technical Skills Section -->
      <div class="max-w-4xl mx-auto">
        <h2 
          class="text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0 }"
        >
          {{ t('skills.technicalSkills.title') }}
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

      <!-- Tools & Software Section -->
      <div class="max-w-4xl mx-auto mt-20">
        <h2 
          class="text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0 }"
        >
          {{ t('skills.toolsAndSoftware.title') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Tools -->
          <div 
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible="{ opacity: 1, x: 0 }"
          >
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="heroicons:wrench-screwdriver" class="w-6 h-6 text-primary-500" />
              {{ t('skills.toolsAndSoftware.tools.title') }}
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div 
                v-for="tool in tools"
                :key="tool"
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span class="text-sm">{{ tool }}</span>
              </div>
            </div>
          </div>

          <!-- Software -->
          <div 
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible="{ opacity: 1, x: 0 }"
          >
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="heroicons:computer-desktop" class="w-6 h-6 text-primary-500" />
              {{ t('skills.toolsAndSoftware.software.title') }}
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div 
                v-for="software in softwares"
                :key="software"
                class="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span class="text-sm">{{ software }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue';
const { t, locale } = useI18n()
const lang = computed(() => locale.value)

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
    name: 'Kotlin',
    icon: 'logos:kotlin',
    level: 75,
    description: t('skills.kotlinDescription')
  },
  {
    name: 'Next.js',
    icon: 'logos:nextjs-icon',
    level: 85,
    description: t('skills.nextjsDescription')
  },
  {
    name: 'Nuxt.js',
    icon: 'logos:nuxt-icon',
    level: 85,
    description: t('skills.nuxtjsDescription')
  },
  {
    name: 'React.js',
    icon: 'logos:react',
    level: 80,
    description: t('skills.reactjsDescription')
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
    name: 'MySQL',
    icon: 'logos:mysql',
    level: 85,
    description: t('skills.mysqlDescription')
  },
  {
    name: 'PostgreSQL',
    icon: 'logos:postgresql',
    level: 80,
    description: t('skills.postgresDescription')
  },
  {
    name: 'MongoDB',
    icon: 'logos:mongodb-icon',
    level: 75,
    description: t('skills.mongodbDescription')
  },
  {
    name: 'TailwindCSS',
    icon: 'logos:tailwindcss-icon',
    level: 90,
    description: t('skills.tailwindDescription')
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

const tools = [
    "Visual Studio Code",
    "IntelliJ IDEA",
    "Android Studio",
    "Xcode",
    "Git & GitHub",
    "GitLab",
    "Docker",
    "Postman",
    "Datagrip",
    "Firebase Console",
    "Google Cloud Platform",
    "AWS Console",
    "Terminal",
]

const softwares = [
    "Microsoft Office",
    "Google Workspace",
    "Adobe Creative Suite",
    "Figma",
    "Notion",
    "Trello",
    "Zoom",
    "Microsoft Teams",
    "Adobe XD",
    "Canva",
    "Discord",
    "Skype",
]
</script>
