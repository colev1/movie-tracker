import { createUser } from '../createUser'
import { isLoading, hasErrored, loginUserAction } from '../../actions'


describe('fetchMovies', () => {
  let mockUrl
  let mockDispatch
  let mockUser
  
  beforeEach(() => {
    mockUser = { id: undefined, email: 'email@mail.com', password: 'pw', name: 'Kylie'}
    mockUrl = 'www.url.com'
    mockDispatch = jest.fn()
  })
  
  it('calls dispatch with the isLoading action', () => {
    const thunk = createUser(mockUser)
    thunk(mockDispatch)
  
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }))
  
    const thunk = createUser(mockUser)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })

  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    
    const thunk = createUser(mockUser)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch hasErrored("") if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        mockUser
      })
    }))


    const thunk = createUser(mockUser)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored(''))
  })

  it('should dispatch loginUserAction if the response is ok', async () => {

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        mockUser
      })
    }))
    
    const thunk = createUser(mockUser)
    
    await thunk(mockDispatch)
    
    expect(mockDispatch).toHaveBeenCalledWith(loginUserAction(mockUser))
  })
})