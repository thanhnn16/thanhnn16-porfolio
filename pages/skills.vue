<template>
  <div class="container mx-auto py-12">
    <h1 class="text-4xl font-bold text-dark mb-12 text-center">{{ $t('mySkills') }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="category in skillCategories" :key="category.title" class="skill-category">
        <h2 class="text-2xl font-semibold mb-4 text-dark">{{ category.title }}</h2>
        <ul class="space-y-3">
          <li v-for="skill in category.skills" :key="skill.name" class="skill-item">
            <div class="flex items-center mb-1">
              <span class="skill-tag mr-2">{{ skill.name }}</span>
              <div class="flex-grow h-2 bg-gray-200 rounded-full">
                <div class="h-2 bg-accent rounded-full" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
            <p class="text-muted text-sm">{{ skill.description }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Phần mới: Ngôn ngữ -->
    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-4 text-dark">{{ $t('languages') }}</h2>
      <ul class="space-y-2">
        <li v-for="language in languages" :key="language.name" class="flex items-center">
          <span class="skill-tag mr-2">{{ language.name }}</span>
          <span class="text-muted">{{ language.level }}</span>
        </li>
      </ul>
    </section>

    <!-- Phần mới: Chứng chỉ -->
    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-4 text-dark">{{ $t('certificates') }}</h2>
      <ul class="space-y-2">
        <li v-for="cert in certificates" :key="cert.name" class="flex items-center">
          <span class="skill-tag mr-2">{{ cert.name }}</span>
          <span class="text-muted">{{ cert.issuer }} - {{ cert.year }}</span>
        </li>
      </ul>
    </section>

    <!-- Phần mới: Công cụ và Phần mềm -->
    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-4 text-dark">{{ $t('toolsAndSoftware') }}</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="tool in toolsAndSoftware" :key="tool" class="skill-tag">{{ tool }}</span>
      </div>
    </section>

    <!-- Phần mới: Kỹ năng mềm -->
    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-4 text-dark">{{ $t('softSkills') }}</h2>
      <ul class="list-disc list-inside text-muted">
        <li v-for="skill in softSkills" :key="skill">{{ skill }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const skillCategories = ref([
  {
    title: t('webDevelopment'),
    skills: [
      { name: 'HTML5', description: t('html5Description'), level: 90 },
      { name: 'CSS', description: t('cssDescription'), level: 85 },
      { name: 'JavaScript', description: t('javascriptDescription'), level: 80 },
      { name: 'Nuxt.js', description: t('nuxtjsDescription'), level: 75 },
      { name: 'Laravel', description: t('laravelDescription'), level: 70 },
    ]
  },
  {
    title: t('mobileDevelopment'),
    skills: [
      { name: 'React Native', description: t('reactNativeDescription'), level: 80 },
      { name: 'Expo', description: t('expoDescription'), level: 75 },
      { name: 'Kotlin', description: t('kotlinDescription'), level: 65 },
      { name: 'Flutter', description: t('flutterDescription'), level: 60 },
    ]
  },
  {
    title: t('uiUxDesign'),
    skills: [
      { name: 'Figma', description: t('figmaDescription'), level: 85 },
      { name: t('uiMobile'), description: t('uiMobileDescription'), level: 80 },
      { name: t('prototype'), description: t('prototypeDescription'), level: 75 },
    ]
  }
])

const languages = ref([
  { name: 'Tiếng Việt', level: t('native') },
  { name: 'Tiếng Anh', level: t('fluent') },
  { name: 'Tiếng Nhật', level: t('intermediate') },
])

const certificates = ref([
  { name: 'JLPT N3', issuer: 'Japan Foundation', year: '2023' },
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
])

const toolsAndSoftware = ref([
  'Git', 'VS Code', 'Android Studio', 'Xcode', 'Adobe XD', 'Sketch', 'Jira', 'Trello'
])

const softSkills = ref([
  t('teamwork'),
  t('communication'),
  t('problemSolving'),
  t('timeManagement'),
  t('adaptability'),
])
</script>

<style scoped>
.skill-category {
  @apply bg-white p-6 rounded-lg shadow-soft transition duration-300 hover:shadow-hover;
}

.skill-item {
  @apply mb-4 last:mb-0;
}

.skill-tag {
  @apply bg-accent bg-opacity-10 px-3 py-1 rounded-full text-accent font-medium text-sm whitespace-nowrap mb-1 inline-block;
}

.text-dark {
  @apply text-gray-800;
}

.text-muted {
  @apply text-gray-600;
}

.shadow-soft {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
