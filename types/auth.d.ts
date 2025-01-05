import type { Ref } from 'vue'

interface AuthUser {
  id: number
  email: string
  name: string | null
  avatar: string | null
  role: string
}

declare module '#auth-utils' {
  interface User extends AuthUser { }

  interface UserSession {
    user?: User
    loggedInAt?: number
  }

  interface SecureSessionData {
    apiToken?: string
  }
}

export type { AuthUser } 