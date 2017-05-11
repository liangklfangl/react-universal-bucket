# ReduxResolver

Love Redux but hate switch statements? ReduxResolver provides functions that allow you to write your reducers as dictionaries.

## Installation

```
npm i --save redux-resolver
```

## Usage

### resolveEach

```javascript
import { Map } from 'immutable'
import { resolveEach } from 'redux-resolver'
import * as actionTypes from './actionTypes'

const initialState = Map({
  page: 1
})

function prev(state) {
  return state.set('page', Math.max(1, state.get('page') - 1))
}

function next(state) {
  return state.set('page', state.get('page') + 1)
}

function goToPage(state, action) {
  return state.set('page', action.page)
}

export default resolveEach(initialState, {
  [actionTypes.PREVIOUS_PAGE]: prev,
  [actionTypes.NEXT_PAGE]: next,
  [actionTypes.GO_TO_PAGE]: goToPage
})
```

### resolveAll

```javascript
import { Map } from 'immutable'
import { resolveAll } from 'redux-resolver'
import * as actionTypes from './actionTypes'

const initialState = Map({
  page: 1
})

export default resolveAll(initialState, (state, action) => ({
  [actionTypes.PREVIOUS_PAGE]: () => state.set('page', Math.max(1, state.get('page') - 1)),
  [actionTypes.NEXT_PAGE]: () => state.set('page', state.get('page') + 1),
  [actionTypes.GO_TO_PAGE]: () => state.set('page', action.page)
}))
```
