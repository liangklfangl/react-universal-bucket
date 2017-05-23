import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { Prev } from '../src/Prev'

function verifyIcon(node) {
  expect(node.props().className).toEqual('fa fa-chevron-left')
}

describe('<Prev />', () => {
  context('when no previous page exists', () => {
    const wrapper = shallow(
      <Prev pageActions={{}} />
    )

    it('disables the button', () => {
      expect(wrapper.props().disabled).toBe(true)
    })
  })

  context('when previous page exists', () => {
    const pageActions = {
      prev: expect.createSpy()
    }

    const wrapper = shallow(
      <Prev pageActions={pageActions} hasPreviousPage />
    )

    it('renders a button', () => {
      expect(wrapper.node.type).toEqual('button')
    })

    it('renders an icon inside the anchor', () => {
      const icon = wrapper.children()
      verifyIcon(icon)
    })

    context('when clicking the button', () => {
      wrapper.simulate('click')
      it('calls the prev action', () => {
        expect(pageActions.prev).toHaveBeenCalled()
      })
    })
  })
})
