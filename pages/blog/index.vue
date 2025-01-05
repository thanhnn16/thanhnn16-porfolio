<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">{{ t('blog.title') }}</h1>
    
    <!-- Blog post list -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BlogPostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BlogPostCardSkeleton v-for="i in 6" :key="i" />
    </div>

    <!-- Empty state -->
    <div v-if="!loading && posts.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">{{ t('blog.empty') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { posts, loading } = useBlog()

// Meta tags
useHead({
  title: t('blog.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('blog.meta.description')
    }
  ]
})
</script> 