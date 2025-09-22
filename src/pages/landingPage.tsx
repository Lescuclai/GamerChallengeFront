import { Box, Chip, Typography } from "@mui/material"
import { Link } from "react-router"
import { BoardCard } from "../components/BoardCard"
import { VerticalCard } from "../components/VerticalCard"

export const LandingPage = () => {
  const fakeData = [
    {
      likes_number: 12,
      img: "https://picsum.photos/seed/game1/400/300",
      description: "Relevez le défi ultime dans ce jeu de stratégie épique !",
    },
    {
      likes_number: 34,
      img: "https://picsum.photos/seed/game2/400/300",
      description:
        "Un challenge rapide pour tester vos réflexes et votre vitesse.",
    },
    {
      likes_number: 8,
      img: "https://picsum.photos/seed/game3/400/300",
      description: "Découvrez ce mini-jeu et essayez de battre le record !",
    },
  ]
  const fakeEntries = [
    {
      likes_number: 19,
      img: "https://picsum.photos/seed/game4/400/300",
      description: "Un challenge coopératif où chaque joueur compte.",
    },
    {
      likes_number: 27,
      img: "https://picsum.photos/seed/game5/400/300",
      description: "Testez vos compétences dans ce jeu d’adresse unique.",
    },
    {
      likes_number: 5,
      img: "https://picsum.photos/seed/game6/400/300",
      description: "Un défi solo intense pour les amateurs de compétition.",
    },
  ]
  const fakeNewChallenges: {
    image: string
    text_chip: string
    pseudo: string
    titre: string
    date: string
    id: number
  }[] = [
    {
      image: "https://picsum.photos/seed/game1/400/300",
      text_chip: "Détails",
      pseudo: "GamerX",
      titre: "Défi stratégique ultime",
      date: "2025-09-18",
      id: 1,
    },
    {
      image: "https://picsum.photos/seed/game2/400/300",
      text_chip: "Voir plus",
      pseudo: "SpeedyPlayer",
      titre: "Challenge express",
      date: "2025-09-17",
      id: 2,
    },
    {
      image: "https://picsum.photos/seed/game3/400/300",
      text_chip: "Participer",
      pseudo: "MiniGamePro",
      titre: "Mini-jeu record",
      date: "2025-09-16",
      id: 3,
    },
    {
      image: "https://picsum.photos/seed/game4/400/300",
      text_chip: "Infos",
      pseudo: "TeamAlpha",
      titre: "Défi coopératif",
      date: "2025-09-15",
      id: 4,
    },
    {
      image: "https://picsum.photos/seed/game5/400/300",
      text_chip: "Challenge",
      pseudo: "SoloMaster",
      titre: "Challenge solo intense",
      date: "2025-09-14",
      id: 5,
    },
  ]
  const formatted = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }
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
            xs: "14px",
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
                xs: "14px",
                md: "1.25rem",
              },
            }}
            label="Challenges"
            color="primary"
          />
        </div>
      </Box>
      <Box className="flex flex-col gap-[var(--margin-desktop-elements)]  sm:flex-row ">
        <div>
          <p className="text-[1.25rem]">LeaderBoard des challenges</p>
          <div className="flex flex-col gap-[var(--margin-cards)]">
            {fakeData.map((item) => (
              <BoardCard
                key={item.img}
                img={item.img}
                description={item.description}
                likes_number={item.likes_number}
              ></BoardCard>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[1.25rem]">LeaderBoard des participants</p>
          <div className="flex flex-col gap-[var(--margin-cards)]">
            {fakeEntries.map((entry) => (
              <BoardCard
                key={entry.img}
                img={entry.img}
                description={entry.description}
                likes_number={entry.likes_number}
              />
            ))}
          </div>
        </div>
      </Box>
      <Box
        sx={{
          width: { sx: "250px", md: "100%" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p className="text-[1.25rem]">Nouveaux challenges</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          {fakeNewChallenges.map((item) => (
            <VerticalCard
              key={item.id}
              image={item.image}
              link_path={"/challenge?id=" + item.id}
              text_chip={item.text_chip}
            >
              <Box sx={{}}>
                <Typography variant="h5">{item.pseudo}</Typography>
                <Typography>-</Typography>
                <Typography>{formatted(item.date)}</Typography>
              </Box>
              <Typography>{item.titre}</Typography>
            </VerticalCard>
          ))}
        </div>
      </Box>
    </div>
  )
}
