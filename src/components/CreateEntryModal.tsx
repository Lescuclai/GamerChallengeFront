import { Alert, Box, Snackbar, TextField } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import EntryService from "../services/EntryService"
import { useAuthStore } from "../stores/authStore"
import { CustomModal } from "./CustomModal"

export interface UseFormInputs {
  title: string
  video_url: string
  user_id?: number
  challenge_id?: number
}
export const CreateEntryModal = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const currentUser = useAuthStore((state) => state.user)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const { challengeId } = useParams()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UseFormInputs>()
  const onSubmit = async (data: UseFormInputs) => {
    const payload = {
      ...data,
      challenge_id: Number(challengeId),
      user_id: currentUser?.id,
    }
    try {
      const response = await EntryService.createEntry(
        Number(challengeId),
        payload
      )
      if (!response) throw new Error("Erreur lors de l'envoi")
      setSnackbarOpen(true)
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }
  const handleClose = () => {
    reset()
    setOpen(false)
  }
  return (
    <>
      <CustomModal
        open={open}
        onSubmit={handleSubmit(onSubmit)}
        onClose={handleClose}
        title="Création de la participation"
        validationButtonText="Créer"
      >
        <Box className="flex flex-col">
          <>
            <TextField
              label="Titre"
              fullWidth
              margin="normal"
              {...register("title", {
                required: "Titre requis",
                minLength: { value: 5, message: "Minimum de 5 caractères" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Video URL"
              fullWidth
              margin="normal"
              {...register("video_url", {
                required: "URL video requise",
                pattern: {
                  value: /(www|http:|https:)+[^\s]+[\w]/,
                  message: "Format 'http(s)://' non respecté",
                },
              })}
              error={!!errors.video_url}
              helperText={errors.video_url?.message}
            />
          </>
        </Box>
      </CustomModal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Participation créée avec succès !
        </Alert>
      </Snackbar>
    </>
  )
}
