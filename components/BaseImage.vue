<template>
  <img
    :src="src"
    :alt="alt"
    @error="handleImageError"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { useImageFallback } from '~/composables/useImageFallback'

const props = defineProps<{
  src: string
  alt: string
}>()

const { handleImageError } = useImageFallback()
</script> 