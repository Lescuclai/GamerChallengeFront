import axiosClient from "./axiosClient"

export default class BaseService<T> {
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  async getAll(): Promise<T[]> {
    const { data } = await axiosClient.get(this.endpoint)
    return data
  }

  async getById(id: number): Promise<T> {
    const { data } = await axiosClient.get(`${this.endpoint}/${id}`)
    return data
  }

  async create(payload: Partial<T>): Promise<T> {
    const { data } = await axiosClient.post(this.endpoint, payload)
    return data
  }

  async update(id: number, payload: Partial<T>): Promise<T> {
    const { data } = await axiosClient.patch(`${this.endpoint}/${id}`, payload)
    return data
  }

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`${this.endpoint}/${id}`)
  }
}
