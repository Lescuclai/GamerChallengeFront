import { useQuery } from "@tanstack/react-query"
import ChallengeService from "../services/ChallengeService"
import { useState } from "react"
import { Box, CircularProgress, Typography } from "@mui/material"

import { useAuthStore } from "../stores/authStore"
import { ChallengesList } from "../components/ChallengesList"

export const ChallengesPage = () => {
  const [page, setPage] = useState(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const { isLoggedIn } = useAuthStore()

  const { data: response, isLoading } = useQuery({
    queryKey: ["challengesList", page, isLoggedIn],
    queryFn: () => ChallengeService.getChallenges(page),
  })
  const challengeList = response?.challenges ?? []
  const challengeMemberList = response?.memberChallenges ?? []
  console.log(response)

  if (challengeList.length <= 0)
    return <Typography component="span">Aucun challenge trouvés</Typography>

  return (
    <div className="flex flex-col gap-[var(--margin-mobile)] sm:gap-[var(--margin-desktop)]">
      <h1 className="text-[34px] sm:text-[36px] text-center">
        Listes des challenges
      </h1>
      <div>
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
        ) : isLoggedIn && challengeMemberList.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              gap: "25px",
            }}
          >
            <ChallengesList
              challenges={challengeMemberList}
              isLogged={isLoggedIn}
              titleSection="Mes challenges"
              isMember={true}
            />
            <ChallengesList
              challenges={challengeList}
              isLogged={isLoggedIn}
              titleSection="Autres challenges"
              handleChange={handleChange}
              nbPages={response?.nbPages}
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
              isLogged={false}
              handleChange={handleChange}
              nbPages={response?.nbPages}
              page={page}
            />
          </Box>
        )}
      </div>
    </div>
  )
}
