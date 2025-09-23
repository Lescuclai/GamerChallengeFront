import { Box, Chip, Typography } from "@mui/material"
import { Link } from "react-router"
import { BoardCard } from "../components/BoardCard"
import { VerticalCard } from "../components/VerticalCard"
import ChallengeService from "../services/ChallengeService"
import { useQueries } from "@tanstack/react-query"
import EntryService from "../services/EntryService"
import { formatted } from "../utils/formatedDate"

export const LandingPage = () => {
  const challengeService = new ChallengeService()
  const entryService = new EntryService()

  const results = useQueries({
    queries: [
      {
        queryKey: ["newestChallenges"],
        queryFn: () => challengeService.getNewest(),
      },
      {
        queryKey: ["popularChallenges"],
        queryFn: () => challengeService.getMostLikedChallenges(),
      },
      {
        queryKey: ["popularEntries"],
        queryFn: () => entryService.getEntryMostLikedEntry(),
      },
    ],
  })
  const newestChallenges = results[0]
  const popularChallenges = results[1]
  const popularEntries = results[2]

  return (
    <div className="flex flex-col gap-[var(--margin-mobile)] sm:gap-[var(--margin-desktop)]">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          flex: {
            xs: 1,
          },
          alignItems: "center",
          fontSize: {
            xs: "1rem",
            md: "1.25rem",
          },
        }}
      >
        <div className="flex flex-col text-center justify-evenly items-center bg-amber- max-w-[1056px] h-[355px] sm:h-[413px]">
          <div className="sm:h-[201px]">
            <p className="text-[36px] sm:text-[48px]">GamerChallenges</p>
            <p className="max-w-[486px] ">
              Une plateforme dédiée aux challenges de jeux vidéo, permettant aux
              utilisateurs de proposer et relever des challenges sur différents
              jeux
            </p>
          </div>
          <Chip
            component={Link}
            to={"/"}
            clickable
            sx={{
              width: {
                xs: "50%",
                md: "50%",
              },
              fontSize: {
                xs: "1rem",
                md: "1.25rem",
              },
            }}
            label="Challenges"
            color="primary"
          />
        </div>
      </Box>
      <Box className="flex flex-col gap-[var(--margin-desktop-elements)] sm:flex-row">
        <div className="flex-1 min-w-0">
          <p className="text-[1.25rem] " style={{ marginBottom: "1rem" }}>
            Leaderboard des challenges
          </p>
          <div className="flex flex-col gap-[var(--margin-cards)]">
            {popularChallenges.data?.map((item) => (
              <BoardCard
                key={item.challenge_id}
                img={item.game.image_url}
                description={item.title}
                likes_number={item._count.challengeVoters}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[1.25rem]" style={{ marginBottom: "1rem" }}>
            Leaderboard des participants
          </p>
          <div className="flex flex-col gap-[var(--margin-cards)]">
            {popularEntries.data?.map((entry) => (
              <BoardCard
                key={entry.entry_id}
                img={entry.user.avatar}
                description={entry.title}
                likes_number={entry._count.entryVoters}
              />
            ))}
          </div>
        </div>
      </Box>
      <Box>
        <p className="text-[1.25rem] " style={{ marginBottom: "1rem" }}>
          Nouveaux challenges
        </p>
        <div className=" flex flex-col items-center  gap-[var(--margin-desktop-elements)]   sm:flex-row ">
          {newestChallenges.data?.map((item) => (
            <VerticalCard
              key={item.challenge_id}
              image={item.game.image_url}
              link_path={"/challenge?id=" + item.challenge_id}
              text_chip="Détails"
            >
              <Box sx={{}}>
                <Typography variant="h6" sx={{ color: "var(--lavander)" }}>
                  {item.game.title}
                </Typography>
                <Typography>-</Typography>
                <Typography sx={{ fontSize: 12 }}>
                  {formatted(item.created_at)}
                </Typography>
              </Box>
              <Typography>{item.user.pseudo}</Typography>
              <Typography>{item.title}</Typography>
            </VerticalCard>
          ))}
        </div>
      </Box>
    </div>
  )
}
