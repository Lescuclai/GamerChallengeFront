import EntryCard from "../components/EntryCard "
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useState } from "react"
import { Link, useParams } from "react-router"
import { useQueries, useMutation } from "@tanstack/react-query"
import EntryService from "../services/EntryService"
import ChallengeService from "../services/ChallengeService"
import { formatted } from "../utils/formatedDate"
import { useAuthStore } from "../stores/authStore"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material"

interface HorizontalCardProps {
  img: string
}
export const ChallengeDetailsPage = ({
  img = "https:images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
}: HorizontalCardProps) => {
  const { challengeId } = useParams()
  const isLogIn = useAuthStore((state) => state.isLoggedIn)
  const [liked, setLiked] = useState<boolean>(false)
  const results = useQueries({
    queries: [
      {
        queryKey: ["challengeDetails", challengeId],
        queryFn: () => ChallengeService.getById(Number(challengeId)),
      },
      {
        queryKey: ["challengeEntries", challengeId],
        queryFn: () =>
          EntryService.getAllEntriesForUniqueChallenge(Number(challengeId)),
      },
    ],
  })
  const toggleVote = useMutation({
    mutationFn: (challengeId: number) =>
      ChallengeService.toggleChallengeVote(challengeId),
  })
  const challengeIsLoading = results[0]?.isLoading
  const { title, game, description, rules, created_at, user } =
    results[0]?.data?.challenge || {}
  const formattedDate = created_at && formatted(created_at).toString()
  const entriesAreLoading = results[1]?.isLoading
  const entries = results[1]?.data?.entries || []
  const memberEntries = results[1]?.data?.memberEntries || []

  const onVoteSubmit = async () => {
    const res = await toggleVote.mutateAsync(Number(challengeId))
    setLiked(res.voted)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "var(--margin-mobile)", sm: "var(--margin-desktop)" },
        marginTop: { sm: "var(--margin-desktop)" },
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
              <Chip clickable label="EDITER" color="primary"></Chip>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                {isLogIn && (
                  <IconButton onClick={onVoteSubmit} aria-label="like">
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--margin-desktop-elements)",
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--margin-desktop-elements)",
          }}
        >
          {isLogIn && (
            <>
              <Typography variant="h5">Mes participations</Typography>
              {entriesAreLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                  <CircularProgress />
                </Box>
              )}
              {!entriesAreLoading && memberEntries.length <= 0 && (
                <Typography variant="span">
                  Aucune participation trouvée
                </Typography>
              )}
              {!entriesAreLoading && memberEntries.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "var(--margin-desktop-elements)",
                  }}
                >
                  {memberEntries.map(({ entry_id, title, user }) => (
                    <EntryCard
                      key={entry_id}
                      description={title}
                      pseudo={user.pseudo}
                    />
                  ))}
                </Box>
              )}
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--margin-desktop-elements)",
          }}
        >
          {isLogIn && (
            <Typography variant="h5">Autres participations</Typography>
          )}
          {entriesAreLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {entries.length <= 0 && (
            <Typography component="span">
              Aucune participation trouvée
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "var(--margin-desktop-elements)",
              flexWrap: "wrap",
            }}
          >
            {entries &&
              entries.map(({ entry_id, title, user }) => (
                <EntryCard
                  key={entry_id}
                  description={title}
                  pseudo={user.pseudo}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
