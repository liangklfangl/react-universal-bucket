import { Map } from 'immutable'
import { recordProps } from '../pageInfoTranslator'
import actionType, * as actionTypes from './actionTypes'
import { getPaginator } from '../lib/stateManagement'
import semaphore from '../lib/updateSemaphore'

const { identifier } = recordProps()

export default function simpleComposables(id) {
  const basic = {
    expire: () => ({
      type: actionType(actionTypes.EXPIRE_PAGINATOR, id)
    }),
    updatingItem: (itemId) => ({
      type: actionType(actionTypes.UPDATING_ITEM, id),
      itemId
    }),
    updateItem: (itemId, data) => ({
      type: actionType(actionTypes.UPDATE_ITEM, id),
      itemId,
      data
    }),
    updatingItems: (itemIds) => ({
      type: actionType(actionTypes.UPDATING_ITEMS, id),
      itemIds
    }),
    updateItems: (itemIds, data) => ({
      type: actionType(actionTypes.UPDATE_ITEMS, id),
      itemIds,
      data
    }),
    updateComplete: (itemId, updatesRemaining) => ({
      type: actionType(actionTypes.UPDATE_COMPLETE, id),
      itemId,
      updatesRemaining
    }),
    updateFailed: (itemId, updatesRemaining) => ({
      type: actionType(actionTypes.UPDATE_FAILED, itemId),
      id,
      updatesRemaining
    }),
    massUpdateComplete: (itemIds) => ({
      type: actionType(actionTypes.MASS_UPDATE_COMPLETE, id),
      itemIds
    }),
    massUpdateFailed: (itemIds) => ({
      type: actionType(actionTypes.MASS_UPDATE_FAILED, id),
      itemIds
    }),
    resetItem: (itemId, data) => ({
      type: actionType(actionTypes.RESET_ITEM, id),
      itemId,
      data
    }),
    updatingAll: () => ({
      type: actionType(actionTypes.UPDATING_ALL, id)
    }),
    updateAll: (data) => ({
      type: actionType(actionTypes.UPDATE_ALL, id),
      data
    }),
    resetResults: (results) => ({
      type: actionType(actionTypes.RESET_RESULTS, id),
      results
    }),
    removingItem: (itemId) => ({
      type: actionType(actionTypes.REMOVING_ITEM, id),
      itemId
    }),
    removeItem: (itemId) => ({
      type: actionType(actionTypes.REMOVE_ITEM, id),
      itemId
    })
  }

  const updateAsync = (itemId, data, update) =>
    (dispatch, getState) => {
      const sem = semaphore(id, dispatch)

      const item = getPaginator(id, getState()).get('results')
        .find(r => r.get(identifier) === itemId) || Map()

      dispatch(basic.updateItem(itemId, data))

      return sem.update(itemId, update).catch(err => {
        dispatch(basic.resetItem(itemId, item.toJS()))
        throw err
      })
    }

  const updateItemsAsync = (itemIds, data, update) =>
    (dispatch, getState) => {
      const results = getPaginator(id, getState()).get('results')

      dispatch(basic.updateItems(itemIds, data))
      dispatch(basic.updatingItems(itemIds))

      return update.then(resp => {
        dispatch(basic.massUpdateComplete(itemIds))
        return resp
      }).catch(err => {
        dispatch(basic.massUpdateFailed(itemIds))
        dispatch(basic.resetResults(results.toJS()))
        throw err
      })
    }

  const removeAsync = (itemId, remove, expire = true) =>
    (dispatch, getState) => {
      const item = getPaginator(id, getState()).get('results')
        .find(r => r.get(identifier) === itemId) || Map()

      dispatch(basic.removingItem(itemId))
      return remove.then(resp => {
        if (expire) {
          dispatch(basic.expire())
        } else {
          dispatch(basic.removeItem(itemId))
        }

        return resp
      }).catch(err => {
        dispatch(basic.resetItem(itemId, item.toJS()))
        throw err
      })
    }

  return {
    ...basic,
    updateAsync,
    updateItemsAsync,
    removeAsync
  }
}

