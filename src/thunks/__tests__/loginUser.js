import { loginUser } from '../loginUser'
import { isLoading, hasErrored, searchMovieSuccess, loginUserAction } from '../../actions'
import { cleanMovies, SQLsearchString } from '../../helper'

jest.mock('../../helper')

describe('fetchMovies', () => {
  let mockUrl
  let mockDispatch
  
  beforeEach(() => {
    mockUrl = 'www.url.com'
    mockDispatch = jest.fn()
  })
  
  it('calls dispatch with the isLoading action', () => {
    const thunk = loginUser()
    thunk(mockDispatch)
  
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))
  
    const thunk = loginUser()
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })

  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    
    const thunk = loginUser()
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch hasErrored("") if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: 'data'
      })
    }))
    
    const thunk = loginUser()
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(''))
  })

  it('should dispatch loginUserAction if the response is ok', async () => {
    const mockUser = { name: 'Kylie', id: 1 }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: mockUser
      })
    }))
    
    const thunk = loginUser()
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(loginUserAction(mockUser))
  })
})