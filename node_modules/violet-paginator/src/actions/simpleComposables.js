import { Map } from 'immutable'
import { recordProps } from '../pageInfoTranslator'
import actionType, * as actionTypes from './actionTypes'
import { getPaginator } from '../lib/stateManagement'

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
    markItemsErrored: (itemIds, error) => ({
      type: actionType(actionTypes.MARK_ITEMS_ERRORED, id),
      itemIds,
      error
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
    }),
    itemError: (itemId, error) => ({
      type: actionType(actionTypes.ITEM_ERROR, id),
      itemId,
      error
    })
  }

  const updateAsync = (itemId, data, update) =>
    (dispatch, getState) => {
      const item = getPaginator(id, getState()).get('results')
        .find(r => r.get(identifier) === itemId) || Map()

      dispatch(basic.updateItem(itemId, data))
      dispatch(basic.updatingItem(itemId))
      return update.then(serverUpdate =>
        dispatch(basic.updateItem(itemId, serverUpdate))
      ).catch(err => {
        dispatch(basic.resetItem(itemId, item.toJS()))
        return dispatch(basic.itemError(itemId, err))
      })
    }

  const updateItemsAsync = (itemIds, data, update, showUpdating = true) =>
    (dispatch, getState) => {
      const results = getPaginator(id, getState()).get('results')

      dispatch(basic.updateItems(itemIds, data))
      if (showUpdating) {
        dispatch(basic.updatingItems(itemIds))
      }

      return update.then(resp => {
        if (showUpdating) {
          dispatch(basic.updateItems(itemIds, data))
        }

        return resp
      }).catch(err => {
        dispatch(basic.resetResults(results.toJS()))
        return dispatch(basic.markItemsErrored(itemIds, err))
      })
    }

  const removeAsync = (itemId, remove) =>
    (dispatch, getState) => {
      const item = getPaginator(id, getState()).get('results')
        .find(r => r.get(identifier) === itemId) || Map()

      dispatch(basic.removingItem(itemId))
      return remove.then(() =>
        dispatch(basic.removeItem(itemId))
      ).catch(err => {
        dispatch(basic.resetItem(itemId, item.toJS()))
        return dispatch(basic.itemError(itemId, err))
      })
    }

  return {
    ...basic,
    updateAsync,
    updateItemsAsync,
    removeAsync
  }
}

