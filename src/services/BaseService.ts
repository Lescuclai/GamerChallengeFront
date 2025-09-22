import axiosClient from "./axiosClient"
import { handleAxiosError } from "../utils/handleAxiosError"

export default class BaseService<T> {
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  async getAll(): Promise<T[]> {
    const res = await handleAxiosError(() =>
      axiosClient.get<T[]>(this.endpoint)
    )
    return res.data
  }

  async getById(id: number): Promise<T> {
    const res = await handleAxiosError(() =>
      axiosClient.get<T>(`${this.endpoint}/${id}`)
    )
    return res.data
  }

  async create(payload: Partial<T>): Promise<T> {
    const res = await handleAxiosError(() =>
      axiosClient.post<T>(this.endpoint, payload)
    )
    return res.data
  }

  async update(id: number, payload: Partial<T>): Promise<T> {
    const res = await handleAxiosError(() =>
      axiosClient.patch<T>(`${this.endpoint}/${id}`, payload)
    )
    return res.data
  }

  async delete(id: number): Promise<void> {
    await handleAxiosError(() => axiosClient.delete(`${this.endpoint}/${id}`))
  }
}
