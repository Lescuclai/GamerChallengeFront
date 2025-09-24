import { useQuery } from "@tanstack/react-query"
import ChallengeService from "../services/ChallengeService"
import { useState } from "react"
import { PaginationCustom } from "../components/PaginationCustom"
import { HorizontalCard } from "../components/HorizontalCard"
import { Box, CircularProgress } from "@mui/material"

export const ChallengesPage = () => {
  const [page, setPage] = useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const { data: response, isLoading } = useQuery({
    queryKey: ["challengesList", page],
    queryFn: () => ChallengeService.getChallenges(page),
  })
  const challengeList = response?.challenges ?? []
  return (
    <div className="flex flex-col gap-[var(--margin-mobile)] sm:gap-[var(--margin-desktop)]">
      <h1 className="text-[34px] sm:text-[36px] text-center">
        Listes des challenges
      </h1>
      <div className="flex flex-col gap-4">
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {challengeList.map(
          ({ challenge_id, game, title, created_at, description }) => (
            <div key={challenge_id}>
              <HorizontalCard
                link_path={challenge_id}
                img={game.image_url}
                title={title}
                creation_date={created_at}
                content={description}
                text_chip="détails"
              />
            </div>
          )
        )}
      </div>
      <div className="flex justify-center">
        <PaginationCustom
          page={page}
          nbPages={response?.nbPages ?? 1}
          handleChange={handleChange}
        />
      </div>
    </div>
  )
}
