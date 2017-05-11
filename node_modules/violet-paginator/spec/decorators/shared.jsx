import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { defaultPaginator } from '../../src/reducer'

const mockStore = configureMockStore()

export function decorate(decorator, initialSettings = {}) {
  const Component = () => false
  const Decorated = decorator(Component)
  const store = mockStore({ recipes: defaultPaginator.merge(initialSettings) })
  const wrapper = mount(
    <Decorated store={store} listId="recipes" />
  )

  before(function () {
    this.component = wrapper.find(Component)
  })
}

export function behavesLikeADataRow() {
  it('injects the record', function () {
    expect(this.component.props().record).toBeA('object')
  })

  it('injects updating', function () {
    expect(this.component.props().updating).toBeA('boolean')
  })

  it('injects removing', function () {
    expect(this.component.props().removing).toBeA('boolean')
  })
}

export function behavesLikeAFlipper() {
  it('injects hasPreviousPage', function () {
    expect(this.component.props().hasPreviousPage).toBeA('boolean')
  })

  it('injects hasNextPage', function () {
    expect(this.component.props().hasNextPage).toBeA('boolean')
  })
}

export function behavesLikeAPaginator() {
  behavesLikeAFlipper()

  it('injects currentPage', function () {
    expect(this.component.props().currentPage).toBeA('number')
  })

  it('injects totalPages', function () {
    expect(this.component.props().totalPages).toBeA('number')
  })
}

export function behavesLikeADataGrid() {
  it('injects results', function () {
    expect(this.component.props().results).toBeA(Array)
  })

  it('injects isLoading', function () {
    expect(this.component.props().isLoading).toBeA('boolean')
  })
}

export function behavesLikeALeanDataGrid() {
  it('injects ids', function () {
    expect(this.component.props().ids).toBeA(Array)
  })

  it('injects isLoading', function () {
    expect(this.component.props().isLoading).toBeA('boolean')
  })
}

export function behavesLikeAPageSizer() {
  it('injects pageSize', function () {
    expect(this.component.props().pageSize).toBeA('number')
  })
}

export function behavesLikeASorter() {
  it('injects sort', function () {
    expect(this.component.props().sort).toBeA('string')
  })

  it('injects sortReverse', function () {
    expect(this.component.props().sortReverse).toBeA('boolean')
  })
}
