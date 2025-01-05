<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">{{ isEdit ? t('admin.projects.edit') : t('admin.projects.add') }}</h2>
          <UButton
            icon="i-heroicons-arrow-left"
            to="/admin/projects"
            color="gray"
            variant="ghost"
          >
            {{ t('admin.common.back') }}
          </UButton>
        </div>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Title -->
        <UFormGroup :label="t('admin.projects.form.title')" required>
          <UInput
            v-model="form.title"
            :placeholder="t('admin.projects.form.title')"
            required
          />
        </UFormGroup>

        <!-- Description -->
        <UFormGroup :label="t('admin.projects.form.description')" required>
          <UTextarea
            v-model="form.description"
            :placeholder="t('admin.projects.form.description')"
            required
            :rows="4"
          />
        </UFormGroup>

        <!-- Category -->
        <UFormGroup :label="t('admin.projects.form.category')" required>
          <USelect
            v-model="form.category"
            :options="categories"
            required
          />
        </UFormGroup>

        <!-- Technologies -->
        <UFormGroup :label="t('admin.projects.form.technologies')">
          <USelect
            v-model="form.technologies"
            :options="technologies"
            multiple
            searchable
            create
          />
        </UFormGroup>

        <!-- Source Code URL -->
        <UFormGroup :label="t('admin.projects.form.sourceUrl')">
          <UInput
            v-model="form.sourceUrl"
            placeholder="https://github.com/username/repo"
            type="url"
          />
        </UFormGroup>

        <!-- Demo URL -->
        <UFormGroup :label="t('admin.projects.form.demoUrl')">
          <UInput
            v-model="form.demoUrl"
            placeholder="https://example.com"
            type="url"
          />
        </UFormGroup>

        <!-- Status -->
        <UFormGroup :label="t('admin.projects.form.status')" required>
          <USelect
            v-model="form.status"
            :options="statuses"
            required
          />
        </UFormGroup>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <UButton
            type="submit"
            color="primary"
            :loading="loading"
          >
            {{ isEdit ? t('admin.common.save') : t('admin.projects.add') }}
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.params.id !== 'create')
const loading = ref(false)

interface Project {
  title: string
  description: string
  category: string
  technologies: string[]
  sourceUrl: string
  demoUrl: string
  status: string
}

const form = ref<Project>({
  title: '',
  description: '',
  category: '',
  technologies: [],
  sourceUrl: '',
  demoUrl: '',
  status: 'draft'
})

const categories = [
  { label: t('projects.categories.web'), value: 'web' },
  { label: t('projects.categories.mobile'), value: 'mobile' },
  { label: t('projects.categories.design'), value: 'design' },
  { label: t('projects.categories.zalo'), value: 'zalo' }
]

const technologies = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' }
]

const statuses = [
  { label: t('admin.common.status.draft'), value: 'draft' },
  { label: t('admin.common.status.published'), value: 'published' },
  { label: t('admin.common.status.archived'), value: 'archived' }
]

// Fetch project if editing
const fetchProject = async () => {
  if (!isEdit.value) return
  
  loading.value = true
  try {
    const response = await $fetch<Project>(`/api/admin/projects/${route.params.id}`)
    form.value = response
  } catch (error) {
    console.error('Error fetching project:', error)
  } finally {
    loading.value = false
  }
}

// Submit form
const handleSubmit = async () => {
  loading.value = true
  try {
    if (isEdit.value) {
      await $fetch(`/api/admin/projects/${route.params.id}`, {
        method: 'PUT',
        body: form.value
      })
    } else {
      await $fetch('/api/admin/projects', {
        method: 'POST',
        body: form.value
      })
    }
    router.push('/admin/projects')
  } catch (error) {
    console.error('Error saving project:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProject()
})
</script> 