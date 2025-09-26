import type { Entry } from "../types/entry"
import { handleAxiosError } from "../utils/handleAxiosError"
import axiosClient from "./axiosClient"
import BaseService from "./BaseService"

class EntryService extends BaseService<Entry> {
  constructor() {
    super("/entries")
  }
  async getEntryMostLikedEntry(): Promise<Entry[]> {
    const res = await handleAxiosError(() =>
      axiosClient.get(`${this.endpoint}/most-liked`)
    )
    return res.data.data
  }
  async getAllEntriesForUniqueChallenge(
    id: number
  ): Promise<Omit<Entry, "_count">[]> {
    const res = await handleAxiosError(() =>
      axiosClient.get(`${this.endpoint}/${id}`)
    )
    return res.data.data
  }
}
export default new EntryService()
