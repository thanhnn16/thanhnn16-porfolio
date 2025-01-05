<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">{{ isEdit ? t('admin.blog.edit') : t('admin.blog.add') }}</h2>
          <UButton
            icon="i-heroicons-arrow-left"
            to="/admin/blog"
            color="gray"
            variant="ghost"
          >
            {{ t('admin.common.back') }}
          </UButton>
        </div>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Title -->
        <UFormGroup :label="t('admin.blog.form.title')" required>
          <UInput
            v-model="form.title"
            :placeholder="t('admin.blog.form.titlePlaceholder')"
            required
          />
        </UFormGroup>

        <!-- Slug -->
        <UFormGroup :label="t('admin.blog.form.slug')" required>
          <UInput
            v-model="form.slug"
            :placeholder="t('admin.blog.form.slugPlaceholder')"
            required
          />
        </UFormGroup>

        <!-- Description -->
        <UFormGroup :label="t('admin.blog.form.description')" required>
          <UTextarea
            v-model="form.description"
            :placeholder="t('admin.blog.form.descriptionPlaceholder')"
            required
            :rows="3"
          />
        </UFormGroup>

        <!-- Content -->
        <UFormGroup :label="t('admin.blog.form.content')" required>
          <ClientOnly>
            <MDEditor
              v-model="form.content"
              preview-theme="github"
              :height="500"
            />
          </ClientOnly>
        </UFormGroup>

        <!-- Category -->
        <UFormGroup :label="t('admin.blog.form.category')" required>
          <USelect
            v-model="form.category"
            :options="categories"
            required
          />
        </UFormGroup>

        <!-- Tags -->
        <UFormGroup :label="t('admin.blog.form.tags')">
          <USelect
            v-model="form.tags"
            :options="tags"
            multiple
            searchable
            create
          />
        </UFormGroup>

        <!-- Featured Image -->
        <UFormGroup :label="t('admin.blog.form.featuredImage')">
          <UInput
            v-model="form.featuredImage"
            :placeholder="t('admin.blog.form.featuredImage')"
            type="url"
          />
        </UFormGroup>

        <!-- Status -->
        <UFormGroup :label="t('admin.blog.form.status')" required>
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
            {{ isEdit ? t('admin.common.save') : t('admin.blog.add') }}
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

interface Post {
  title: string
  slug: string
  description: string
  content: string
  category: string
  tags: string[]
  featuredImage: string
  status: string
}

const form = ref<Post>({
  title: '',
  slug: '',
  description: '',
  content: '',
  category: '',
  tags: [],
  featuredImage: '',
  status: 'draft'
})

const categories = [
  { label: t('admin.blog.categories.programming'), value: 'programming' },
  { label: t('admin.blog.categories.technology'), value: 'technology' },
  { label: t('admin.blog.categories.lifestyle'), value: 'lifestyle' },
  { label: t('admin.blog.categories.other'), value: 'other' }
]

const tags = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Vue.js', value: 'vuejs' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'nodejs' }
]

const statuses = [
  { label: t('admin.common.status.draft'), value: 'draft' },
  { label: t('admin.common.status.published'), value: 'published' }
]

// Generate slug from title
watch(() => form.value.title, (newTitle) => {
  if (!isEdit.value) {
    form.value.slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
})

// Fetch post if editing
const fetchPost = async () => {
  if (!isEdit.value) return
  
  loading.value = true
  try {
    const response = await $fetch<Post>(`/api/admin/blog/${route.params.id}`)
    form.value = response
  } catch (error) {
    console.error('Error fetching post:', error)
  } finally {
    loading.value = false
  }
}

// Submit form
const handleSubmit = async () => {
  loading.value = true
  try {
    if (isEdit.value) {
      await $fetch(`/api/admin/blog/${route.params.id}`, {
        method: 'PUT',
        body: form.value
      })
    } else {
      await $fetch('/api/admin/blog', {
        method: 'POST',
        body: form.value
      })
    }
    router.push('/admin/blog')
  } catch (error) {
    console.error('Error saving post:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPost()
})
</script> 