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
    severity: "info" as "error" | "success" | "warning" | "info",
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      rules: "",
      game_title: "",
    })
    setOpen(false)
  }

  const { data: uniqueTitles = [] } = useQuery({
    queryKey: ["gameTitles"],
    queryFn: fetchGameTitles,
  })
  const titleOptions = uniqueTitles.map((game) => ({
    id: game.id,
    label: game.title,
  }))

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rules: "",
    game_title: "",
  })

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
  }

  const handleSubmit = async () => {
    try {
      if (
        !formData.game_title ||
        !formData.title ||
        !formData.description ||
        !formData.rules
      ) {
        setSnackbar({
          open: true,
          message: "Tous les champs sont obligatoires.",
          severity: "error",
        })
        return
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
      handleClose()
      setFormData({ title: "", description: "", rules: "", game_title: "" })
    } catch (error) {
      console.error("Erreur :", error)
      setSnackbar({
        open: true,
        message: "Erreur lors de l'envoi du challenge.",
        severity: "error",
      })
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              multiline
              rows={1}
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 100 }}
              required
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
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              multiline
              rows={1}
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 255,
                style: { color: "var(--lavander)" },
              }}
              required
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rules: e.target.value }))
              }
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 400 }}
              helperText={`${formData.rules.length}/200 caractères`}
              FormHelperTextProps={{
                sx: { color: "var(--lavander)" },
              }}
              required
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
                />
              )}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", marginTop: 3 }}>
            <Button color="primary" variant="contained" onClick={handleClose}>
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
