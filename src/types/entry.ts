import type { User } from "./auth"

export interface Entry {
  entry_id: number
  title: string
  video_url: string
  user: User
  _count: {
    votes: number
  }
}
