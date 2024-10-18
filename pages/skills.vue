<template>
  <div class="container mx-auto py-20 px-4">
    <h1 class="text-4xl font-bold text-dark mt-12 mb-12 text-center gsap-fade-in">{{ $t('mySkills') }}</h1>

    <!-- Phần kỹ năng chính -->
    <section v-for="(category, index) in skillCategories" :key="category.title" class="mb-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ category.title }}</h2>
      <ul class="space-y-4">
        <li v-for="skill in category.skills" :key="skill.name" class="skill-item">
          <div class="flex items-center mb-2">
            <span class="skill-tag mr-3">{{ skill.name }}</span>
            <div class="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-accent rounded-full" :style="{ width: `${skill.level}%` }"></div>
            </div>
          </div>
          <p class="text-muted text-sm">{{ skill.description }}</p>
        </li>
      </ul>
    </section>

    <!-- Phần ngôn ngữ -->
    <section class="mb-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('languages') }}</h2>
      <ul class="space-y-4">
        <li v-for="language in languages" :key="language.name" class="flex items-center">
          <span class="skill-tag mr-3">{{ language.name }}</span>
          <span class="text-muted">{{ language.level }}</span>
        </li>
      </ul>
    </section>

    <!-- Phần công cụ và phần mềm -->
    <section class="mb-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('toolsAndSoftware') }}</h2>
      <div class="flex flex-wrap gap-3">
        <span v-for="tool in toolsAndSoftware" :key="tool" class="skill-tag">{{ tool }}</span>
      </div>
    </section>

    <!-- Phần kỹ năng mềm -->
    <section class="mb-16 gsap-slide-up">
      <h2 class="text-2xl font-semibold text-dark mb-6">{{ $t('softSkills') }}</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted">
        <li v-for="skill in softSkills" :key="skill" class="flex items-center">
          <span class="mr-2 text-accent">•</span>{{ skill }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'

const { t } = useI18n()

const skillCategories = ref([
  {
    title: t('mobileDevelopment'),
    skills: [
      { name: 'React Native', description: t('reactNativeDescription'), level: 85 },
      { name: 'Flutter', description: t('flutterDescription'), level: 75 },
      { name: 'Android (Kotlin)', description: t('kotlinDescription'), level: 70 },
    ]
  },
  {
    title: t('webDevelopment'),
    skills: [
      { name: 'Laravel', description: t('laravelDescription'), level: 80 },
      { name: 'Node.js', description: t('nodejsDescription'), level: 75 },
      { name: 'VPS', description: t('vpsDescription'), level: 70 },
      { name: 'REST APIs', description: t('restApisDescription'), level: 85 },
    ]
  },
  {
    title: t('databaseAndVersionControl'),
    skills: [
      { name: 'MySQL', description: t('mysqlDescription'), level: 80 },
      { name: 'Git', description: t('gitDescription'), level: 85 },
    ]
  }
])

const languages = ref([
  { name: 'Tiếng Việt', level: t('native') },
  { name: 'Tiếng Anh', level: t('readWrite') },
  { name: 'Tiếng Nhật', level: t('n3Level') },
])

const toolsAndSoftware = ref([
  'VS Code', 'Android Studio', 'Xcode', 'Postman', 'Docker', 'Jira'
])

const softSkills = ref([
  t('selfLearning'),
  t('communication'),
  t('teamwork'),
  t('research'),
  t('aiUtilization'),
  t('problemSolving'),
  t('agileMethodology'),
])

onMounted(() => {
  gsap.from('.gsap-fade-in', { 
    opacity: 0, 
    duration: 1.5, 
    ease: 'power2.out' 
  })

  gsap.from('.gsap-slide-up', { 
    y: 50, 
    opacity: 0, 
    duration: 1, 
    stagger: 0.2, 
    ease: 'power2.out' 
  })

  gsap.from('.skill-item .bg-accent', {
    width: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.skill-item',
      start: 'top 80%',
    }
  })
})
</script>

<style scoped>
.container {
  max-width: 800px;
}

h1, h2 {
  color: #2c3e50;
}

.text-muted {
  color: #6c757d;
}

section {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: transform 0.3s ease;
}

section:hover {
  transform: translateY(-5px);
}

.skill-tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.bg-accent {
  background-color: #007bff;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  section {
    padding: 1.5rem;
  }
}

.skill-item {
  background-color: #f8f9fa;
  border-left: 4px solid #007bff;
  padding: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.skill-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
