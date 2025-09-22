import { create } from "zustand"
import type { AuthState } from "../types/auth"

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isAdmin: false,

  setUser: (user) =>
    set({
      user,
      isLoggedIn: !!user,
      isAdmin: user?.role === "admin",
    }),

  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
      isAdmin: false,
    }),
}))
