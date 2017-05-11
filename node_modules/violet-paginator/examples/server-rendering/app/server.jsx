import Immutable from 'immutable'
import path from 'path'
import express from 'express'
import React from 'react'
import { createPaginator } from 'violet-paginator'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import config from './recipesConfig'
import App from './App'
import template from './template'

const app = express()
const port = 9999

app.use('/assets', express.static('assets'));
app.use(handleRender)

function handleRender(req, resp) {
  const reducer = combineReducers({
    recipes: createPaginator(config)
  })

  const store = createStore(reducer, compose(applyMiddleware(thunk)))

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  resp.send(template({
    body: html,
    preloadedState: store.getState()
  }))
}

app.listen(port)
