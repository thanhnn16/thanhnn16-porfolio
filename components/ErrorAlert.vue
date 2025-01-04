<template>
  <TransitionRoot appear :show="!!error" as="template">
    <div class="fixed bottom-4 right-4 z-50">
      <TransitionChild
        enter="transform duration-300"
        enter-from="translate-x-full"
        enter-to="translate-x-0"
        leave="transform duration-200"
        leave-from="translate-x-0"
        leave-to="translate-x-full"
      >
        <div 
          v-if="error"
          class="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg shadow-lg p-4 max-w-md"
        >
          <div class="flex gap-3">
            <div class="flex-shrink-0">
              <Icon 
                name="heroicons:exclamation-circle" 
                class="w-5 h-5 text-red-400"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                {{ error.message }}
              </h3>
              <div 
                v-if="error.code"
                class="mt-1 text-xs text-red-700 dark:text-red-300"
              >
                Error code: {{ error.code }}
              </div>
            </div>
            <div class="flex-shrink-0">
              <button
                @click="onClose"
                class="text-red-400 hover:text-red-500"
              >
                <Icon name="heroicons:x-mark" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue'

interface ErrorState {
  message: string
  code?: string | number
  details?: any
}

defineProps<{
  error: ErrorState | null
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script> 