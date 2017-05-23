import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { PaginationWrapper } from '../../src/containers/PaginationWrapper'
import { defaultPaginator } from '../../src/reducer'
import { Prev } from '../../src/Prev'

function getProps(props = {}) {
  return {
    pageActions: {
      reload: expect.createSpy(),
      initialize: expect.createSpy()
    },
    paginator: defaultPaginator.merge(props)
  }
}

describe('<PaginationWrapper />', () => {
  context('when paginator is uninitialized', () => {
    const props = getProps()
    mount(
      <PaginationWrapper {...props}>
        <Prev />
      </PaginationWrapper>
    )

    it('calls initialize', () => {
      expect(props.pageActions.initialize).toHaveBeenCalled()
    })
  })

  context('when paginator is initialized', () => {
    const props = getProps({ initialized: true })
    mount(
      <PaginationWrapper {...props}>
        <Prev />
      </PaginationWrapper>
    )

    it('does not initialize', () => {
      expect(props.pageActions.initialize).toNotHaveBeenCalled()
    })
  })

  context('when paginator is stale', () => {
    context('and there is no load error', () => {
      const props = getProps({ stale: true })
      mount(
        <PaginationWrapper {...props}>
          <Prev />
        </PaginationWrapper>
      )

      it('executes a reload', () => {
        expect(props.pageActions.reload).toHaveBeenCalled()
      })
    })

    context('and there is a load error', () => {
      const props = getProps({
        stale: true,
        loadError: { status: 401 }
      })

      mount(
        <PaginationWrapper {...props}>
          <Prev />
        </PaginationWrapper>
      )

      it('does not execute a reload', () => {
        expect(props.pageActions.reload).toNotHaveBeenCalled()
      })
    })
  })
})
