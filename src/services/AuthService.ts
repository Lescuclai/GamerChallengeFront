import BaseService from "./BaseService"
import axiosClient from "./axiosClient"

interface User {
  id: number
  pseudo: string
  email: string
  role: string
  avatar: string
}

interface UserResponse {
  message?: string
  user: User
}

interface LoginInfos {
  email: string
  password: string
}

interface RegisterInfos {
  pseudo: string
  email: string
  password: string
  confirm: string
  avatar: string
}

class AuthService extends BaseService<User> {
  constructor() {
    super("/auth")
  }

  async login(credentials: LoginInfos) {
    const { data } = await axiosClient.post<UserResponse>(
      `${this.endpoint}/login`,
      credentials
    )

    return data
  }

  async logout(): Promise<void> {
    await axiosClient.post(`${this.endpoint}/logout`, { withCredentials: true })

    // TODO : Empty zustand store
  }

  async register(registerInfos: RegisterInfos) {
    const { data } = await axiosClient.post<UserResponse>(
      `${this.endpoint}/register`,
      registerInfos
    )

    return data
  }

  async getCurrentUser(): Promise<User> {
    const { data } = await axiosClient.get<UserResponse>(`${this.endpoint}/me`)
    return data.user
  }

  async softDeleteUser(userId: number): Promise<void> {
    await axiosClient.patch(`${this.endpoint}/delete/${userId}`, null)

    // TODO : Empty zustand store
  }
}

export default new AuthService()
