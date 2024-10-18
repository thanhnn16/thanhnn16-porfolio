<template>
  <div class="container mx-auto py-20 px-4">
    <h1 class="text-4xl font-bold text-dark mt-12 mb-12 text-center gsap-fade-in">{{ t('allProjects') }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gsap-slide-up">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import ProjectCard from '~/components/ProjectCard.vue'

const { t } = useI18n()

const projects = ref([
  {
    id: 1,
    name: 'Đừng Quên Em',
    description: t('projectDungQuenEmDescription'),
    image: 'https://placehold.co/600x400',
    type: t('mobileApp')
  },
  {
    id: 2,
    name: 'Bông Tuyết Trắng',
    description: t('projectBongTuyetTrangDescription'),
    image: 'https://placehold.co/600x400',
    type: t('mobileApp')
  },
  // Thêm các dự án khác ở đây
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
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}

h1 {
  color: #2c3e50;
}

.text-dark {
  color: #2c3e50;
}

.text-muted {
  color: #6c757d;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
