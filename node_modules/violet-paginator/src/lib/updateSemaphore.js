import composables from '../actions/simpleComposables'

const map = {}

export default function updateSemaphore(listId, dispatch) {
  const mapSlice = map[listId] = map[listId] || {}
  const actions = composables(listId)

  return {
    update: (id, promise) => {
      mapSlice[id] = mapSlice[id] || 0
      dispatch(actions.updatingItem(id))
      mapSlice[id]++

      return promise.then(resp => {
        dispatch(actions.updateComplete(id, --mapSlice[id]))
        return resp
      }).catch(err => {
        dispatch(actions.updateFailed(id, --mapSlice[id]))
        throw err
      })
    }
  }
}
