export interface User {
  id: number
  pseudo: string
  email: string
  role: "admin" | "member"
  avatar: string
}

export interface UserResponse {
  message?: string
  user: User
}

export interface LoginInfos {
  email: string
  password: string
}

export interface RegisterInfos {
  pseudo: string
  email: string
  password: string
  confirm: string
  avatar: string
}

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  isAdmin: boolean
  setUser: (user: User | null) => void
  logout: () => void
}
