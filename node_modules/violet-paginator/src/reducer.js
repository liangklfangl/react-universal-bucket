import Immutable, { Map, List, Set } from 'immutable'
import { resolveEach } from 'redux-resolver'
import { updateListItem } from './lib/reduxResolver'
import actionType, * as actionTypes from './actions/actionTypes'
import { recordProps } from './pageInfoTranslator'
import { registerPaginator } from './lib/stateManagement'

export const defaultPaginator = Map({
  initialized: false,
  page: 1,
  pageSize: 15,
  totalCount: 0,
  sort: '',
  sortReverse: false,
  isLoading: false,
  stale: false,
  results: List(),
  updating: Set(),
  massUpdating: Set(),
  removing: Set(),
  requestId: null,
  loadError: null,
  filters: Map()
})

function initialize(state, action) {
  return state.merge({
    initialized: true,
    stale: !action.preloaded,
    ...(action.preloaded || {})
  })
}

function expire(state) {
  return state.merge({ stale: true, loadError: null })
}

function next(state) {
  return expire(state.set('page', state.get('page') + 1))
}

function prev(state) {
  return expire(state.set('page', state.get('page') - 1))
}

function goToPage(state, action) {
  return expire(state.set('page', action.page))
}

function setPageSize(state, action) {
  return expire(
    state.merge({
      pageSize: action.size,
      page: 1
    })
  )
}

function toggleFilterItem(state, action) {
  const items = state.getIn(['filters', action.field], Set()).toSet()

  return expire(
    state.set('page', 1).setIn(
      ['filters', action.field],
      items.includes(action.value) ? items.delete(action.value) :items.add(action.value)
    )
  )
}

function setFilter(state, action) {
  return expire(
    state.setIn(
      ['filters', action.field],
      Immutable.fromJS(action.value)
    ).set('page', 1)
  )
}

function setFilters(state, action) {
  return expire(
    state.set(
      'filters',
      state.get('filters').merge(action.filters)
    ).set('page', 1)
  )
}

function resetFilters(state, action) {
  return expire(
    state.set(
      'filters',
      Immutable.fromJS(action.filters || {})
    ).set('page', 1)
  )
}

function sortChanged(state, action) {
  return expire(
    state.merge({
      sort: action.field,
      sortReverse: action.reverse,
      page: 1
    })
  )
}

function fetching(state, action) {
  return state.merge({
    isLoading: true,
    requestId: action.requestId
  })
}

function updateResults(state, action) {
  if (action.requestId !== state.get('requestId')) {
    return state
  }

  return state.merge({
    results: Immutable.fromJS(action.results),
    totalCount: action.totalCount,
    isLoading: false,
    stale: false
  })
}

function resetResults(state, action) {
  return state.set('results', Immutable.fromJS(action.results))
}

function error(state, action) {
  return state.merge({
    isLoading: false,
    loadError: action.error
  })
}

function updatingItem(state, action) {
  return state.set('updating', state.get('updating').add(action.itemId))
}

function updateItem(state, action) {
  return state.merge({
    results: updateListItem(
      state.get('results'), action.itemId,
      item => item.merge(action.data),
      recordProps().identifier
    )
  })
}

function updateComplete(state, action) {
  if (action.updatesRemaining > 0) {
    return state
  }

  const updating = state.get('updating')
  return state.set('updating', updating.delete(action.itemId))
}

function updateItems(state, action) {
  const { itemIds } = action

  return state.merge({
    results: state.get('results').map(r => {
      if (itemIds.includes(r.get(recordProps().identifier))) {
        return r.merge(action.data)
      }

      return r
    })
  })
}

function updatingItems(state, action) {
  const { itemIds } = action

  return state.set('massUpdating', state.get('massUpdating').union(itemIds))
}

function massUpdateComplete(state, action) {
  const { itemIds } = action

  return state.set('massUpdating', state.get('massUpdating').subtract(itemIds))
}

function resetItem(state, action) {
  return state.merge({
    results: updateListItem(
      state.get('results'), action.itemId,
      () => Immutable.fromJS(action.data),
      recordProps().identifier
    )
  })
}

function removingItem(state, action) {
  return state.set('removing', state.get('removing').add(action.itemId))
}

function removeItem(state, action) {
  return state.merge({
    totalCount: state.get('totalCount') - 1,
    removing: state.get('removing').toSet().delete(action.itemId),
    results: state.get('results').filter(
      item => item.get(recordProps().identifier) !== action.itemId
    )
  })
}

export default function createPaginator(config) {
  const { initialSettings } = registerPaginator(config)
  const { augmentWith = {} } = config
  const resolve = t => actionType(t, config.listId)

  return resolveEach(defaultPaginator.merge(initialSettings), {
    ...augmentWith,
    [actionTypes.EXPIRE_ALL]: expire,
    [resolve(actionTypes.INITIALIZE_PAGINATOR)]: initialize,
    [resolve(actionTypes.EXPIRE_PAGINATOR)]: expire,
    [resolve(actionTypes.PREVIOUS_PAGE)]: prev,
    [resolve(actionTypes.NEXT_PAGE)]: next,
    [resolve(actionTypes.GO_TO_PAGE)]: goToPage,
    [resolve(actionTypes.SET_PAGE_SIZE)]: setPageSize,
    [resolve(actionTypes.FETCH_RECORDS)]: fetching,
    [resolve(actionTypes.RESULTS_UPDATED)]: updateResults,
    [resolve(actionTypes.RESULTS_UPDATED_ERROR)]: error,
    [resolve(actionTypes.TOGGLE_FILTER_ITEM)]: toggleFilterItem,
    [resolve(actionTypes.SET_FILTER)]: setFilter,
    [resolve(actionTypes.SET_FILTERS)]: setFilters,
    [resolve(actionTypes.RESET_FILTERS)]: resetFilters,
    [resolve(actionTypes.SORT_CHANGED)]: sortChanged,
    [resolve(actionTypes.UPDATING_ITEM)]: updatingItem,
    [resolve(actionTypes.UPDATE_ITEM)]: updateItem,
    [resolve(actionTypes.UPDATING_ITEMS)]: updatingItems,
    [resolve(actionTypes.UPDATE_ITEMS)]: updateItems,
    [resolve(actionTypes.UPDATE_COMPLETE)]: updateComplete,
    [resolve(actionTypes.UPDATE_FAILED)]: updateComplete,
    [resolve(actionTypes.MASS_UPDATE_COMPLETE)]: massUpdateComplete,
    [resolve(actionTypes.MASS_UPDATE_FAILED)]: massUpdateComplete,
    [resolve(actionTypes.RESET_ITEM)]: resetItem,
    [resolve(actionTypes.RESET_RESULTS)]: resetResults,
    [resolve(actionTypes.REMOVING_ITEM)]: removingItem,
    [resolve(actionTypes.REMOVE_ITEM)]: removeItem
  })
}
