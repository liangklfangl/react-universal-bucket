import { Map, Set } from 'immutable'
import expect from 'expect'
import {
  isUpdating,
  isRemoving,
  preloadedPaginator,
  currentQuery,
  registerPaginator,
  getPaginator,
  getItem
} from '../src/lib/stateManagement'
import createReducer, { defaultPaginator } from '../src/reducer'
import actionType, * as actionTypes from '../src/actions/actionTypes'
import { translate, responseProps } from '../src/pageInfoTranslator'

const [id, itemId] = ['recipes', 1]
const reducer = createReducer({ listId: id })
const resolve = t => actionType(t, id)
const [totalCountProp, resultsProp] = responseProps()

describe('State management utilities', () => {
  describe('preloadedPaginator', () => {
    const state = { [id]: reducer(undefined) }

    context('when there is no preloaded data', () => {
      const paginator = preloadedPaginator(state, id)

      it('returns the defaultPaginator', () => {
        expect(paginator).toEqual(defaultPaginator)
      })
    })

    context('when preloaded data is supplied', () => {
      const preloaded = {
        results: [{ name: 'Ewe and IPA' }],
        totalCount: 1
      }

      const paginator = preloadedPaginator(state, 'someId', preloaded)

      it('merges the preloaded data', () => {
        expect(paginator).toEqual(defaultPaginator.merge(preloaded))
      })
    })
  })

  describe('registerPaginator', () => {
    it('uses the default param names', () => {
      const { params } = registerPaginator({ listId: 'defaultParams' })

      const expectedParams = {
        totalCountProp,
        resultsProp
      }

      expect(params).toEqual(expectedParams)
    })

    it('allows overriding of resultsProp', () => {
      const config = {
        listId: 'customResultsProp',
        pageParams: {
          resultsProp: 'records'
        }
      }

      const { params } = registerPaginator(config)

      const expectedParams = {
        totalCountProp,
        resultsProp: config.pageParams.resultsProp
      }

      expect(params).toEqual(expectedParams)
    })

    it('allows overriding of totalCountProp', () => {
      const config = {
        listId: 'customtotalCountProp',
        pageParams: {
          totalCountProp: 'total_records'
        }
      }

      const { params } = registerPaginator(config)

      const expectedParams = {
        totalCountProp: config.pageParams.totalCountProp,
        resultsProp
      }

      expect(params).toEqual(expectedParams)
    })

    context('when provided a locator', () => {
      const locator = () => defaultPaginator
      const { locator: registeredLocator } = registerPaginator({
        listId: 'customLocator',
        locator
      })

      it('returns the locator', () => {
        expect(registeredLocator).toEqual(locator)
      })
    })

    context('when not provided a locator', () => {
      const { locator } = registerPaginator({ listId: 'noLocator' })

      it('returns a locator that retrieves state by listId', () => {
        const state = { noLocator: defaultPaginator }
        expect(locator(state)).toEqual(defaultPaginator)
      })
    })
  })

  describe('currentQuery', () => {
    const initialize = {
      type: actionTypes.INITIALIZE_PAGINATOR,
      id
    }

    const state = { pagination: reducer(undefined, initialize) }
    const expectedQuery = translate(getPaginator(state, id))

    it('returns the same query that gets passed to config.fetch', () => {
      expect(currentQuery(state, id)).toEqual(expectedQuery)
    })
  })

  describe('getPaginator', () => {
    const paginator = defaultPaginator.set('pageSize', 50)

    context('when locator is registered', () => {
      beforeEach(() => {
        const locator = state => state.users.grid
        registerPaginator({ listId: 'deeplyNested', locator })
      })

      const state = { users: { grid: paginator } }

      it('uses the locator to lookup the state', () => {
        expect(getPaginator('deeplyNested', state)).toEqual(paginator)
      })
    })

    context('when locator is not registered', () => {
      const userGridId = 'users'
      beforeEach(() => {
        registerPaginator({ listId: userGridId })
      })

      const state = { [userGridId]: paginator }

      it('looks up the state by listId', () => {
        expect(getPaginator(userGridId, state)).toEqual(paginator)
      })
    })

    context('when there is no matching reducer', () => {
      it('returns the defaultPaginator', () => {
        expect(getPaginator('unregisteredId', {})).toEqual(defaultPaginator)
      })
    })
  })

  describe('getItem', () => {
    const record = { id: 1 }
    const config = {
      listId: 'quux',
      initialSettings: {
        results: [record],
        totalCount: 1
      }
    }

    const configuredReducer = createReducer(config)
    const state = { quux: configuredReducer() }

    context('when the item exists', () => {
      const item = getItem(state, 'quux', 1)

      it('returns the item', () => {
        expect(item).toEqual(Map(record))
      })
    })

    context('when the item does not exist', () => {
      const item = getItem(state, 'quux', 2)

      it('returns a blank Map', () => {
        expect(item).toEqual(Map())
      })
    })
  })

  describe('isUpdating', () => {
    context('when an item is updating', () => {
      const configuredReducer = createReducer({
        listId: 'configuredReducer',
        initialSettings: {
          updating: Set.of(itemId)
        }
      })

      const state = { recipes: configuredReducer() }

      it('returns true', () => {
        expect(isUpdating(state, id, itemId)).toBe(true)
      })
    })

    context('when an item is not updating', () => {
      const initialize = {
        type: resolve(actionTypes.INITIALIZE_PAGINATOR)
      }

      const state = reducer(undefined, initialize)

      it('returns false', () => {
        expect(isUpdating(state, itemId)).toBe(false)
      })
    })
  })

  describe('isRemoving', () => {
    context('when an item is being removed', () => {
      const configuredReducer = createReducer({
        listId: 'configuredReducer',
        initialSettings: {
          removing: Set.of(itemId)
        }
      })

      const state = { recipes: configuredReducer() }

      it('returns true', () => {
        expect(isRemoving(state, 'recipes', itemId)).toBe(true)
      })
    })

    context('when an item is not being removed', () => {
      const initialize = {
        type: resolve(actionTypes.INITIALIZE_PAGINATOR)
      }

      const state = reducer(undefined, initialize)

      it('returns false', () => {
        expect(isRemoving(state, itemId)).toBe(false)
      })
    })
  })
})
