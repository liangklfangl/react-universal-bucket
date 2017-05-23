import React from 'react'
import { Map } from 'immutable'
import expect from 'expect'
import { shallow } from 'enzyme'
import { ColumnHeader } from '../src/ColumnHeader'

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

describe('<ColumnHeader />', () => {
  let props
  let wrapper

  context('when sortable', () => {
    beforeEach(() => {
      props = getProps()
      wrapper = shallow(
        <ColumnHeader {...props} />
      )
    })

    it('displays a button', () => {
      expect(wrapper.node.type).toEqual('button')
    });

    it('inserts the text', () => {
      expect(wrapper.children().node).toEqual(props.text)
    })

    context('when sorted by a different field', () => {
      beforeEach(() => {
        props = getProps({ sort: 'otherField' })
        wrapper = shallow(
          <ColumnHeader {...props} />
        )
      })

      it('indicates a sortable column', () => {
        const icon = wrapper.find('i')
        expect(icon.props().className).toEqual('fa fa-sort');
      })
    })

    context('when sorted by given field', () => {
      beforeEach(() => {
        props = getProps()
        wrapper = shallow(
          <ColumnHeader {...props} />
        )
      })

      it('indicates sort direction', () => {
        const icon = wrapper.find('i')
        expect(icon.props().className).toEqual('fa fa-sort-asc');
      })

      context('when button is clicked', () => {
        beforeEach(() => {
          wrapper.find('button').simulate('click')
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
          <ColumnHeader {...props} />
        )
      })

      it('indicates sort direction', () => {
        const icon = wrapper.find('i')
        expect(icon.props().className).toEqual('fa fa-sort-desc');
      })

      context('when button is clicked', () => {
        beforeEach(() => {
          wrapper.find('button').simulate('click')
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
        <ColumnHeader {...props} sortable={false} />
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
