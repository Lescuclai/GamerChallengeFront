import { useMutation } from "@tanstack/react-query"
import type { LoginInfos, RegisterInfos } from "../types/auth"
import AuthService from "../services/AuthService"

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
    return loginAccountMutation.mutateAsync(credentials)
  }

  const registerAccount = async (registerInfos: RegisterInfos) => {
    return registerAccountMutation.mutateAsync(registerInfos)
  }

  const logoutAccount = async () => {
    return logoutAccountMutation.mutateAsync()
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
