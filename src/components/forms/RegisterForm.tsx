import { TextField } from "@mui/material"
import type { UseFormReturn } from "react-hook-form"

export interface RegisterFormType {
  avatar: string
  email: string
  pseudo: string
  password: string
  confirmPassword: string
}

type RegisterFormProps = {
  form: UseFormReturn<RegisterFormType>
}

export const RegisterForm = ({ form }: RegisterFormProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = form

  const password = watch("password")

  return (
    <>
      <TextField
        label="Avatar URL"
        type="url"
        fullWidth
        margin="normal"
        {...register("avatar", {
          required: "Avatar requis",
        })}
        error={!!errors.avatar}
        helperText={errors.avatar?.message}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email requis",
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Pseudo"
        type="text"
        fullWidth
        margin="normal"
        {...register("pseudo", { required: "Pseudo requis" })}
        error={!!errors.pseudo}
        helperText={errors.pseudo?.message}
      />
      <TextField
        label="Mot de passe"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", {
          required: "Mot de passe requis",
          minLength: { value: 12, message: "Minimum 12 caractères" },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        label="Confirmer le mot de passe"
        type="password"
        fullWidth
        margin="normal"
        {...register("confirmPassword", {
          required: "Confirmation requise",
          validate: (value) =>
            value === password || "Les mots de passe ne correspondent pas",
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
    </>
  )
}
