import { useState } from "react"
import { useForm } from "react-hook-form"
import { CustomModal } from "./CustomModal"
import { RegisterForm } from "./forms/RegisterForm"
import { LoginForm } from "./forms/LoginForm"
import { useAuth } from "../hooks/useAuth"
import { useAuthStore } from "../stores/authStore"
import { Button } from "@mui/material"
import type {
  LoginInfos,
  RegisterInfos,
  AuthModalProps,
  FormType,
  RegisterError,
} from "../types/auth"
import type { AxiosError } from "axios"

export const AuthModal = ({ open, setOpen }: AuthModalProps) => {
  const { loginAccount, registerAccount } = useAuth()
  const setUser = useAuthStore((state) => state.setUser)

  const [currentFormType, setCurrentFormType] = useState<FormType>("login")

  const loginForm = useForm<LoginInfos>()
  const registerForm = useForm<RegisterInfos>()

  const { setError: setLoginError } = loginForm
  const { setError: setRegisterError } = registerForm

  const onSubmitLogin = async (data: LoginInfos) => {
    try {
      const res = await loginAccount(data)
      setUser(res.user)
      onClose()
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      setLoginError("email", {
        type: "manual",
        message: axiosError.response?.data?.message,
      })
      setLoginError("password", {
        type: "manual",
        message: axiosError.response?.data?.message,
      })
    }
  }

  const onSubmitRegister = async (data: RegisterInfos) => {
    try {
      const res = await registerAccount(data)
      setUser(res.user)
      onClose()
    } catch (error) {
      const axiosError = error as AxiosError<RegisterError>
      const apiErrors = axiosError.response?.data.errors
      console.log(apiErrors)
      if (apiErrors) {
        Object.entries(apiErrors).forEach(([key, message]) => {
          setRegisterError(key as "email" | "pseudo", {
            type: "manual",
            message: message as string,
          })
        })
      }
    }
  }

  const onClose = () => {
    loginForm.reset()
    registerForm.reset()
    setCurrentFormType("login")
    setOpen(false)
  }

  return (
    <CustomModal
      open={open}
      onSubmit={
        currentFormType === "login"
          ? loginForm.handleSubmit(onSubmitLogin)
          : registerForm.handleSubmit(onSubmitRegister)
      }
      onClose={onClose}
      title={currentFormType === "login" ? "Connexion" : "Création de compte"}
    >
      <div className="flex flex-col">
        {currentFormType === "login" ? (
          <LoginForm form={loginForm} />
        ) : (
          <RegisterForm form={registerForm} />
        )}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() =>
              setCurrentFormType(
                currentFormType === "login" ? "register" : "login"
              )
            }
          >
            {currentFormType === "login"
              ? "Créer un compte"
              : "Déjà un compte ?"}
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}
