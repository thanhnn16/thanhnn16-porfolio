import { defineStore } from 'pinia'
import type { User, Post, BlogResponse, PostResponse } from '~/types/blog'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as Post[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchPosts() {
      this.loading = true
      this.error = null
      
      try {
        const data = await $fetch<BlogResponse>('/api/blog/posts')
        this.posts = data.posts
      } catch (err) {
        console.error('Error fetching posts:', err)
        this.error = 'Failed to load blog posts'
      } finally {
        this.loading = false
      }
    },

    async fetchPostBySlug(slug: string) {
      try {
        const data = await $fetch<PostResponse>(`/api/blog/posts/${slug}`)
        return data.post
      } catch (err) {
        console.error('Error fetching post:', err)
        throw new Error('Failed to load blog post')
      }
    }
  }
})

// Composable wrapper
export const useBlog = () => {
  const store = useBlogStore()
  
  // Load posts on first use
  onMounted(() => {
    if (store.posts.length === 0) {
      store.fetchPosts()
    }
  })

  return {
    posts: computed(() => store.posts),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    fetchPostBySlug: store.fetchPostBySlug
  }
}