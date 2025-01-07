<template>
  <div class="container mx-auto px-4 py-8">
    <template v-if="post">
      <!-- Header -->
      <header class="max-w-3xl mx-auto mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="text-sm font-medium px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
          >
            {{ tag }}
          </span>
        </div>

        <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>

        <div class="flex items-center justify-between text-gray-500 dark:text-gray-400">
          <div class="flex items-center gap-3">
            <img 
              v-if="post.author.avatar"
              :src="post.author.avatar" 
              :alt="post.author.name"
              class="w-10 h-10 rounded-full"
            />
            <Icon v-else name="heroicons:user-circle" class="w-10 h-10" />
            <div>
              <div class="font-medium text-gray-900 dark:text-gray-100">
                {{ post.author.name }}
              </div>
              <time v-if="post.publishedAt" :datetime="post.publishedAt" class="text-sm">
                {{ formatDate(post.publishedAt) }}
              </time>
              <span v-else class="text-sm">{{ t('blog.draft') }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <button 
              class="flex items-center gap-2 text-sm hover:text-primary-600 dark:hover:text-primary-400"
              @click="share"
            >
              <Icon name="heroicons:share" class="w-5 h-5" />
              {{ t('blog.share') }}
            </button>
          </div>
        </div>
      </header>

      <!-- Featured image -->
      <div class="max-w-4xl mx-auto mb-12 aspect-video rounded-xl overflow-hidden">
        <NuxtImg
          :src="post.thumbnail"
          :alt="post.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Content -->
      <article class="prose prose-lg dark:prose-invert mx-auto">
        <VueMarkdownRenderer :source="post.content" />
      </article>
    </template>

    <!-- Loading state -->
    <div v-else-if="loading" class="animate-pulse">
      <div class="max-w-3xl mx-auto mb-8">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-32 mb-4"></div>
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mb-4"></div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      </div>
      <div class="max-w-4xl mx-auto mb-12 aspect-video rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      <div class="max-w-3xl mx-auto space-y-4">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">{{ error || t('blog.notFound') }}</p>
      <NuxtLink 
        to="/blog"
        class="inline-flex items-center gap-2 mt-4 text-primary-600 dark:text-primary-400 hover:underline"
      >
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        {{ t('blog.backToList') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/blog'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

// Blog post state
const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Get post data
const { data } = await useFetch<Post>(`/api/blog/posts/${route.params.slug}`)
if (data.value) {
  post.value = data.value
  loading.value = false
} else {
  error.value = t('blog.notFound')
  loading.value = false
}

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Share post
const share = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: post.value?.title,
        text: post.value?.excerpt,
        url: window.location.href
      })
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }
}

// SEO Meta Tags
useHead(() => {
  if (!post.value) return {}

  return {
    title: post.value.title,
    meta: [
      {
        name: 'description',
        content: post.value.excerpt
      },
      {
        property: 'og:title',
        content: post.value.title
      },
      {
        property: 'og:description',
        content: post.value.excerpt
      },
      {
        property: 'og:image',
        content: post.value.thumbnail
      },
      {
        property: 'og:type',
        content: 'article'
      },
      {
        property: 'og:url',
        content: `https://thanhnn16.id.vn/blog/${route.params.slug}`
      },
      {
        property: 'article:published_time',
        content: post.value.publishedAt
      },
      {
        property: 'article:modified_time',
        content: post.value.updatedAt
      },
      {
        property: 'article:author',
        content: post.value.author.name
      },
      {
        property: 'article:tag',
        content: post.value.tags.join(',')
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: post.value.title
      },
      {
        name: 'twitter:description',
        content: post.value.excerpt
      },
      {
        name: 'twitter:image',
        content: post.value.thumbnail
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.value.title,
          description: post.value.excerpt,
          image: post.value.thumbnail,
          datePublished: post.value.publishedAt,
          dateModified: post.value.updatedAt,
          author: {
            '@type': 'Person',
            name: post.value.author.name
          },
          publisher: {
            '@type': 'Organization',
            name: 'Thanh Nguyen Portfolio',
            logo: {
              '@type': 'ImageObject',
              url: 'https://thanhnn16.id.vn/images/logo.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://thanhnn16.id.vn/blog/${route.params.slug}`
          },
          keywords: post.value.tags.join(', '),
          articleBody: post.value.content
        })
      }
    ]
  }
})
</script> 