<template>
  <div>
    <slot v-if="!error" />
    <div 
      v-else
      class="p-8 text-center"
    >
      <div class="mb-4">
        <Icon 
          name="heroicons:exclamation-circle" 
          class="w-12 h-12 text-red-400 mx-auto"
        />
      </div>
      <h3 class="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
        {{ error.message }}
      </h3>
      <p class="text-sm text-red-600 dark:text-red-300 mb-4">
        {{ error.code ? `Error code: ${error.code}` : '' }}
      </p>
      <button
        @click="retry"
        class="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CustomError } from '~/types/error'

const error = ref<CustomError | null>(null)

const retry = () => {
  error.value = null
}

// Catch errors from child components
onErrorCaptured((err) => {
  error.value = err as CustomError
  return false // Prevent error propagation
})
</script> 