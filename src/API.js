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
    return response.ok
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