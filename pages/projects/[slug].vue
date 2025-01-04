<template>
  <div class="pt-24 pb-20">
    <div class="container mx-auto px-4">
      <!-- Back Button -->
      <NuxtLink 
        to="/projects"
        class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-8"
      >
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        Back to Projects
      </NuxtLink>

      <!-- Project Header -->
      <div class="max-w-4xl mx-auto">
        <h1 
          class="text-4xl font-bold mb-6"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          {{ project.title }}
        </h1>

        <!-- Project Image -->
        <div 
          class="rounded-xl overflow-hidden mb-8"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 200 } }"
        >
          <img :src="project.image" :alt="project.title" class="w-full h-auto" />
        </div>

        <!-- Project Content -->
        <div 
          class="prose dark:prose-invert max-w-none"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
        >
          <h2>Project Overview</h2>
          <p>{{ project.description }}</p>

          <h2>Technologies Used</h2>
          <div class="flex flex-wrap gap-2 not-prose mb-8">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Add more project details as needed -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// In a real application, you would fetch this data from an API
const project = {
  title: 'E-commerce Platform',
  description: 'A detailed description of the project...',
  image: '/images/project1.jpg',
  technologies: ['Nuxt 3', 'Vue', 'Tailwind CSS', 'Node.js'],
  // Add more project details
}
</script> 