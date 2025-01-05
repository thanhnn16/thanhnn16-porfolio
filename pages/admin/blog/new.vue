<template>
    <div class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ t('admin.blog.new') }}
                    </h1>
                    <p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        {{ t('admin.blog.newDescription') }}
                    </p>
                </div>
            </div>

            <form @submit.prevent="handleSubmit" class="mt-8 space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
                <div class="space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
                    <div>
                        <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                            <!-- Title -->
                            <div class="sm:col-span-4">
                                <label for="title"
                                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    {{ t('admin.blog.form.title') }}
                                </label>
                                <div class="mt-2">
                                    <input id="title" v-model="form.title" type="text" name="title"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-400 sm:text-sm sm:leading-6 bg-white dark:bg-gray-900"
                                        :placeholder="t('admin.blog.form.titlePlaceholder')" />
                                </div>
                            </div>

                            <!-- Slug -->
                            <div class="sm:col-span-4">
                                <label for="slug"
                                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    {{ t('admin.blog.form.slug') }}
                                </label>
                                <div class="mt-2">
                                    <input id="slug" v-model="form.slug" type="text" name="slug"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-400 sm:text-sm sm:leading-6 bg-white dark:bg-gray-900"
                                        :placeholder="t('admin.blog.form.slugPlaceholder')" />
                                </div>
                            </div>

                            <!-- Description -->
                            <div class="sm:col-span-6">
                                <label for="description"
                                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    {{ t('admin.blog.form.description') }}
                                </label>
                                <div class="mt-2">
                                    <textarea id="description" v-model="form.description" name="description" rows="3"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-400 sm:text-sm sm:leading-6 bg-white dark:bg-gray-900"
                                        :placeholder="t('admin.blog.form.descriptionPlaceholder')" />
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="sm:col-span-6">
                                <label for="content"
                                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    {{ t('admin.blog.form.content') }}
                                </label>
                                <div class="mt-2">
                                    <editor-content :editor="editor" class="prose dark:prose-invert max-w-none" />
                                </div>
                            </div>

                            <!-- Image -->
                            <div class="sm:col-span-6">
                                <label for="image"
                                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    {{ t('admin.blog.form.featuredImage') }}
                                </label>
                                <div class="mt-2 flex items-center gap-x-3">
                                    <input type="file" accept="image/*" @change="handleImageUpload" class="block w-full text-sm text-gray-900 dark:text-white
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-600 file:text-white
                    hover:file:bg-primary-700
                    file:disabled:opacity-50 file:disabled:pointer-events-none
                    dark:file:bg-primary-500
                    dark:hover:file:bg-primary-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pt-5">
                    <div class="flex justify-end gap-x-3">
                        <button type="button"
                            class="rounded-md bg-white dark:bg-gray-900 py-2 px-3 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            @click="router.back()">
                            {{ t('admin.common.cancel') }}
                        </button>
                        <button type="submit"
                            class="inline-flex justify-center rounded-md bg-primary-600 dark:bg-primary-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 dark:hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            :disabled="loading">
                            {{ t('admin.common.save') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
definePageMeta({
    layout: 'admin'
})
const { t } = useI18n()
const router = useRouter()

const loading = ref(false)
const form = reactive({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: null as File | null
})

const editor = useEditor({
    content: form.content,
    extensions: [
        StarterKit,
        Image,
        Link.configure({
            openOnClick: false
        }),
        Typography,
        Placeholder.configure({
            placeholder: t('admin.blog.form.contentPlaceholder')
        })
    ],
    onUpdate: ({ editor }) => {
        form.content = editor.getHTML()
    }
})

const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        form.image = target.files[0]
    }
}

const handleSubmit = async () => {
    try {
        loading.value = true
        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('slug', form.slug)
        formData.append('description', form.description)
        formData.append('content', form.content)
        if (form.image) {
            formData.append('image', form.image)
        }

        await $fetch('/api/blog', {
            method: 'POST',
            body: formData
        })

        await router.push('/admin/blog')
    } catch (error) {
        console.error('Error creating post:', error)
    } finally {
        loading.value = false
    }
}
</script>