<template>
  <div v-if="project">
    <h2 class="text-3xl font-semibold text-black mb-6">{{ project.name }}</h2>
    <img :src="project.image" :alt="project.name" class="w-full max-w-2xl mb-6 rounded-lg shadow-md">
    <p class="text-gray-600 mb-4">{{ project.description }}</p>
    <p class="text-blue-900 font-medium">Loại dự án: {{ project.type }}</p>
  </div>
  <div v-else>
    <p>Không tìm thấy dự án.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const project = ref(null)

onMounted(() => {
  // Giả lập việc lấy dữ liệu dự án từ API hoặc store
  const projects = [
    {
      id: 1,
      name: 'Ứng dụng di động 1',
      description: 'Mô tả chi tiết về ứng dụng di động 1.',
      image: 'https://placehold.co/600x400',
      type: 'Mobile',
    },
    {
      id: 2,
      name: 'Trang web 1',
      description: 'Mô tả chi tiết về trang web 1.',
      image: 'https://placehold.co/600x400',
      type: 'Website',
    },
  ]
  
  project.value = projects.find(p => p.id === parseInt(route.params.id))
})
</script>
