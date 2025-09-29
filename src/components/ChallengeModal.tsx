import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import * as React from "react"
import { useState } from "react"
import { useAuthStore } from "../stores/authStore"
import { fetchGameTitles } from "../utils/gameTitles"

export default function ChallengeModal() {
  const [open, setOpen] = React.useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const initialFormErrors = {
    title: false,
    description: false,
    rules: false,
    game_title: false,
  }

  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const initialFormData = {
    title: "",
    description: "",
    rules: "",
    game_title: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    resetModal()
    setOpen(false)
  }

  const resetModal = () => {
    setFormData(initialFormData)
    setFormErrors(initialFormErrors)
  }

  const { data: uniqueTitles = [] } = useQuery({
    queryKey: ["gameTitles"],
    queryFn: fetchGameTitles,
  })
  const titleOptions = uniqueTitles.map((game) => ({
    id: game.id,
    label: game.title,
  }))

  const user = useAuthStore((state) => state.user)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (!isLoggedIn || !user) return null

  const handleGameChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: { id: number; label: string } | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      game_title: newValue?.label || "",
    }))

    if (newValue?.label) {
      setFormErrors((prev) => ({ ...prev, game_title: false }))
    }
  }

  const handleSubmit = async () => {
    try {
      const errors = {
        title: !formData.title.trim(),
        description: !formData.description.trim(),
        rules: !formData.rules.trim(),
        game_title: !formData.game_title.trim(),
      }

      if (
        !formData.game_title ||
        !formData.title ||
        !formData.description ||
        !formData.rules
      ) {
        return setFormErrors(errors)
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        rules: formData.rules,
        game_title: formData.game_title,
        userId: user?.id,
      }

      const response = await fetch("http://localhost:5000/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Erreur lors de l'envoi")
      setSnackbar({
        open: true,
        message: "Challenge envoyé avec succès !",
        severity: "success",
      })
      resetModal()
      setOpen(false)
    } catch (error) {
      console.error("Erreur :", error)
    }
  }

  return (
    <>
      <Chip
        label="CREER CHALLENGE"
        color="primary"
        size="medium"
        onClick={handleOpen}
      ></Chip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "var(--jet)",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              marginBottom: 2,
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              color: "var(--lavander)",
            }}
          >
            Créer un challenge
          </Typography>
          <Box>
            <TextField
              sx={{
                marginBottom: 2,
                "& .MuiInputBase-input": { color: "var(--lavander)" },
                "& .MuiInputLabel-root": { color: "var(--lavander)" },
              }}
              label="Titre du challenge"
              name="title"
              value={formData.title}
              onChange={(e) => {
                const value = e.target.value
                setFormData((prev) => ({ ...prev, title: value }))
                if (value.trim()) {
                  setFormErrors((prev) => ({ ...prev, title: false }))
                }
              }}
              multiline
              rows={1}
              variant="outlined"
              fullWidth
              error={formErrors.title}
              helperText={formErrors.title ? "Champ obligatoire" : ""}
            />
            <TextField
              sx={{
                marginBottom: 2,
                "& .MuiInputBase-input": { color: "var(--lavander)" },
                "& .MuiInputLabel-root": { color: "var(--lavander)" },
              }}
              label="Description"
              name="description"
              value={formData.description}
              onChange={(e) => {
                const value = e.target.value
                setFormData((prev) => ({ ...prev, description: value }))
                if (value.trim()) {
                  setFormErrors((prev) => ({ ...prev, description: false }))
                }
              }}
              multiline
              rows={1}
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 255,
                style: { color: "var(--lavander)" },
              }}
              FormHelperTextProps={{
                sx: { color: "var(--lavander)" },
              }}
              error={formErrors.description}
              helperText={
                formErrors.description
                  ? "Champ obligatoire avec min 10 caractères"
                  : `${formData.description.length}/255 caractères`
              }
            />
            <TextField
              sx={{
                marginBottom: 2,
                "& .MuiInputBase-input": { color: "var(--lavander)" },
                "& .MuiInputLabel-root": { color: "var(--lavander)" },
              }}
              label="Règles"
              name="rules"
              value={formData.rules}
              onChange={(e) => {
                const value = e.target.value
                setFormData((prev) => ({ ...prev, rules: value }))
                if (value.trim()) {
                  setFormErrors((prev) => ({ ...prev, rules: false }))
                }
              }}
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              FormHelperTextProps={{
                sx: { color: "var(--lavander)" },
              }}
              error={formErrors.rules}
              helperText={
                formErrors.rules
                  ? "Champ obligatoire avec min 10 caractères"
                  : `${formData.rules.length}/200 caractères`
              }
            />
            <Autocomplete
              options={titleOptions}
              getOptionLabel={(option) => option.label}
              value={
                titleOptions.find((opt) => opt.label === formData.game_title) ??
                null
              }
              onChange={handleGameChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Titre du jeu"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input": { color: "var(--lavander)" },
                    "& .MuiInputLabel-root": { color: "var(--lavander)" },
                  }}
                  error={formErrors.game_title}
                  helperText={formErrors.game_title ? "Champ obligatoire" : ""}
                />
              )}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", marginTop: 3 }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                resetModal()
                setOpen(false)
              }}
            >
              RETOUR
            </Button>
            <Button
              sx={{ marginLeft: 2 }}
              color="primary"
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              VALIDER
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
