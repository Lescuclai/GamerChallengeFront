export const formatted = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
