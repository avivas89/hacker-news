export const generateId = () => {
  const random = Math.random().toString(36).substring(2)
  const dateDay = Date.now().toString(36)
  return random + dateDay
}
