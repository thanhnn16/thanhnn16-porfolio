<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Admin Sidebar -->
    <AdminSidebar />

    <!-- Main content -->
    <main class="lg:pl-72">
      <div class="px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script> 