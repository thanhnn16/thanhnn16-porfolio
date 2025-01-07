export interface Project {
  id: number
  title: string
  slug: string
  description: string
  category: string
  technologies: string[]
  sourceUrl?: string | null
  demoUrl?: string | null
  thumbnail?: string | null
  images?: string[]
  featured: boolean
  status: string
  startDate?: Date | null
  endDate?: Date | null
  views: number
  order: number
  authorId: number
  createdAt: Date
  updatedAt: Date
}

export interface PaginatedResponse {
  projects: Project[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ProjectCardProps {
  title: string
  description: string
  thumbnail?: string
  technologies: string[]
  sourceUrl?: string
  slug: string
} 