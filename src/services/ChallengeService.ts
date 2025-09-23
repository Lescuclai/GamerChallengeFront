import type { Challenge } from "../types/challenge"
import { handleAxiosError } from "../utils/handleAxiosError"
import axiosClient from "./axiosClient"
import BaseService from "./BaseService"

export default class ChallengeService extends BaseService<Challenge> {
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
}
