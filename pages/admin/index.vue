<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main content -->
    <main class="lg:pl-72">
      <div class="px-4 py-10 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
            {{ t('admin.dashboard') }}
          </h1>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div class="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Icon name="heroicons:document-text" class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {{ t('admin.totalPosts') }}
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900 dark:text-white">
                        {{ stats.totalPosts }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Icon name="heroicons:tag" class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {{ t('admin.totalTags') }}
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900 dark:text-white">
                        {{ stats.totalTags }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Icon name="heroicons:eye" class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {{ t('admin.totalViews') }}
                    </dt>
                    <dd>
                      <div class="text-lg font-medium text-gray-900 dark:text-white">
                        {{ stats.totalViews }}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent posts -->
        <div class="mt-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ t('admin.recentPosts') }}
            </h2>
            <NuxtLink
              to="/admin/posts/new"
              class="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <Icon name="heroicons:plus" class="h-5 w-5 mr-2" />
              {{ t('admin.newPost') }}
            </NuxtLink>
          </div>

          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                    {{ t('admin.title') }}
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    {{ t('admin.author') }}
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    {{ t('admin.status') }}
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    {{ t('admin.publishedAt') }}
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">{{ t('admin.actions') }}</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                <tr v-for="post in recentPosts" :key="post.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-10 w-10 rounded-lg object-cover" :src="post.thumbnail" :alt="post.title" />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900 dark:text-white">{{ post.title }}</div>
                        <div class="text-gray-500 dark:text-gray-400">{{ post.excerpt }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div class="flex items-center">
                      <img class="h-8 w-8 rounded-full" src="~/assets/images/thanhnn16-logo-300x128.svg" alt="Logo" />
                      <div class="ml-3">
                        <div class="font-medium text-gray-900 dark:text-white">{{ post.author.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                      :class="{
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': post.status === 'published',
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': post.status === 'draft'
                      }">
                      {{ t(`admin.status.${post.status}`) }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(post.publishedAt) }}
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <NuxtLink :to="`/admin/posts/${post.id}/edit`" class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                      {{ t('admin.edit') }}
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()

interface Author {
  id: number
  name: string
  avatar: string | null
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
}

interface Post {
  id: number
  title: string
  excerpt: string
  thumbnail: string
  status: 'published' | 'draft'
  publishedAt: string
  author: {
    id: number
    name: string
    avatar: string | null
  }
}

interface DashboardResponse {
  stats: {
    totalPosts: number
    totalTags: number
    totalViews: number
  }
  recentPosts: Post[]
}

// Stats data
const stats = ref({
  totalPosts: 0,
  totalTags: 0,
  totalViews: 0
})

// Recent posts data
const recentPosts = ref<Post[]>([])

// Load dashboard data
onMounted(async () => {
  try {
    const { data } = await useFetch<DashboardResponse>('/api/admin/dashboard')
    if (data.value) {
      stats.value = data.value.stats
      recentPosts.value = data.value.recentPosts
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
})

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Meta tags
useHead({
  title: t('admin.dashboard'),
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

// Route middleware
definePageMeta({
  middleware: ['auth']
})
</script> 