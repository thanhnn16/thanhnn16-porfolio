export interface Author {
  id: number
  name: string
  avatar: string
}

export interface Post {
  id: number
  slug: string
  title: string
  content: string
  excerpt: string
  thumbnail: string
  tags: string[]
  publishedAt: string
  author: Author
}

export interface BlogResponse {
  posts: Post[]
}

export interface PostResponse {
  post: Post
} 