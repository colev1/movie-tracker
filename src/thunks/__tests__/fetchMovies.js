import { fetchMovies } from '../fetchMovies'
import { isLoading, hasErrored, fetchMoviesSuccess } from '../../actions'
import * as helper from '../../helper'


describe('fetchMovies', () => {
  let mockUrl
  let mockDispatch
  
  beforeEach(() => {
    mockUrl = 'www.url.com'
    mockDispatch = jest.fn()
  })
  
  it('calls dispatch with the isLoading action', () => {
    const thunk = fetchMovies()
    thunk(mockDispatch)
  
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))
  
    const thunk = fetchMovies()
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })

  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    
    const thunk = fetchMovies()
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch cleanMovies if response is ok', async () => {
    const mockMovie = {movie: 'movie1'}
    helper.cleanMovies = jest.fn().mockImplementation(() => mockMovie)

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        result: mockMovie
      })
    }))
    const thunk = fetchMovies()
    
    await thunk(mockDispatch)

    expect(helper.cleanMovies).toHaveBeenCalled()
  })

  it('should dispatch fetchMovieSuccess if response is ok', async () => {
    const mockMovie = {movie: 'movie1'}
    helper.cleanMovies = jest.fn().mockImplementation(() => mockMovie)

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        result: mockMovie
      })
    }))
    const thunk = fetchMovies()
    
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(fetchMoviesSuccess(mockMovie))
  })
})