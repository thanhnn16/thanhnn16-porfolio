<template>
  <div 
    class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :visible="{ opacity: 1, y: 0 }"
  >
    <Icon :name="skill.icon" class="w-12 h-12 mb-4" />
    <h3 class="font-bold mb-2">{{ skill.name }}</h3>
    
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div 
        class="bg-primary-500 h-2 rounded-full transition-all duration-1000"
        :style="{ width: `${skill.level}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from '~/types/ui'

defineProps<{
  skill: Skill
}>()
</script> 