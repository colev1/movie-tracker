import cleanMovies from './helper'

export const fetchMovies = async (url) => {
  try {
    const response = await fetch(url)
    const result = await response.json()
    return cleanMovies(result.results)
  } catch(err) {
    console.log(err.message)
  }
}

export const postFavorite = async (movie, uid) => {
  const url = 'http://localhost:3000/api/users/favorites/new';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...movie, user_id: uid})
    })
    const result = await response.json();
    return result;
  } catch(err) {
    console.log(err)
  }
}

export const createUser = async (user) => {
  const url = 'http://localhost:3000/api/users/new'
    try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const newUser = await response.json();
    return newUser.id
  } catch(err) {
    console.log('error:', err)
  }
}

export const loginUser = async (loginUser) => {
  const url = 'http://localhost:3000/api/users/';
  try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUser)
      })
    const result = await response.json()
    return result.data
  } catch(err) {
    console.log('loginUser err:', err)
  }
}

export const fetchAllUsers = async () => {
  const url = 'http://localhost:3000/api/users/';
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.data
  } catch(err) {
    console.log(err.message);
  }
}

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
    console.log(result)
    return result;
  } catch(err) {
    console.log(err.message)
  }
}