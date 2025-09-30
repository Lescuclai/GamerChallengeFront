import { Box, CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import ChallengeModal from "../components/ChallengeModal"
import { ChallengesList } from "../components/ChallengesList"
import ChallengeService from "../services/ChallengeService"
import { useAuthStore } from "../stores/authStore"

export const ChallengesPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const [page, setPage] = useState(1)
  const handleChange = (
    _event: React.ChangeEvent<unknown> | React.MouseEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }
  useEffect(() => {
    setPage(1)
  }, [isLoggedIn])

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["challengesList", page],
    queryFn: () => ChallengeService.getChallenges(page),
    staleTime: 2 * 60 * 1000, //Données reste "fraiches" durant 2 minutes
    gcTime: 5 * 60 * 1000, // Cache 5 minutes
    refetchOnWindowFocus: false, // Évite refetch intempestifs
    refetchOnMount: false, // Utilise cache si frais
  })

  const challengeList = response?.challenges ?? []
  const challengeMemberList = response?.memberChallenges ?? []
  const totalPages = response?.nbPages

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Typography color="error">Erreur lors du chargement</Typography>
  }
  if (challengeList.length <= 0 && challengeMemberList.length <= 0) {
    return <Typography>Aucun challenge trouvé</Typography>
  }
  return (
    <div className="flex flex-col gap-[var(--margin-mobile)] sm:gap-[var(--margin-desktop)]">
      <h1 className="text-[34px] sm:text-[36px] text-center">
        Listes des challenges
      </h1>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 0, mt: -1 }}>
        {isLoggedIn && <ChallengeModal />}
      </Box>
      <Box sx={{ marginTop: "25px" }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : isLoggedIn && challengeMemberList.length >= 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            <ChallengesList
              challenges={challengeMemberList}
              isLogIn={isLoggedIn}
              titleSection="Mes challenges"
            />
            <ChallengesList
              challenges={challengeList}
              isLogIn={isLoggedIn}
              titleSection="Autres challenges"
              handleChange={handleChange}
              nbPages={totalPages}
              page={page}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <ChallengesList
              challenges={challengeList}
              isLogIn={isLoggedIn}
              handleChange={handleChange}
              nbPages={totalPages}
              page={page}
            />
          </Box>
        )}
      </Box>
    </div>
  )
}
