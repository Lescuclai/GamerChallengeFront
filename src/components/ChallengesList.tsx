import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material"
import { HorizontalCard } from "../components/HorizontalCard"
import type { Challenge } from "../types/challenge"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { PaginationCustom } from "./PaginationCustom"

interface ChallengesListProp {
  challenges: Challenge[]
  isLogged: boolean
  titleSection?: string
  isMember?: boolean
  handleChange?: (event: React.ChangeEvent<unknown>, value: number) => void
  nbPages?: number
  page?: number
}

export const ChallengesList = ({
  challenges,
  isLogged,
  titleSection,
  isMember,
  handleChange,
  nbPages,
  page,
}: ChallengesListProp) => {
  console.log(isMember)
  return (
    <>
      {!isLogged && nbPages && handleChange && page ? (
        <Box>
          {challenges.map(
            ({ challenge_id, game, title, created_at, description }) => (
              <Box key={challenge_id} sx={{ marginTop: "25px" }}>
                <HorizontalCard
                  link_path={challenge_id}
                  img={game.image_url}
                  title={title}
                  creation_date={created_at}
                  content={description}
                  text_chip="Détails"
                />
              </Box>
            )
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            <PaginationCustom
              page={page}
              nbPages={nbPages}
              handleChange={handleChange}
            />
          </Box>
        </Box>
      ) : (
        <Accordion defaultExpanded={!!isMember}>
          <AccordionSummary
            aria-controls={`panel-content`}
            id={`panel-header`}
            expandIcon={<ExpandMoreIcon sx={{ color: "var(--lavander)" }} />}
          >
            <Typography component="span">{titleSection}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {challenges.map(
                ({ challenge_id, game, title, created_at, description }) => (
                  <Box key={challenge_id} sx={{ marginTop: "25px" }}>
                    <HorizontalCard
                      link_path={challenge_id}
                      img={game.image_url}
                      title={title}
                      creation_date={created_at}
                      content={description}
                      text_chip="Détails"
                    />
                  </Box>
                )
              )}
            </Box>
          </AccordionDetails>
          {!isMember && nbPages && handleChange && page && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PaginationCustom
                page={page}
                nbPages={nbPages}
                handleChange={handleChange}
              />
            </Box>
          )}
        </Accordion>
      )}
    </>
  )
}
