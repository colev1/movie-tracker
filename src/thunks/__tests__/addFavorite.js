import { postFavorite } from '../addFavorite'
import { isLoading, hasErrored, addFavorite } from '../../actions'


describe('fetchMovies', () => {
  let mockMovie
  let mockDispatch
  
  beforeEach(() => {
    mockMovie = { movie: 'great movie', movie_id: 2 }
    mockDispatch = jest.fn()
  })
  
  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))
  
    const thunk = postFavorite(mockMovie, 1)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })

   it('should dispatch addFavorite', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
    }))
    const thunk = postFavorite(mockMovie, 1)
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(addFavorite(mockMovie))
  })
})