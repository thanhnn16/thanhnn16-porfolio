<template>
  <NuxtLink 
    :to="`/blog/${post.slug}`"
    class="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div class="aspect-video relative overflow-hidden rounded-t-lg">
      <NuxtImg
        :src="post.thumbnail"
        :alt="post.title"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    
    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span 
          v-for="tag in post.tags" 
          :key="tag"
          class="text-xs font-medium px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
        >
          {{ tag }}
        </span>
      </div>
      
      <h2 class="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ post.title }}
      </h2>
      
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-2">
          <img 
            :src="post.author.avatar" 
            :alt="post.author.name"
            class="w-6 h-6 rounded-full"
          />
          <span>{{ post.author.name }}</span>
        </div>
        
        <time :datetime="post.publishedAt">
          {{ formatDate(post.publishedAt) }}
        </time>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Author {
  name: string
  avatar: string
}

interface Post {
  id: number
  slug: string
  title: string
  excerpt: string
  thumbnail: string
  tags: string[]
  publishedAt: string
  author: Author
}

defineProps<{
  post: Post
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script> 