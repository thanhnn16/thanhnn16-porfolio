<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
    <!-- Thumbnail Skeleton -->
    <div class="h-48 bg-gray-200 dark:bg-gray-700"></div>
    
    <!-- Content -->
    <div class="p-4">
      <!-- Title Skeleton -->
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      
      <!-- Excerpt Skeleton -->
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      
      <!-- Meta Info Skeleton -->
      <div class="mt-4 flex items-center justify-between">
        <!-- Author Info -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
        
        <!-- Date -->
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for skeleton
</script> 