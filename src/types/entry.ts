import type { User } from "./auth"

export interface Entry {
  entry_id: number
  title: string
  video_url: string
  user: User
  _count: {
    entryVoters: number
  }
}
export interface AuthenticatedUserEntry {
  memberEntries?: Omit<Entry, "_count">[] | []
  entries: Omit<Entry, "_count">[] | []
}
