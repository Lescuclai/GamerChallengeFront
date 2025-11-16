import {
  Box,
  Chip,
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material"
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router"
import { CreateEntryModal } from "../components/CreateEntryModal"
import EntryCard from "../components/EntryCard "
import EntryService from "../services/EntryService"
import { useAuthStore } from "../stores/authStore"
import { ChallengeCard } from "../components/ChallengeCard"

export const ChallengeDetailsPage = () => {
  const queryClient = useQueryClient()
  const currentUser = useAuthStore((state) => state.user)
  const { challengeId } = useParams()
  const isLogIn = useAuthStore((state) => state.isLoggedIn)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const results = useQueries({
    queries: [
      {
        queryKey: ["challengeEntries", challengeId, isLogIn],
        queryFn: () =>
          EntryService.getAllEntriesForUniqueChallenge(Number(challengeId)),
      },
    ],
  })

  const entriesAreLoading = results[0]?.isLoading
  const entries = results[0]?.data?.entries || []
  const memberEntries = results[0]?.data?.memberEntries || []

  const deleteEntryMutation = useMutation({
    mutationFn: (entryId: number) => EntryService.deleteEntry(entryId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["challengeEntries", challengeId, currentUser?.id],
        exact: true,
      })
      await queryClient.refetchQueries({ type: "active" })
    },
  })

  const handleEntryDelete = async (entry_id: number) => {
    try {
      await deleteEntryMutation.mutateAsync(entry_id)
      setSnackbarMessage("Participation supprimée avec succès !")
      setSnackbarOpen(true)
    } catch (error) {
      console.error(error)
      setSnackbarMessage("Erreur lors de la suppression")
      setSnackbarOpen(true)
    }
  }

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "var(--margin-mobile)", sm: "var(--margin-desktop)" },
        marginTop: { sm: "var(--margin-desktop)" },
      }}
    >
      <ChallengeCard />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: "var(--margin-mobile)",
            sm: "var(--margin-desktop)",
          },
        }}
      >
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
            Participations
          </Typography>
          {isLogIn && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Chip
                onClick={() => setIsCreateModalOpen(true)}
                label="PARTICIPER AU CHALLENGE"
                color="primary"
              ></Chip>
              <CreateEntryModal
                open={isCreateModalOpen}
                setOpen={setIsCreateModalOpen}
              />
            </Box>
          )}
        </Box>
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
          {isLogIn && (
            <>
              <Typography variant="h6">Mes participations</Typography>
              {entriesAreLoading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    my: 4,
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {!entriesAreLoading && memberEntries.length <= 0 && (
                <Typography component="span">
                  Aucune participation trouvée
                </Typography>
              )}
              {!entriesAreLoading && memberEntries.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    flexWrap: "wrap",
                    gap: {
                      xs: "var(--margin-mobile-elements)",
                      sm: "var(--margin-desktop-elements)",
                    },
                  }}
                >
                  {memberEntries.map(
                    ({ entry_id, title, user, video_url, userHasVoted }) => (
                      <EntryCard
                        key={entry_id}
                        entryData={{
                          title: title,
                          video_url: video_url,
                          user_id: currentUser?.id,
                          challenge_id: Number(challengeId),
                        }}
                        description={title}
                        pseudo={user.pseudo}
                        videoUrl={video_url}
                        image={user.avatar}
                        entry_id={entry_id}
                        isOwner={true}
                        userHasVoted={userHasVoted ?? false}
                        onDelete={handleEntryDelete}
                      />
                    )
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
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
          {isLogIn && (
            <Typography variant="h6">Autres participations</Typography>
          )}
          {entriesAreLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {!entriesAreLoading && entries.length <= 0 && (
            <Typography component="span">
              Aucune participation trouvée
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              flexWrap: "wrap",
              gap: {
                xs: "var(--margin-mobile-elements)",
                sm: "var(--margin-desktop-elements)",
              },
            }}
          >
            {entries.map(
              ({ entry_id, title, user, video_url, userHasVoted }) => (
                <EntryCard
                  key={entry_id}
                  entryData={{
                    title: title,
                    video_url: video_url,
                    user_id: currentUser?.id,
                    challenge_id: Number(challengeId),
                  }}
                  description={title}
                  pseudo={user.pseudo}
                  videoUrl={video_url}
                  image={user.avatar}
                  entry_id={entry_id}
                  isOwner={false}
                  userHasVoted={userHasVoted ?? false}
                />
              )
            )}
          </Box>
        </Box>
      </Box>

      <Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarMessage.includes("Erreur") ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}
