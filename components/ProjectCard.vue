<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:translate-y-[-5px]">
    <img :src="project.image" :alt="project.name" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-xl font-semibold text-dark mb-2">{{ project.name }}</h3>
      <p class="text-muted mb-4">{{ project.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium text-blue-900">{{ project.type }}</span>
        <NuxtLink :to="`/project/${project.id}`" class="text-sm font-medium text-red-600 hover:underline">{{ t('viewDetails') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.text-dark {
  color: #2c3e50;
}

.text-muted {
  color: #6c757d;
}

.text-blue-900 {
  color: #007bff;
}

.text-red-600 {
  color: #dc3545;
}
</style>
