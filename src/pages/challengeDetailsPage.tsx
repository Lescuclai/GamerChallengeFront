import EntryCard from "../components/EntryCard "
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useState } from "react"
import { Link } from "react-router"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  IconButton,
} from "@mui/material"

interface HorizontalCardProps {
  img: string
  title: string
  content: string
}
export const ChallengeDetailsPage = ({
  img = "https:images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  title = "titre du challenge titre du challengetitre du challengetitre du challengetitre du challenge titre du challengetitre du  du challengetitre du challenge",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
}: HorizontalCardProps) => {
  const [liked, setLiked] = useState<boolean>(false)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "var(--margin-mobile)", sm: "var(--margin-desktop)" },
        marginTop: { xs: "var(--margin-mobile)", sm: "var(--margin-desktop)" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--margin-desktop-elements)",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Détails du challenge
        </Typography>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            color: "var(--lavander)",
            borderRadius: 2,
            maxWidth: { md: 900 },
          }}
        >
          <CardMedia
            component="img"
            image={img}
            alt="image challenge card"
            sx={{
              width: { xs: 100, md: 200 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></CardMedia>
          <CardContent
            sx={{
              backgroundColor: "var(--jet)",
              padding: { xs: "0.5rem", md: "1rem 4rem 1rem 2rem" },
              display: "flex",
              flexDirection: "column",
              gap: 1,
              flex: 1,
            }}
          >
            <Typography variant="h6">{title}</Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.5, textAlign: "justify" }}
            >
              {content}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "1rem",
              backgroundColor: "var(--jet)",
            }}
          >
            <Chip clickable label="EDITER" color="primary"></Chip>
            <IconButton
              onClick={() => setLiked((prev) => !prev)}
              aria-label="like"
            >
              {liked ? (
                <FavoriteIcon sx={{ color: "var(--tropical-indigo)" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "var(--lavander)" }} />
              )}
            </IconButton>
          </Box>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--margin-desktop-elements)",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Participations
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Chip
            clickable
            component={Link}
            label="PARTICIPER AU CHALLENGE"
            color="primary"
          ></Chip>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--margin-desktop-elements)",
            flexWrap: "wrap",
          }}
        >
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
          <EntryCard />
        </Box>
      </Box>
    </Box>
  )
}
