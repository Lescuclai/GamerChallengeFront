import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material"
import { useState } from "react"
import ReactPlayer from "react-player"
import avatarDefault from "../assets/avatar.svg"
interface EntryCardProps {
  image?: string
  pseudo: string | number
  description: string
  videoUrl?: string
}
export default function EntryCard({
  image,
  pseudo,
  description,
  videoUrl,
}: EntryCardProps) {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked((prev) => !prev)
  }
  return (
    <Box marginTop={4} marginBottom={0}>
      <Card
        sx={{
          backgroundColor: "var(--jet)",
          color: "var(--lavander)",
          maxWidth: {
            xs: "300px",
            md: "300px",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          margin="16px 16px 0 0"
        >
          <Avatar
            src={image || avatarDefault}
            alt="Photo"
            sx={{
              width: 40,
              height: 40,
              padding: 1,
              bgcolor: "var(--tropical-indigo)",
              m: 1,
            }}
          />
          <Chip clickable label="EDITER" color="primary" />
        </Box>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={0}
          >
            <Typography variant="h6" component="div" marginBottom={1}>
              {pseudo || "Pseudo"}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            marginBottom={2}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: { xs: 2, md: 3 }, // Limite de lignes
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description || "Description courte de la vidéo"}
          </Typography>
          <Box>
            <Box
              sx={{
                position: "relative",
                paddingTop: "58.25%",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <ReactPlayer
                  src={videoUrl || "https://muxed.s3.amazonaws.com/leds.mp4"}
                  width="100%"
                  height="100%"
                  controls
                />
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={0} mb={-2}>
            <IconButton onClick={toggleLike} aria-label="like">
              {liked ? (
                <FavoriteIcon sx={{ color: "var(--tropical-indigo)" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "var(--lavander)" }} />
              )}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
