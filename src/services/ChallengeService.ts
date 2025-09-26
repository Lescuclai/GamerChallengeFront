import type {
  Challenge,
  PaginationChallenge,
  ChallengeDetails,
} from "../types/challenge"
import { handleAxiosError } from "../utils/handleAxiosError"
import axiosClient from "./axiosClient"
import BaseService from "./BaseService"

class ChallengeService extends BaseService<Challenge> {
  constructor() {
    super("/challenges")
  }
  async getNewest(): Promise<Challenge[]> {
    const res = await handleAxiosError(() =>
      axiosClient.get(`${this.endpoint}/newest`)
    )
    return res.data.data
  }
  async getMostLikedChallenges(): Promise<Challenge[]> {
    const res = await handleAxiosError(() =>
      axiosClient.get(`${this.endpoint}/most-liked`)
    )
    return res.data.data
  }
  async getChallenges(page: number): Promise<PaginationChallenge> {
    const res = await handleAxiosError(() =>
      axiosClient.get(`${this.endpoint}?page=${page}`)
    )
    return res.data
  }
  async getChallenge(id: number): Promise<ChallengeDetails> {
    const res = await handleAxiosError(() =>
      axiosClient.get(`${this.endpoint}/${id}`)
    )
    return res.data
  }
}
export default new ChallengeService()
