export interface Project {
  id: number
  title: string
  slug: string
  description: string
  category: string
  technologies: string[]
  sourceUrl?: string
  demoUrl?: string
  thumbnail?: string
  images?: string[]
  featured?: boolean
  status?: string
  startDate?: Date
  endDate?: Date
  views?: number
  order?: number
  authorId?: number
  createdAt?: Date
  updatedAt?: Date
  // Frontend-specific fields
  image?: string
  link?: string
  github?: string
} 