import { useMutation } from "@tanstack/react-query"
import type { LoginInfos, RegisterInfos } from "../types/auth"
import AuthService from "../services/AuthService"
import { queryClient } from "../main"

export const useAuth = () => {
  const loginAccountMutation = useMutation({
    mutationFn: (credentials: LoginInfos) => AuthService.login(credentials),
  })

  const registerAccountMutation = useMutation({
    mutationFn: (registerInfos: RegisterInfos) =>
      AuthService.register(registerInfos),
  })

  const logoutAccountMutation = useMutation({
    mutationFn: () => AuthService.logout(),
  })

  const deleteAccountMutation = useMutation({
    mutationFn: (userId: number) => AuthService.softDeleteUser(userId),
  })

  const loginAccount = async (credentials: LoginInfos) => {
    const logIn = loginAccountMutation.mutateAsync(credentials)
    queryClient.invalidateQueries() // Clear all cached queries
    return logIn
  }

  const registerAccount = async (registerInfos: RegisterInfos) => {
    const register = registerAccountMutation.mutateAsync(registerInfos)
    queryClient.invalidateQueries() // Clear all cached queries
    return register
  }

  const logoutAccount = async () => {
    const logout = logoutAccountMutation.mutateAsync()
    queryClient.invalidateQueries() // Clear all cached queries
    return logout
  }

  const deleteAccount = async (userId: number) => {
    return deleteAccountMutation.mutateAsync(userId)
  }

  return {
    loginAccount,
    registerAccount,
    logoutAccount,
    deleteAccount,
    loginAccountMutation,
    registerAccountMutation,
    logoutAccountMutation,
    deleteAccountMutation,
  }
}
