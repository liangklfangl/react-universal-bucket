import Immutable, { Map, Set } from 'immutable'
import expect from 'expect'
import createPaginator, { defaultPaginator } from '../src/reducer'
import actionType, * as actionTypes from '../src/actions/actionTypes'
import composables from '../src/actions'

const id = 'test-list'
const reducer = createPaginator({ listId: id })
const pageActions = composables({ listId: id })

function setup(testPaginator=Map()) {
  const state = defaultPaginator.merge(testPaginator)

  return { state }
}

describe('pagination reducer', () => {
  describe('createPaginator', () => {
    context('with initial settings', () => {
      const config = {
        listId: 'customized',
        initialSettings: {
          pageSize: 50,
          sort: 'name'
        }
      }

      it('merges the initial settings', () => {
        expect(createPaginator(config)()).toEqual(defaultPaginator.merge(config.initialSettings))
      })
    })
  })

  describe('INITIALIZE_PAGINATOR', () => {
    context('with preloaded data', () => {
      const { state: initialState } = setup()
      const preloaded = {
        results: [{ name: 'Ewe and IPA' }],
        totalCount: 1
      }

      const action = {
        type: actionType(actionTypes.INITIALIZE_PAGINATOR, id),
        preloaded
      }

      const state = reducer(initialState, action)

      it('merges the preloaded results', () => {
        expect(state.get('results').toJS()).toEqual(preloaded.results)
      })

      it('merges the preloaded totalCount', () => {
        expect(state.get('totalCount')).toEqual(preloaded.totalCount)
      })
    })

    context('without preloaded data', () => {
      it('marks the list as stale', () => {
      })
    })
  })

  context('when handling SET_FILTER', () => {
    const { state: initialState } = setup()
    const field = 'foo'
    const value = { eq: 'bar' }
    const action = {
      type: actionType(actionTypes.SET_FILTER, id),
      field,
      value
    }

    const state = reducer(initialState, action)

    it('sets the specified filter', () => {
      expect(state.getIn(['filters', field]).toJS()).toEqual(value)
    })

    it('returns to the first page', () => {
      expect(state.get('page')).toEqual(1)
    })
  })

  context('when handling SET_FILTERS', () => {
    const initialFilters = {
      name: { like: 'IPA' },
      show_inactive: { eq: true },
      containers: ['can', 'bottle']
    }

    const paginator = defaultPaginator.merge({
      filters: Immutable.fromJS(initialFilters)
    })

    const { state: initialState } = setup(paginator)
    const updatedFilters = {
      show_inactive: { eq: false },
      fermentation_temperature: { lt: 60 },
      containers: ['growler']
    }

    const action = {
      type: actionType(actionTypes.SET_FILTERS, id),
      filters: updatedFilters
    }

    const expectedFilters = {
      name: initialFilters.name,
      show_inactive: updatedFilters.show_inactive,
      fermentation_temperature: updatedFilters.fermentation_temperature,
      containers: ['growler']
    }

    const state = reducer(initialState, action)

    it('merges the specified filters', () => {
      expect(state.get('filters').toJS()).toEqual(expectedFilters)
    })

    it('returns to the first page', () => {
      expect(state.get('page')).toEqual(1)
    })
  })

  context('when handling RESET_FILTERS', () => {
    const initialFilters = {
      name: { like: 'IPA' },
      show_inactive: { eq: true }
    }

    const paginator = defaultPaginator.merge({
      filters: Immutable.fromJS(initialFilters)
    })

    const { state: initialState } = setup(paginator)
    const updatedFilters = {
      show_inactive: { eq: false },
      fermentation_temperature: { lt: 60 }
    }

    const action = {
      type: actionType(actionTypes.RESET_FILTERS, id),
      filters: updatedFilters
    }

    const state = reducer(initialState, action)

    it('resets the filters', () => {
      expect(state.get('filters').toJS()).toEqual(updatedFilters)
    })

    it('returns to the first page', () => {
      expect(state.get('page')).toEqual(1)
    })
  })

  it('handles EXPIRE_PAGINATOR', () => {
    const { state: initialState } = setup()
    const action = {
      type: actionType(actionTypes.EXPIRE_PAGINATOR, id)
    }

    const state = reducer(initialState, action)
    expect(state.get('stale')).toEqual(true)
  })

  it('handles EXPIRE_ALL', () => {
    const { state: initialState } = setup()
    const action = {
      type: actionTypes.EXPIRE_ALL
    }

    const state = reducer(initialState, action)
    expect(state.get('stale')).toBe(true)
  })

  it('handles PREVIOUS_PAGE', () => {
    const paginator = defaultPaginator.set('page', 2)
    const { state: initialState } = setup(paginator)
    const action = { type: actionType(actionTypes.PREVIOUS_PAGE, id) }
    const state = reducer(initialState, action)

    expect(state.get('page')).toEqual(1)
  })

  it('handles NEXT_PAGE', () => {
    const { state: initialState } = setup()
    const action = { type: actionType(actionTypes.NEXT_PAGE, id) }
    const state = reducer(initialState, action)

    expect(state.get('page')).toEqual(2)
  })

  it('handles GO_TO_PAGE', () => {
    const { state: initialState } = setup()
    const action = { type: actionType(actionTypes.GO_TO_PAGE, id), size: 100 }
    const state = reducer(initialState, action)

    expect(state.get('page')).toEqual(action.page)
  })

  it('handles SET_PAGE_SIZE', () => {
    const { state: initialState } = setup()
    const action = { type: actionType(actionTypes.SET_PAGE_SIZE, id), page: 2 }
    const state = reducer(initialState, action)

    const expectedState = defaultPaginator.merge({
      page: 1,
      pageSize: action.size,
      stale: true
    })

    expect(expectedState).toEqual(state)
  })

  it('handles FETCH_RECORDS', () => {
    const { state: initialState } = setup()
    const action = { type: actionType(actionTypes.FETCH_RECORDS, id) }
    const state = reducer(initialState, action)

    expect(state.get('isLoading')).toBe(true)
  })

  it('handles RESULTS_UPDATED', () => {
    const requestId = 'someId'
    const paginator = defaultPaginator.merge({ requestId, isLoading: true })
    const { state: initialState } = setup(paginator)
    const records = [{ name: 'Pouty Stout' }, { name: 'Ewe and IPA' }]
    const action = {
      type: actionType(actionTypes.RESULTS_UPDATED, id),
      results: records,
      totalCount: 2,
      requestId
    }

    const state = reducer(initialState, action)
    const expectedState = defaultPaginator.merge({
      results: Immutable.fromJS(records),
      isLoading: false,
      totalCount: action.totalCount,
      requestId
    })

    expect(expectedState).toEqual(state)
  })

  it('handles RESULTS_UPDATED_ERROR', () => {
    const paginator = defaultPaginator.merge({ isLoading: true })
    const { state: initialState } = setup(paginator)
    const error = 'error'
    const action = {
      type: actionType(actionTypes.RESULTS_UPDATED_ERROR, id),
      error
    }

    const state = reducer(initialState, action)
    expect(state.toJS()).toEqual(defaultPaginator.merge({
      isLoading: false,
      loadError: error
    }).toJS())
  })

  it('handles SET_FILTER', () => {
    const { state: initialState } = setup()
    const action = {
      type: actionType(actionTypes.SET_FILTER, id),
      field: 'base_salary',
      value: { lt: 2000 }
    }

    const state = reducer(initialState, action)
    expect(state.getIn(['filters', action.field])).toEqual(Immutable.fromJS(action.value))
  })

  it('handles SORT_CHANGED', () => {
    const paginator = defaultPaginator.merge({ sort: 'name', page: 2 })
    const { state: initialState } = setup(paginator)
    const action = {
      type: actionType(actionTypes.SORT_CHANGED, id),
      field: 'fermentation_temperature',
      reverse: true
    }

    const state = reducer(initialState, action)
    const expectedState = defaultPaginator.merge({
      sort: action.field,
      sortReverse: action.reverse,
      stale: true
    })

    expect(expectedState).toEqual(state)
  })

  it('handles RESET_RESULTS', () => {
    const { state: initialState } = setup()
    const results = [1, 2, 3]
    const action = {
      type: actionType(actionTypes.RESET_RESULTS, id),
      results
    }

    const state = reducer(initialState, action)
    expect(state.get('results').toJS()).toEqual(results)
  })

  describe('UPDATE_ITEMS', () => {
    const itemId = 'someId'
    const results = [{ id: itemId, name: 'Pouty Stout' }]
    const paginator = defaultPaginator.merge({
      results: Immutable.fromJS(results),
      updating: Set(itemId)
    })

    const { state: initialState } = setup(paginator)
    const action = pageActions.updateItems([itemId], { active: true })

    const state = reducer(initialState, action)

    it('updates all items', () => {
      const items = state.get('results')
      expect(items.every(i => i.get('active'))).toBe(true)
    })

    it('removes the item from the updating list', () => {
      expect(state.get('updating').toArray()).toNotInclude(itemId)
    })
  })

  describe('RESET_ITEM', () => {
    const itemId = 'someId'
    const results = [{ id: itemId, name: 'Pouty Stout' }]
    const paginator = defaultPaginator.merge({
      results: Immutable.fromJS(results),
      updating: Set(itemId)
    })

    const { state: initialState } = setup(paginator)
    const reset = { id: itemId, name: 'Ewe and IPA' }
    const action = pageActions.resetItem(itemId, reset)

    const state = reducer(initialState, action)

    it('updates all items', () => {
      const item = state.get('results').find(r => r.get('id') === itemId)
      expect(item).toEqual(Map(reset))
    })

    it('removes the item from the updating list', () => {
      expect(state.get('updating').toArray()).toNotInclude(itemId)
    })
  })

  describe('MARK_ITEMS_ERRORED', () => {
    const itemId = 'someId'
    const results = [{ id: itemId, name: 'Pouty Stout' }]
    const paginator = defaultPaginator.merge({
      results: Immutable.fromJS(results),
      updating: Set(itemId)
    })

    const { state: initialState } = setup(paginator)
    const error = { name: ['taken'] }
    const action = pageActions.markItemsErrored([itemId], error)

    const state = reducer(initialState, action)

    it('marks the items as errored', () => {
      const item = state.get('results').find(r => r.get('id') === itemId)
      expect(item.get('error')).toEqual(Immutable.fromJS(error))
    })

    it('removes the item from the updating list', () => {
      expect(state.get('updating').toArray()).toNotInclude(itemId)
    })
  })

  it('handles UPDATING_ITEM', () => {
    const { state: initialState } = setup()
    const action = {
      type: actionType(actionTypes.UPDATING_ITEM, id),
      itemId: 'someId'
    }

    const state = reducer(initialState, action)
    expect(state.get('updating').toJS()).toInclude(action.itemId)
  })

  describe('UPDATING_ITEMS', () => {
    const { state: initialState } = setup()
    const ids = [1, 2, 3]
    const action = pageActions.updatingItems(ids)

    const state = reducer(initialState, action)

    it('marks the items as updating', () => {
      expect(state.get('updating')).toEqual(Set(ids))
    })
  })

  context('when handling UPDATE_ITEM', () => {
    const itemId = 'someId'
    const results = [{ id: itemId, name: 'Pouty Stout', error: 'Error updating recipe' }]
    const updating = Set.of('someId')
    const paginator = defaultPaginator.merge({ results: Immutable.fromJS(results), updating })
    const { state: initialState } = setup(paginator)
    const action = {
      type: actionType(actionTypes.UPDATE_ITEM, id),
      data: { name: 'Ewe and IPA' },
      itemId
    }

    const state = reducer(initialState, action)

    it('updates the item', () => {
      const item = state.get('results').toJS()[0]
      expect(item.name).toEqual(action.data.name)
    })

    it('removes the item from the updating list', () => {
      expect(state.get('updating').toJS()).toNotInclude(itemId)
    })

    it('removes the error from the item', () => {
      expect(state.get('error')).toNotExist()
    })
  })

  it('handles REMOVING_ITEM', () => {
    const { state: initialState } = setup()
    const action = {
      type: actionType(actionTypes.REMOVING_ITEM, id),
      itemId: 'someId'
    }

    const state = reducer(initialState, action)
    expect(state.get('removing').toJS()).toInclude(action.itemId)
  })

  describe('REMOVE_ITEM', () => {
    const itemId = 'someId'
    const results = [{ id: itemId, name: 'Pouty Stout' }]
    const removing = Set.of(itemId)
    const paginator = defaultPaginator.merge({ results: Immutable.fromJS(results), removing })
    const { state: initialState } = setup(paginator)
    const action = {
      type: actionType(actionTypes.REMOVE_ITEM, id),
      itemId
    }

    const state = reducer(initialState, action)

    it('removes the item', () => {
      expect(state.get('results').count()).toEqual(0)
    })

    it('removes the item from the removing list', () => {
      expect(state.get('removing').toJS()).toNotInclude(itemId)
    })
  })

  describe('ITEM_ERROR', () => {
    const itemId = 'someId'
    const results = [{ id: itemId, name: 'Pouty Stout' }]
    const updating = Set.of(itemId)
    const paginator = defaultPaginator.merge({ results: Immutable.fromJS(results), updating })
    const { state: initialState } = setup(paginator)
    const action = {
      type: actionType(actionTypes.ITEM_ERROR, id),
      itemId,
      error: 'Error updating item'
    }

    const state = reducer(initialState, action)
    const item = state.get('results').find(r => r.get('id') === itemId)

    it('attaches the error to the item', () => {
      expect(item.get('error')).toEqual(action.error)
    })

    it('removes the item from the updating list', () => {
      expect(state.get('updating').toJS()).toNotInclude(itemId)
    })
  })

  context('and a filter item exists', () => {
    const paginator = defaultPaginator.setIn(['filters', 'myArray'], Set.of('myItem'))
    const { state: initialState } = setup(paginator)

    context('when the filter item is toggled', () => {
      it('is deleted', () => {
        const action = {
          type: actionType(actionTypes.TOGGLE_FILTER_ITEM, id),
          field: 'myArray',
          value: 'myItem'
        }

        const state = reducer(initialState, action)
        expect(state.getIn(['filters', 'myArray']).toArray()).toExclude('myItem')
      })
    })
  })

  context('and a filter item does not exist', () => {
    const { state: initialState } = setup()

    context('when the filter item is toggled', () => {
      it('is added', () => {
        const action = {
          type: actionType(actionTypes.TOGGLE_FILTER_ITEM, id),
          field: 'myArray',
          value: 'myItem'
        }

        const state = reducer(initialState, action)
        expect(state.getIn(['filters', 'myArray']).toArray()).toInclude('myItem')
      })
    })
  })
})
