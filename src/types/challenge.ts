import type { User } from "./auth"
import type { Game } from "./games"

export interface Challenge {
  title: string
  created_at: string
  challenge_id: number
  game: Game
  user: User
  _count: {
    challengeVoters: number
  }
}
