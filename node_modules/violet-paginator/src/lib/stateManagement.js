import { defaultPaginator } from '../reducer'
import { translate, responseProps } from '../pageInfoTranslator'

const stateMap = {}
const defaultLocator = listId => state => state[listId]
const preload = { results: [] }

const defaultPageParams = () => {
  const [totalCountProp, resultsProp] = responseProps()

  return {
    totalCountProp,
    resultsProp
  }
}

export function registerPaginator({
  listId,
  fetch,
  initialSettings = {},
  pageParams = {},
  locator = defaultLocator(listId)
}) {
  stateMap[listId] = {
    locator,
    fetch,
    initialSettings,
    params: {
      ...defaultPageParams(),
      ...pageParams
    }
  }

  return stateMap[listId]
}

export function getPaginator(listId, state) {
  const config = stateMap[listId] || {
    locator: defaultLocator(listId)
  }

  return config.locator(state) || defaultPaginator
}

export function listConfig(listId) {
  return stateMap[listId]
}

export function preloadedPaginator(state, listId, preloaded = preload) {
  const paginator = getPaginator(listId, state)
  return paginator.equals(defaultPaginator) ? paginator.merge(preloaded) : paginator
}

export function isUpdating(state, listId, itemId) {
  const paginator = getPaginator(listId, state)
  return paginator.get('updating').includes(itemId)
}

export function isRemoving(state, itemId) {
  return state.get('removing').includes(itemId)
}

export function currentQuery(state, listId) {
  return translate(getPaginator(state, listId))
}
