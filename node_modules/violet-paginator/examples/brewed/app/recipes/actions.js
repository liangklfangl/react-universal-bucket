import api from 'ROOT/api'
import * as actionTypes from './actionTypes'
import { composables } from 'violet-paginator'

const pageActions = composables({ listId: 'recipeGrid' })

export default function fetchRecipes(pageInfo) {
  return dispatch =>
    api.recipes.index(pageInfo.query).then(resp => {
      dispatch({ type: actionTypes.CONNECTED })
      return resp
    })
}

export function toggleActive(recipe) {
  const data = { active: !recipe.active }
  const update = new Promise((resolve) => {
    setTimeout(resolve, 1500)
  })

  return dispatch => dispatch(pageActions.updateAsync(recipe.id, data, update))
}
