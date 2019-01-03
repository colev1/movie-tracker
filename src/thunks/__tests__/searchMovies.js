import { searchMovies } from '../searchMovies'
import * as actions from '../../actions'
import * as helper from '../../helper'


helper.sqlSearchString = jest.fn()    

describe('fetchMovies', () => {
  let mockUrl
  let mockDispatch
  
  beforeEach(() => {
    mockUrl = 'www.url.com'
    mockDispatch = jest.fn()
  })
  
  it('calls dispatch with the isLoading action', () => {
    const thunk = searchMovies()
    thunk(mockDispatch)
  
    expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))
  
    const thunk = searchMovies()
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(actions.hasErrored('Something went wrong'))
  })

  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    
    const thunk = searchMovies()
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(actions.isLoading(false))
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
    const thunk = searchMovies()
    
    await thunk(mockDispatch)

    expect(helper.cleanMovies).toHaveBeenCalled()
  })

  it('should dispatch searchMovieSuccess if response is ok', async () => {
    const mockMovie = {movie: 'movie1'}
    helper.cleanMovies = jest.fn().mockImplementation(() => mockMovie)

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        result: mockMovie
      })
    }))
    const thunk = searchMovies()
    
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(actions.searchMovieSuccess(mockMovie))
  })
})