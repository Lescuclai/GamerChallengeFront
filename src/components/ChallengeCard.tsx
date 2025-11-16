import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material"
import { useMutation, useQueries } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ChallengeDelete } from "../components/ChallengeDelete"
import { ChallengeEdit } from "../components/ChallengeEdit"
import ChallengeService from "../services/ChallengeService"
import { useAuthStore } from "../stores/authStore"
import { formatted } from "../utils/formatedDate"

interface HorizontalCardProps {
  img?: string
}
export const ChallengeCard = ({
  img = "https:images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
}: HorizontalCardProps) => {
  const currentUser = useAuthStore((state) => state.user)
  const { challengeId } = useParams()
  const isLogIn = useAuthStore((state) => state.isLoggedIn)
  const [liked, setLiked] = useState<boolean>(false)
  const results = useQueries({
    queries: [
      {
        queryKey: ["challengeDetails", challengeId, currentUser?.id],
        queryFn: () =>
          ChallengeService.getChallengeDetails(Number(challengeId)),
      },
    ],
  })

  const toggleVote = useMutation({
    mutationFn: (challengeId: number) =>
      ChallengeService.toggleChallengeVote(challengeId),
  })
  const challengeIsLoading = results[0]?.isLoading
  const challengeData = results[0]?.data
  const {
    title,
    game,
    description,
    rules,
    created_at,
    user,
    userHasVoted,
    challenge_id,
  } = challengeData || {}
  const formattedDate = created_at && formatted(created_at).toString()
  useEffect(() => {
    if (challengeData) {
      setLiked(userHasVoted ?? false)
    }
  }, [userHasVoted, challengeData])

  const handleVoteToggle = async () => {
    const res = await toggleVote.mutateAsync(Number(challengeId))
    setLiked(res.voted)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: {
          xs: "var(--margin-mobile-elements)",
          sm: "var(--margin-desktop-elements)",
        },
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Détails du challenge
      </Typography>
      {challengeIsLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!challengeIsLoading && (
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            color: "var(--lavander)",
            borderRadius: 2,
            width: { md: 800 },
          }}
        >
          <CardMedia
            component="img"
            image={game?.image_url ?? img}
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
              padding: { xs: "0.5rem", md: "1rem 2rem 1rem 2rem" },
              display: "flex",
              flexDirection: "column",
              gap: 1,
              flex: 1,
            }}
          >
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">{formattedDate}</Typography>
            <Typography variant="body2">Par {user?.pseudo}</Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.5, textAlign: { md: "justify" } }}
            >
              {description}
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.5, textAlign: { md: "justify" } }}
            >
              {rules}
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
            {user?.id === currentUser?.id && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <ChallengeEdit challenge={challengeData!} />
                <ChallengeDelete challenge_id={challenge_id!} />
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              {isLogIn && (
                <IconButton onClick={handleVoteToggle} aria-label="like">
                  {liked ? (
                    <FavoriteIcon sx={{ color: "var(--tropical-indigo)" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "var(--lavander)" }} />
                  )}
                </IconButton>
              )}
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  )
}
