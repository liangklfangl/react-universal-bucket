import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { Next } from '../src/Next'

function verifyIcon(node) {
  expect(node.props().className).toEqual('fa fa-chevron-right')
}

describe('<Next />', () => {
  context('when no next page exists', () => {
    const wrapper = shallow(
      <Next pageActions={{}} />
    )

    it('disables the button', () => {
      expect(wrapper.props().disabled).toBe(true)
    })
  })

  context('when next page exists', () => {
    const pageActions = {
      next: expect.createSpy()
    }

    const wrapper = shallow(
      <Next pageActions={pageActions} hasNextPage />
    )

    it('renders a button', () => {
      expect(wrapper.node.type).toEqual('button')
    })

    it('renders an icon inside the button', () => {
      const icon = wrapper.children()
      verifyIcon(icon)
    })

    context('when clicking the button', () => {
      wrapper.simulate('click')
      it('calls the prev action', () => {
        expect(pageActions.next).toHaveBeenCalled()
      })
    })
  })
})

