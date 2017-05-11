import * as actionTypes from './actionTypes'
import simpleComposables from './simpleComposables'
import fetchingComposables from './fetchingComposables'

export function expireAll() {
  return {
    type: actionTypes.EXPIRE_ALL
  }
}

export default function composables(config) {
  return {
    ...fetchingComposables(config),
    ...simpleComposables(config.listId)
  }
}
