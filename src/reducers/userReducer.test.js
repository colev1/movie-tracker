import { userReducer } from './userReducer'
import * as actions from '../actions'

describe('userReducer', () => {
  it('should return default state', () => {
    const expected = {}
    const result = userReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should log in a user', () => {
    const expected = {name: 'person', id: 1}
    const result = userReducer({}, actions.loginUser(expected))
    expect(result).toEqual(expected)
  })

  it('should log out a user', () => {
    const initial = {name: 'person', id: 1}
    const expected = {}
    const result = userReducer(initial, actions.logout())
    expect(result).toEqual(expected)
  })
})