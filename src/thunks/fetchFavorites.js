export const fetchFavorites = async (userId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites`;
  return async (dispatch) => {
    try {
    const response = await fetch(url)
    const result = await response.json()
    return result.data
  } catch(err) {
    console.log(err.message)
    }
  }
}