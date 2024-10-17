<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="project.image" :alt="project.name" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-xl font-semibold text-black mb-2">{{ project.name }}</h3>
      <p class="text-gray-600 mb-4">{{ project.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium text-blue-900">{{ project.type }}</span>
        <NuxtLink :to="`/project/${project.id}`" class="text-sm font-medium text-red-600 hover:underline">Xem chi tiết</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>
