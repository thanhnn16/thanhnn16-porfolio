<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">{{ t('admin.dashboard') }}</h2>
        </div>
      </template>

      <!-- Stats -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <UCard>
          <div class="flex items-center">
            <UIcon name="i-heroicons-document-text" class="h-6 w-6 text-gray-400" />
            <div class="ml-5">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ t('admin.totalPosts') }}
              </p>
              <p class="text-lg font-medium">
                {{ stats.totalPosts }}
              </p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center">
            <UIcon name="i-heroicons-tag" class="h-6 w-6 text-gray-400" />
            <div class="ml-5">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ t('admin.totalTags') }}
              </p>
              <p class="text-lg font-medium">
                {{ stats.totalTags }}
              </p>
            </div>
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center">
            <UIcon name="i-heroicons-eye" class="h-6 w-6 text-gray-400" />
            <div class="ml-5">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ t('admin.totalViews') }}
              </p>
              <p class="text-lg font-medium">
                {{ stats.totalViews }}
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Recent posts -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">{{ t('admin.recentPosts') }}</h3>
        <UButton
          icon="i-heroicons-plus"
          to="/admin/blog/new"
          color="primary"
        >
          {{ t('admin.newPost') }}
        </UButton>
      </div>

      <UTable
        :rows="recentPosts"
        :columns="columns"
      >
        <template #title-data="{ row }">
          <div class="flex items-center">
            <UAvatar
              :src="row.thumbnail"
              :alt="row.title"
              size="sm"
            />
            <div class="ml-4">
              <div class="font-medium">{{ row.title }}</div>
              <div class="text-sm text-gray-500">{{ row.excerpt }}</div>
            </div>
          </div>
        </template>

        <template #author-data="{ row }">
          <div class="flex items-center">
            <UAvatar
              src="~/assets/images/thanhnn16-logo-300x128.svg"
              :alt="row.author.name"
              size="sm"
            />
            <span class="ml-2">{{ row.author.name }}</span>
          </div>
        </template>

        <template #status-data="{ row }">
          <UBadge
            :color="row.status === 'published' ? 'green' : 'yellow'"
            size="sm"
          >
            {{ t(`admin.status.${row.status}`) }}
          </UBadge>
        </template>

        <template #actions-data="{ row }">
          <div class="flex items-center gap-2">
            <UButton
              icon="i-heroicons-pencil-square"
              color="primary"
              variant="ghost"
              size="xs"
              :to="`/admin/blog/${row.id}/edit`"
            />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

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

const columns = [
  {
    key: 'title',
    label: t('admin.title')
  },
  {
    key: 'author',
    label: t('admin.author')
  },
  {
    key: 'status',
    label: t('admin.status')
  },
  {
    key: 'publishedAt',
    label: t('admin.publishedAt')
  },
  {
    key: 'actions',
    label: t('admin.actions')
  }
]

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
  layout: 'admin'
})
</script>