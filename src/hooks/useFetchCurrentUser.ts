import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useAuthStore } from "../stores/authStore"
import AuthService from "../services/AuthService"
import type { User } from "../types/auth"

export const useFetchCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser)

  const { data: user } = useQuery<User | null, Error>({
    queryKey: ["currentUser"],
    queryFn: () => AuthService.getCurrentUser(),
    retry: false,
  })

  useEffect(() => {
    if (user) setUser(user)
  }, [user, setUser])
}
