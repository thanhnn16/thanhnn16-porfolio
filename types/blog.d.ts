export interface User {
  id: number
  email: string
  name: string
  avatar: string | null
}

export interface Tag {
  id: number
  name: string
  slug: string
  description: string | null
}

export interface Comment {
  id: number
  content: string
  name: string
  email: string
  website: string | null
  status: 'PENDING' | 'APPROVED' | 'SPAM'
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: number
  slug: string
  title: string
  content: string
  excerpt: string
  thumbnail: string
  views: number
  status: 'DRAFT' | 'PUBLISHED'
  featured: boolean
  seoTitle: string | null
  seoDesc: string | null
  tags: string[]
  publishedAt: string | null
  author: User
  createdAt: string
  updatedAt: string
}

export interface BlogResponse {
  posts: Post[]
}

export interface PostResponse {
  post: Post
} 