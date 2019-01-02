import React from 'react';
import Errorpage from './Errorpage'
import { shallow } from 'enzyme'


describe('Errorpage', () => {
	it('should match the snapshot', () => {
		const wrapper = shallow(< Errorpage />)
		expect(wrapper).toMatchSnapshot()
	})
})