import { useQuery } from "@tanstack/react-query"
import ChallengeService from "../services/ChallengeService"
import { useState } from "react"
import { PaginationCustom } from "../components/PaginationCustom"

export const ChallengesPage = () => {
  const [page, setPage] = useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const challengeService = new ChallengeService()
  const { data } = useQuery({
    queryKey: ["challengesList", page],
    queryFn: () => challengeService.getChallenges(page),
  })
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-[34px] sm:text-[36px]">Listes des challenges</h1>
      <ul>
        {data?.data.map((challenge) => (
          <li>{challenge.title}</li>
        ))}
      </ul>
      <PaginationCustom
        page={page}
        nbPages={data?.nbPages ?? 1}
        handleChange={handleChange}
      />
    </div>
  )
}
