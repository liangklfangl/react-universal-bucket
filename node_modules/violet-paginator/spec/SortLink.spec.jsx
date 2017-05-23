import React from 'react'
import { Map } from 'immutable'
import expect from 'expect'
import { shallow } from 'enzyme'
import FontAwesome from 'react-fontawesome'
import { SortLink } from '../src/SortLink'

function getProps(props={}) {
  return {
    field: 'name',
    text: 'Name',
    sort: 'name',
    sortReverse: false,
    pageActions: {
      sort: expect.createSpy()
    },
    ...props
  }
}

describe('<SortLink />', () => {
  let props
  let wrapper

  context('when sortable', () => {
    beforeEach(() => {
      props = getProps()
      wrapper = shallow(
        <SortLink {...props} />
      )
    })

    it('displays the text in a link', () => {
      const { node: { type, props: { children } } } = wrapper
      const [text, space, icon] = children

      expect([
        type,
        text,
        space,
        icon.type
      ]).toEqual([
        'a',
        props.text,
        ' ',
        FontAwesome
      ])
    })

    context('when sorted by given field', () => {
      beforeEach(() => {
        props = getProps({ paginator: Map({ sort: props.field }) })
        wrapper = shallow(
          <SortLink {...props} />
        )
      })

      it('indicates sort direction', () => {
        const icon = wrapper.find(FontAwesome)
        expect(icon.node.props.name).toEqual('angle-down')
      })

      context('when link is clicked', () => {
        beforeEach(() => {
          wrapper.find('a').simulate('click')
        })

        it('calls the sort action', () => {
          expect(props.pageActions.sort).toHaveBeenCalledWith(props.field, true)
        })
      })
    })

    context('when sorted by given field in reverse', () => {
      beforeEach(() => {
        props = getProps({ sortReverse: true })
        wrapper = shallow(
          <SortLink {...props} />
        )
      })

      it('indicates sort direction', () => {
        const icon = wrapper.find(FontAwesome)
        expect(icon.node.props.name).toEqual('angle-up')
      })

      context('when link is clicked', () => {
        beforeEach(() => {
          wrapper.find('a').simulate('click')
        })

        it('calls the sort action', () => {
          expect(props.pageActions.sort).toHaveBeenCalledWith(props.field, false)
        })
      })
    })
  })

  context('when not sortable', () => {
    beforeEach(() => {
      props = getProps()
      wrapper = shallow(
        <SortLink {...props} sortable={false} />
      )
    })

    it('displays the text in a span', () => {
      const { node: { type, props: { children } } } = wrapper
      expect([
        type,
        children
      ]).toEqual([
        'span',
        props.text
      ])
    })
  })
})
