import { Map } from 'immutable'
import { resolveEach } from 'redux-resolver'
import * as actionTypes from './actionTypes'

const initialState = Map({
  connected: false
})

function connected(state) {
  return state.set('connected', true)
}

export default resolveEach(initialState, {
  [actionTypes.CONNECTED]: connected
})
