import { isLoading } from './actions';

// export const postFavorite = async (movie, uid) => {
//   const url = 'http://localhost:3000/api/users/favorites/new';
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({...movie, user_id: uid})
//     })
//     const result = await response.json();
//     return result;
//   } catch(err) {
//     console.log(err)
//   }
// }

export const fetchFavorites = async (userId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites`;
  try {
    const response = await fetch(url)
    const result = await response.json()
    return result.data
  } catch(err) {
    console.log(err.message)
  }
}

export const deleteFavorite = async (userId, movieId) => {
  const url = `http://localhost:3000/api/users/${userId}/favorites/${movieId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE'
    })
    const result = await response.json()
    return result;
  } catch(err) {
    console.log(err.message)
  }
}