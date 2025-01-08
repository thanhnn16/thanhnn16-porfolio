<template>
  <div class="pt-20">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-primary-50 to-white dark:from-primary-950 dark:to-gray-900 py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-4">{{ t('blog.title') }}</h1>
        <p class="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">{{ t('blog.description') }}</p>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="container mx-auto px-4 py-12">
      <!-- Search and Filter -->
      <div class="mb-8">
        <!-- Search -->
        <div class="max-w-xl mx-auto mb-6">
          <div class="relative">
            <input type="search" v-model="searchQuery" :placeholder="t('blog.searchPlaceholder')"
              class="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
            <Icon name="heroicons:magnifying-glass"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <!-- Categories/Tags Filter -->
        <div class="flex flex-wrap justify-center gap-2">
          <button v-for="category in categories" :key="category.id" @click="toggleCategory(category.id)"
            class="px-4 py-1.5 rounded-full text-sm transition-colors" :class="[
              selectedCategories.includes(category.id)
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]">
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogPostCard v-for="post in filteredPosts" :key="post.id" :post="post" class="h-full" />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogPostCardSkeleton v-for="i in 6" :key="i" />
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredPosts.length === 0" class="text-center py-16">
        <Icon name="heroicons:document-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p class="text-gray-500 dark:text-gray-400 text-lg mb-2">
          {{ searchQuery ? t('blog.noSearchResults') : t('blog.empty') }}
        </p>
        <p v-if="searchQuery" class="text-sm text-gray-400">
          {{ t('blog.tryAnotherSearch') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/blog'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { posts, loading } = useBlog()

const searchQuery = ref('')
const selectedCategories = ref<string[]>([])

// Mock categories - replace with actual categories from your API
const categories = [
  { id: 'all', name: t('blog.categories.all') },
  { id: 'tech', name: t('blog.categories.tech') },
  { id: 'programming', name: t('blog.categories.programming') },
  { id: 'mobile', name: t('blog.categories.mobile') },
  { id: 'web', name: t('blog.categories.web') },
]

const toggleCategory = (categoryId: string) => {
  if (categoryId === 'all') {
    selectedCategories.value = []
    return
  }

  const index = selectedCategories.value.indexOf(categoryId)
  if (index === -1) {
    selectedCategories.value.push(categoryId)
  } else {
    selectedCategories.value.splice(index, 1)
  }
}

const filteredPosts = computed(() => {
  let filtered = posts.value as Post[]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    )
  }

  // Apply category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(post =>
      post.tags.some((tag: string) => selectedCategories.value.includes(tag))
    )
  }

  return filtered
})

// Meta tags
useHead({
  title: t('blog.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('blog.meta.description')
    },
    {
      property: 'og:title',
      content: t('blog.meta.title')
    },
    {
      property: 'og:description',
      content: t('blog.meta.description')
    }
  ]
})
</script>

<style scoped>
.search-input:focus {
  box-shadow: 0 0 0 2px rgba(var(--color-primary-500), 0.2);
}
</style>