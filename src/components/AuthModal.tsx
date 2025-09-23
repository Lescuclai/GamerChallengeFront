import { useState } from "react"
import { useForm } from "react-hook-form"
import { CustomModal } from "./CustomModal"
import { RegisterForm } from "./forms/RegisterForm"
import { LoginForm } from "./forms/LoginForm"
import { Button } from "@mui/material"
import type { LoginFormType } from "./forms/LoginForm"
import type { RegisterFormType } from "./forms/RegisterForm"

type AuthModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
}

type FormType = "login" | "register"

export const AuthModal = ({ open, setOpen }: AuthModalProps) => {
  const [currentFormType, setCurrentFormType] = useState<FormType>("login")

  const loginForm = useForm<LoginFormType>()
  const registerForm = useForm<RegisterFormType>()

  const onSubmitLogin = (data: LoginFormType) => {
    // Hook useAuth pour login
    console.log(data)

    // Si pas d'erreurs
    setOpen(false)
    // Sinon on affiche un message d'erreur
  }
  const onSubmitRegister = (data: LoginFormType) => {
    // Hook useAuth pour register
    console.log(data)

    // Si pas d'erreurs
    setOpen(false)
    // Sinon on affiche un message d'erreur
  }

  const onClose = () => {
    loginForm.reset()
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
      {currentFormType === "login" ? (
        <>
          <LoginForm form={loginForm} />
          <Button
            type="button"
            onClick={() => setCurrentFormType("register")}
            style={{ cursor: "pointer" }}
          >
            Créer un compte
          </Button>
        </>
      ) : (
        <>
          <RegisterForm form={registerForm} />
          <Button
            type="button"
            onClick={() => setCurrentFormType("login")}
            style={{ cursor: "pointer" }}
          >
            Déjà un compte ?
          </Button>
        </>
      )}
    </CustomModal>
  )
}
