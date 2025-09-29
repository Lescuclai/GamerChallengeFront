import BaseService from "./BaseService"
import axiosClient from "./axiosClient"
import { handleAxiosError } from "../utils/handleAxiosError"
import type {
  LoginInfos,
  UserResponse,
  User,
  RegisterInfos,
} from "../types/auth"
import { queryClient } from "../main"

class AuthService extends BaseService<User> {
  constructor() {
    super("/auth")
  }

  async login(credentials: LoginInfos): Promise<UserResponse> {
    const res = await handleAxiosError(() =>
      axiosClient.post<UserResponse>(`${this.endpoint}/login`, credentials)
    )
    queryClient.invalidateQueries({ queryKey: ["challengesList"] }) //vide le cache de reactquery afin de synchroniser les données pour la pagination
    return res.data
  }

  async logout(): Promise<void> {
    await handleAxiosError(() => axiosClient.post(`${this.endpoint}/logout`))
    queryClient.invalidateQueries({ queryKey: ["challengesList"] }) //vide le cache de reactquery afin de synchroniser les données pour la pagination
  }

  async register(registerInfos: RegisterInfos): Promise<UserResponse> {
    const res = await handleAxiosError(() =>
      axiosClient.post<UserResponse>(`${this.endpoint}/register`, registerInfos)
    )
    return res.data
  }

  async getCurrentUser(): Promise<User> {
    const res = await handleAxiosError(() =>
      axiosClient.get<UserResponse>(`${this.endpoint}/me`)
    )
    return res.data.user
  }

  async softDeleteUser(userId: number): Promise<void> {
    await handleAxiosError(() =>
      axiosClient.patch(`${this.endpoint}/delete/${userId}`)
    )
  }
}

export default new AuthService()
