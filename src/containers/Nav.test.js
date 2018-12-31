import React from 'react';
import { shallow } from 'enzyme';
import { Nav, mapStateToProps, mapDispatchToProps } from './Nav'
import { connect } from 'react-redux'


describe('Nav', () => {
  let wrapper
  let mockMovies

  beforeEach(() => {
    mockMovies = [{ title: 'movie1'}, {title: 'movie2'}, {title: 'movie3' }]
    wrapper = shallow(
      <Nav
        user={{name: 'Cole', id: 1}}
        logout={jest.fn()}
        fetchMovies={jest.fn()}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should welcome the user if logged in', () => {
    const h4 = wrapper.find('h4')
    expect(h4.text()).toEqual('Welcome Back Cole!')
  })

  it('should display nothing if the user is not logged in', () => {
    wrapper = shallow(
      <Nav
        user={{name: null, id: null}}
        logout={jest.fn()}
        fetchMovies={jest.fn()}
      />
    )
    const h4 = wrapper.find('h4')
    expect(h4.text()).toEqual('')
  })
})