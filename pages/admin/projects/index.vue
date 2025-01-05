<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">{{ t('admin.projects.title') }}</h2>
          <UButton
            icon="i-heroicons-plus"
            to="/admin/projects/new"
            color="primary"
          >
            {{ t('admin.projects.add') }}
          </UButton>
        </div>
      </template>

      <UTable
        :rows="projects"
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
              <div class="text-sm text-gray-500">{{ row.description }}</div>
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
              :to="`/admin/projects/${row.id}/edit`"
            />
            <UButton
              icon="i-heroicons-eye"
              color="gray"
              variant="ghost"
              size="xs"
              :to="`/projects/${row.slug}`"
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

interface Project {
  id: number
  title: string
  slug: string
  thumbnail: string | null
  description: string
  status: string
  authorId: number
  createdAt: Date
  updatedAt: Date
  category: string
  technologies: string
  sourceUrl: string | null
  demoUrl: string | null
}

const loading = ref(false)
const projects = ref<Project[]>([])

const columns = [
  {
    key: 'title',
    label: t('admin.projects.table.title')
  },
  {
    key: 'category',
    label: t('admin.projects.table.category')
  },
  {
    key: 'status',
    label: t('admin.projects.table.status')
  },
  {
    key: 'createdAt',
    label: t('admin.projects.table.createdAt'),
    formatter: (date: Date) => new Date(date).toLocaleDateString('vi-VN')
  },
  {
    key: 'actions',
    label: t('admin.projects.table.actions')
  }
]

// Fetch projects
const fetchProjects = async () => {
  loading.value = true
  try {
    const response = await $fetch<Project[]>('/api/admin/projects')
    projects.value = response
  } catch (error) {
    console.error('Error fetching projects:', error)
  } finally {
    loading.value = false
  }
}

// Delete project
const handleDelete = async (id: string) => {
  try {
    await $fetch(`/api/admin/projects/${id}`, {
      method: 'DELETE'
    })
    await fetchProjects()
  } catch (error) {
    console.error('Error deleting project:', error)
  }
}

onMounted(() => {
  fetchProjects()
})

definePageMeta({
  layout: 'admin'
})
</script> 