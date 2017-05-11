import Immutable from 'immutable'
import React from 'react'
import { render } from 'react-dom'
import { createPaginator } from 'violet-paginator'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import config from './recipesConfig'
import App from './App'

const preloadedState = window.__PRELOADED_STATE__
console.log(preloadedState)
const reducer = combineReducers({
  recipes: createPaginator(config)
})

const store = createStore(reducer, {
  recipes: Immutable.fromJS(preloadedState.recipes)
}, compose(applyMiddleware(thunk)))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

