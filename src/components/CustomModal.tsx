import { Box, Button, Modal, Typography } from "@mui/material"
interface CustomModalProps {
  open: boolean
  onClose: (value: boolean) => void
  title?: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
export const CustomModal = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
}: CustomModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    maxWidth: 400,
    bgcolor: "var(--jet)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(e)
  }
  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: 3 }}
        >
          {title}
        </Typography>

        <form onSubmit={handleSubmit}>
          {children}
          <Box sx={{ display: "flex", justifyContent: "end", marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClose(false)}
            >
              Annuler
            </Button>
            <Button
              sx={{ marginLeft: 2 }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Envoyer
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
