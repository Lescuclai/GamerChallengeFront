import type { Entry } from "../types/entry"
import { handleAxiosError } from "../utils/handleAxiosError"
import axiosClient from "./axiosClient"
import BaseService from "./BaseService"

export default class EntryService extends BaseService<Entry> {
  constructor() {
    super("/entries")
  }
  async getEntryMostLikedEntry(): Promise<Entry[]> {
    const res = await handleAxiosError(() =>
      axiosClient.get(`${this.endpoint}/most-liked`)
    )
    return res.data.data
  }
}
