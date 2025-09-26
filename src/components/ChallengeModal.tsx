import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Modal,
  TextField,
  Typography,
} from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import * as React from "react"
import { useState } from "react"
import { fetchGameTitles } from "../utils/gameTitles"

export default function ChallengeModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { data: uniqueTitles = [] } = useQuery({
    queryKey: ["gameTitles"],
    queryFn: fetchGameTitles,
  })
  const titleOptions = uniqueTitles.map((title) => ({ label: title }))
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [rules, setRules] = useState("")

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
                "& .MuiInputBase-input": { color: "var(--lavender)" },
                "& .MuiInputLabel-root": { color: "var(--lavender)" },
              }}
              label="Titre du challenge"
              multiline
              rows={1}
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              sx={{
                marginBottom: 2,
                "& .MuiInputBase-input": { color: "var(--lavender)" },
                "& .MuiInputLabel-root": { color: "var(--lavender)" },
              }}
              label="Description"
              multiline
              rows={1}
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 255,
                style: { color: "var(--lavender)" },
              }}
            />
            <TextField
              sx={{
                marginBottom: 2,
                "& .MuiInputBase-input": { color: "var(--lavender)" },
                "& .MuiInputLabel-root": { color: "var(--lavender)" },
              }}
              label="Règles"
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              inputProps={{ maxLength: 400 }}
              helperText={`${rules.length}/200 caractères`}
              FormHelperTextProps={{
                sx: { color: "var(--lavender)" },
              }}
            />
            <Autocomplete
              options={titleOptions}
              getOptionLabel={(option) => option.label}
              value={
                titleOptions.find((opt) => opt.label === selectedGame) || null
              }
              onChange={(_, newValue) =>
                setSelectedGame(newValue?.label || null)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Titre du jeu"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input": { color: "var(--lavender)" },
                    "& .MuiInputLabel-root": { color: "var(--lavender)" },
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
            >
              VALIDER
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
