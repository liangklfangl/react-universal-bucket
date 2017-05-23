import api from 'ROOT/api'
import * as actionTypes from './actionTypes'

export default function fetchRecipes(pageInfo) {
  return dispatch =>
    api.recipes.index(pageInfo.query).then(resp => {
      dispatch({ type: actionTypes.CONNECTED })
      return resp
    })
}

