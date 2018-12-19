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
  const allUsers = await fetchAllUsers()
  const matchingUser = allUsers.find(currUser => currUser.email === user.email )
  if (matchingUser) {
    return matchingUser
  } else {
      try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
       
    } catch(err) {
      console.log(err.message);
    }
  }
}

export const loginUser = async (loginUser) => {
  const allUsers = await fetchAllUsers()
  const matchedUser = allUsers.find(user => {
        return user.email === loginUser.email && user.password === loginUser.password;
      })
  return matchedUser;
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