import type { User } from "./auth"
import type { Game } from "./games"

export interface Challenge {
  title: string
  description: string
  created_at: string
  challenge_id: string
  game: Game
  user: User
  _count: {
    challengeVoters: number
  }
}
export interface PaginationChallenge {
  challenges: Challenge[]
  nbPages: number
}
