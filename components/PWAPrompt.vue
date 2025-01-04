<template>
  <TransitionRoot appear :show="showPrompt" as="template">
    <div class="fixed bottom-4 left-4 z-50">
      <TransitionChild
        enter="transform duration-300"
        enter-from="translate-y-full opacity-0"
        enter-to="translate-y-0 opacity-100"
        leave="transform duration-200"
        leave-from="translate-y-0 opacity-100"
        leave-to="translate-y-full opacity-0"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md">
          <div class="flex items-center gap-4">
            <div class="flex-shrink-0">
              <Icon 
                :name="type === 'install' ? 'heroicons:arrow-down-tray' : 'heroicons:arrow-path'" 
                class="w-6 h-6 text-primary-500"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-sm font-medium">
                {{ type === 'install' ? 'Install App' : 'Update Available' }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ 
                  type === 'install' 
                    ? 'Install this app on your device for quick access'
                    : 'A new version is available. Click to update.'
                }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="onAction"
                class="text-sm px-3 py-1 bg-primary-500 text-primary-contrast rounded-lg hover:bg-primary-600"
              >
                {{ type === 'install' ? 'Install' : 'Update' }}
              </button>
              <button
                @click="onClose"
                class="text-gray-400 hover:text-gray-500"
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

defineProps<{
  type: 'install' | 'update'
  showPrompt: boolean
}>()

defineEmits<{
  (e: 'action'): void
  (e: 'close'): void
}>()
</script> 