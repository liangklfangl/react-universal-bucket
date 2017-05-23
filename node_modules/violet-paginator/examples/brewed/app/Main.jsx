import React from 'react'
import ReactDOM from 'react-dom'

import thunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { loadTranslations, setLocale, syncTranslationWithStore, I18n } from 'react-redux-i18n'

import '../styles.scss'

import translations from 'CONF/locales'
import { configurePageParams } from 'violet-paginator'

import reducers from './reducers'
import App from './App'

configurePageParams({
  perPage: 'results_per_page',
  sortOrder: 'sort_reverse',
  sortReverse: true
})

const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState().recipeGrid.toJS())
  console.groupEnd(action.type)
  return result
}

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk, logger), devtools)
)

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations))
store.dispatch(setLocale('en')) // TODO: resolve dynamically

ReactDOM.render((
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
), document.getElementById('app'))
