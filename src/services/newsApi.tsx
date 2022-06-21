const url = `${process.env.REACT_APP_API}`

export const newsApi = async (query:string) => {
  try {
    const res = await fetch(`${url}?${query}`)
    const response = await res.json()
    return response

  } catch (error) {
    console.log(error)
  }
}
