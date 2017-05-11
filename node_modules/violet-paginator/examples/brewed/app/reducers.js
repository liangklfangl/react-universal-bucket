import { i18nReducer } from 'react-redux-i18n'
import { combineReducers } from 'redux'
import { createPaginator } from 'violet-paginator'
import recipes from './recipes/reducer'
import fetch from './recipes/actions'

export default combineReducers({
  recipes,
  recipeGrid: createPaginator({
    listId: 'recipeGrid',
    fetch
  }),
  i18n: i18nReducer
})
