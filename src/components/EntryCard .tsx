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
  pseudo: string
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
          backgroundColor: "#333333",
          color: "#EBEBFF",
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
          marginRight={2}
          marginTop={1}
          marginBottom={-1}
        >
          <Avatar
            src={image || avatarDefault}
            alt="Photo"
            sx={{
              width: 40,
              height: 40,
              padding: 1,
              bgcolor: "primary.dark",
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
          <Typography variant="body2" marginBottom={2}>
            {description || "Description courte de la vidéo"}
          </Typography>
          <Box margin="auto" sx={{ width: "100%" }}>
            <div className="relative pt-[58.25%] w-full cursor-pointer">
              <div className="absolute top-0 left-0 w-full h-full mb-0">
                <ReactPlayer
                  src={videoUrl || "https://muxed.s3.amazonaws.com/leds.mp4"}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            </div>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={0} mb={-2}>
            <IconButton onClick={toggleLike} aria-label="like">
              {liked ? (
                <FavoriteIcon sx={{ color: "#8585ff" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "#EBEBFF" }} />
              )}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
