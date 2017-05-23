import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { PageNumber } from '../src/PageNumber'

function verifyPageNumber(node, pageNumber) {
  const { type, props: { children } } = node
  expect([
    type,
    children
  ]).toEqual([
    'span',
    pageNumber
  ])
}

describe('<PageNumber />', () => {
  context('for the current page', () => {
    it('displays the page number in a span', () => {
      const wrapper = shallow(
        <PageNumber page={1} currentPage={1} />
      )

      verifyPageNumber(wrapper.node, 1)
    })
  })

  context('for any other page', () => {
    const pageActions = { goTo: expect.createSpy() }
    const wrapper = shallow(
      <PageNumber page={2} currentPage={1} pageActions={pageActions} />
    )

    it('displays a button', () => {
      expect(wrapper.node.type).toEqual('button')
    })

    it('displays the page number within the link', () => {
      const span = wrapper.node.props.children
      verifyPageNumber(span, 2)
    })

    context('when the link is clicked', () => {
      it('calls the goTo action', () => {
        wrapper.simulate('click')
        expect(pageActions.goTo).toHaveBeenCalledWith(2)
      })
    })
  })
})

