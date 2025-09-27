import GameService from "../services/GameService"

export const fetchGameTitles = async (): Promise<
  { id: number; title: string }[]
> => {
  const games = await GameService.getAllGames()
  return games.map((game) => ({
    id: game.id,
    title: game.title,
  }))
}
