export interface TimelineItem {
  id: number
  year: string
  title: string
  institution: string
  description: string
}

export interface Skill {
  name: string
  icon: string
  level: number
}

export interface NavItem {
  name: string
  path: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface Language {
  code: 'en' | 'vi'
  flag: string
}

export interface Project {
  id: string
  title: string
  description: string
  category: 'web' | 'mobile' | 'design' | 'zalo'
  image: string
  technologies: string[]
  links?: {
    github?: string
    live?: string
    preview?: string
  }
  featured?: boolean
}

export interface PersonalInfo {
  name: string
  role: string
  email: string
  phone: string
  location: string
  birthDate: string
}

export interface HeroSection {
  title: string
  subtitle: string
  viewWork: string
  contactMe: string
}

export interface AboutSection {
  title: string
  description: string
  greeting: string
  introduction: string
  downloadCV: string
  contactMe: string
  journey: string
  skillsAndTech: string
  interestingFacts: string
  numerology: {
    title: string
    lifePathNumber: string
    destinyNumber: string
    soulUrgeNumber: string
  }
  languages: {
    title: string
    vietnamese: string
    english: string
    japanese: string
    native: string
    advanced: string
  }
  hobbies: {
    title: string
    coding: string
    reading: string
    gaming: string
    traveling: string
  }
  funFacts: {
    title: string
    fact1: string
    fact2: string
    fact3: string
    fact4: string
  }
} 