<template>
  <div 
    ref="cardRef"
    class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :style="cardStyle"
  >
    <!-- Image Container -->
    <div class="relative overflow-hidden h-48">
      <nuxt-img
        :src="optimizedImage"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        placeholder
      />
      <div 
        class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div 
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
      >
        <NuxtLink 
          :to="project.link"
          class="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          @click="trackProjectClick"
        >
          {{ t('projects.viewProject') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 relative">
      <!-- Hover Effect Background -->
      <div 
        v-if="isHovering"
        class="absolute inset-0 bg-gradient-radial from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :style="{
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, var(--primary-500-10), transparent 50%)`
        }"
      />

      <div class="relative">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold">{{ project.title }}</h3>
          <span class="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {{ project.category }}
          </span>
        </div>
        
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {{ project.description }}
        </p>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full transition-transform hover:scale-110"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Project {
  id: number
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  link: string
}

const props = defineProps<{
  project: Project
}>()

const { t } = useI18n()
const { mouseX, mouseY, isHovering, handleMouseMove, handleMouseEnter, handleMouseLeave } = useHoverEffect()
const { getOptimizedImage } = useOptimizedImage()
const optimizedImage = computed(() => 
  getOptimizedImage(props.project.image, {
    width: 800,
    height: 400,
    quality: 80
  })
)

const cardStyle = computed(() => ({
  transform: isHovering.value 
    ? `perspective(1000px) rotateX(${(mouseY.value - 150) / 20}deg) rotateY(${(mouseX.value - 150) / 20}deg)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  transition: isHovering.value ? 'none' : 'transform 0.5s ease'
}))

const analytics = useAnalytics()

const trackProjectClick = () => {
  analytics.trackEvent({
    category: 'Projects',
    action: 'click',
    label: props.project.title
  })
}
</script>

<style scoped>
.bg-gradient-radial {
  --primary-500-10: rgba(var(--primary-500-rgb), 0.1);
}
</style>
