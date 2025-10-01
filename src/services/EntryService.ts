import type {
  Entry,
  AuthenticatedUserEntry,
  EntryVoteResponse,
} from "../types/entry"
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
  ): Promise<AuthenticatedUserEntry> {
    const res = await handleAxiosError(() =>
      axiosClient.get(`${this.endpoint}/${id}`)
    )
    return res.data
  }
  async createEntry(
    challengeId: number,
    payload: Partial<Entry>
  ): Promise<Entry> {
    const res = await handleAxiosError(() =>
      axiosClient.post<Entry>(`${this.endpoint}/${challengeId}`, payload)
    )
    return res.data
  }
  async toggleEntryVote(entryId: number): Promise<EntryVoteResponse> {
    const res = await handleAxiosError(() =>
      axiosClient.post<EntryVoteResponse>(`${this.endpoint}/${entryId}/vote`)
    )
    return res.data
  }
}
export default new EntryService()
