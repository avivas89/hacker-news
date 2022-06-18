const url = `${process.env.REACT_APP_API}`

const newsApi = async () => {
  try {
    const res = await fetch(url)
    const response = await res.json()
    return response

  } catch (error) {
    console.log(error)
  }
}

export default newsApi
