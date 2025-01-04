<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
    <!-- Image Skeleton -->
    <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>

    <!-- Content Skeleton -->
    <div class="p-6">
      <div class="flex items-center justify-between mb-3">
        <!-- Title Skeleton -->
        <div class="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <!-- Category Skeleton -->
        <div class="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
      
      <!-- Description Skeleton -->
      <div class="space-y-2 mb-4">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>

      <!-- Technologies Skeleton -->
      <div class="flex flex-wrap gap-2">
        <div v-for="i in 3" :key="i" class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </div>
</template> 