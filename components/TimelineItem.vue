<template>
  <div 
    class="relative"
    v-motion
    :initial="{ opacity: 0, x: position === 'left' ? -100 : 100 }"
    :visible="{ opacity: 1, x: 0 }"
  >
    <!-- Content -->
    <div 
      :class="[
        'w-5/12 relative',
        position === 'left' ? 'ml-auto' : 'mr-auto'
      ]"
    >
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <span class="text-primary-500 font-bold">{{ item.year }}</span>
        <h3 class="text-xl font-bold mt-2">{{ item.title }}</h3>
        <p class="text-gray-600 dark:text-gray-400 mt-1">{{ item.institution }}</p>
        <p class="mt-4">{{ item.description }}</p>
      </div>

      <!-- Dot -->
      <div 
        class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-900"
        :class="position === 'left' ? '-right-[42px]' : '-left-[42px]'"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimelineItem } from '~/types/ui'

defineProps<{
  item: TimelineItem
  position: 'left' | 'right'
}>()
</script>
