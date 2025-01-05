<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">{{ t('admin.blog.title') }}</h2>
          <UButton
            icon="i-heroicons-plus"
            to="/admin/blog/new"
            color="primary"
          >
            {{ t('admin.blog.add') }}
          </UButton>
        </div>
      </template>

      <UTable
        :rows="posts"
        :columns="columns"
        :loading="loading"
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

        <template #category-data="{ row }">
          <UBadge
            color="gray"
            size="sm"
          >
            {{ row.category }}
          </UBadge>
        </template>

        <template #status-data="{ row }">
          <UBadge
            :color="row.status === 'published' ? 'green' : 'yellow'"
            size="sm"
          >
            {{ t(`admin.common.status.${row.status}`) }}
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
            <UButton
              icon="i-heroicons-eye"
              color="gray"
              variant="ghost"
              size="xs"
              :to="`/blog/${row.slug}`"
              target="_blank"
            />
            <UButton
              icon="i-heroicons-trash"
              color="red"
              variant="ghost"
              size="xs"
              @click="handleDelete(row.id)"
            />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

interface Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  thumbnail: string
  category: string
  status: string
  createdAt: Date
  updatedAt: Date
  tags: Array<{
    id: number
    name: string
    slug: string
    createdAt: Date
    updatedAt: Date
  }>
}

const loading = ref(false)
const posts = ref<Post[]>([])

const columns = [
  {
    key: 'title',
    label: t('admin.blog.table.title')
  },
  {
    key: 'category',
    label: t('admin.blog.table.category')
  },
  {
    key: 'status',
    label: t('admin.blog.table.status')
  },
  {
    key: 'createdAt',
    label: t('admin.blog.table.createdAt'),
    formatter: (date: Date) => new Date(date).toLocaleDateString('vi-VN')
  },
  {
    key: 'actions',
    label: t('admin.blog.table.actions')
  }
]

// Fetch blog posts
const fetchPosts = async () => {
  loading.value = true
  try {
    const response = await $fetch<Post[]>('/api/admin/blog')
    posts.value = response
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  } finally {
    loading.value = false
  }
}

// Delete blog post
const handleDelete = async (id: string) => {
  try {
    await $fetch(`/api/admin/blog/${id}`, {
      method: 'DELETE'
    })
    await fetchPosts()
  } catch (error) {
    console.error('Error deleting blog post:', error)
  }
}

onMounted(() => {
  fetchPosts()
})

definePageMeta({
  layout: 'admin'
})
</script> 