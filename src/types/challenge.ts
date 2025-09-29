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
  memberChallenges?: Challenge[]
  challenges: Challenge[]
  nbPages: number
}
<<<<<<< HEAD

export interface ChallengeDetails {
  challenge: Omit<Challenge, "_count"> & { rules: string }
=======
export interface ChallengeInfos {
  title: string
  description: string
  rules: string
  game_title: string
>>>>>>> 233ede4 (fix: refactor feature challenge modal  and fix bugs)
}
