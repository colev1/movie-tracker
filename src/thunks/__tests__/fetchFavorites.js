import { fetchFavorites } from '../fetchFavorites'
import { isLoading, hasErrored, addFavorites } from '../../actions'


describe('fetchMovies', () => {
  let mockMovie
  let mockDispatch
  
  beforeEach(() => {
    mockMovie = { movie: 'great movie', movie_id: 2 }
    mockDispatch = jest.fn()
  })
  
  it('calls dispatch with the isLoading action', () => {
    const thunk = fetchFavorites(mockMovie, 1)
    thunk(mockDispatch)
  
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))
  
    const thunk = fetchFavorites(mockMovie, 1)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })

  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    
    const thunk = fetchFavorites(mockMovie, 1)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch addFavorites if response is ok', async () => {
    const mockFavorite = {movie: 'movie1'}

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: mockFavorite
      })
    }))
    const thunk = fetchFavorites()
    
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(addFavorites(mockFavorite))
  })
})