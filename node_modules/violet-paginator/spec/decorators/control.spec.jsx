import React from 'react'
import expect from 'expect'
import { List } from 'immutable'
import { shallow } from 'enzyme'
import control from '../../src/decorators/control'

function getProps(shouldUpdate = false) {
  return {
    ids: List.of(1, 2, 3),
    shouldUpdate: () => shouldUpdate
  }
}

describe('control(Table)', () => {
  const Component = () => false
  const Controlled = control(Component)

  context('when custom shouldUpdate returns true', () => {
    const props = getProps(true)
    const wrapper = shallow(
      <Controlled {...props} />
    )

    it('should update', () => {
      const nextProps = props
      expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true)
    })
  })

  context('when custom shouldUpdate returns false', () => {
    const props = getProps()
    const wrapper = shallow(
      <Controlled {...props} />
    )

    context('when props are the same', () => {
      const nextProps = props

      it('should not update', () => {
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false)
      })
    })

    context('if the ids change', () => {
      const nextProps = {
        ids: List.of(4, 5, 6)
      }

      it('should update', () => {
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true)
      })
    })

    context('if isLoading changes', () => {
      const nextProps = {
        isLoading: true
      }

      it('should update', () => {
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true)
      })
    })
  })
})

