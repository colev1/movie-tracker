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
    console.log('response:', response);
  } catch(err) {
    console.log(err.message);
  }
}

export const loginUser = async (loginUser) => {
  const url = 'http://localhost:3000/api/users/'
  try {
    const response = await fetch(url)
    const data = await response.json();
    const matchedUser = data.data.find(user => {
      return user.email === loginUser.email && user.password === loginUser.password;
    })
    console.log(matchedUser);
  } catch(err) {
    console.log(err.message);
  }
}