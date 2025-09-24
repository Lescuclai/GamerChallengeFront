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

  const loginAccount = async (credentials: LoginInfos) => {
    return loginAccountMutation.mutateAsync(credentials)
  }

  const registerAccount = async (registerInfos: RegisterInfos) => {
    return registerAccountMutation.mutateAsync(registerInfos)
  }

  return {
    loginAccount,
    registerAccount,
    loginAccountMutation,
    registerAccountMutation,
  }
}
