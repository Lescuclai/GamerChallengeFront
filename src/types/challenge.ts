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

export interface ChallengeInfos {
  title: string
  description: string
  rules: string
  game_title: string
}

export interface ChallengeDetails {
  challenge: Omit<Challenge, "_count"> & { rules: string }
}
