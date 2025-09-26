import { handleAxiosError } from "../utils/handleAxiosError"
import axiosClient from "./axiosClient"

export interface Game {
  id: number
  title: string
  image_url: string
}

class GameService {
  async getAllGames(): Promise<Game[]> {
    const res = await handleAxiosError(() =>
      axiosClient.get<{ data: Game[] }>("/games")
    )
    return res.data.data
  }
}
export default new GameService()
