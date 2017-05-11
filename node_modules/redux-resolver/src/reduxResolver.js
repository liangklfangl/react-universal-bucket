export function resolveAll(initialState, register) {
  return function resolve(state = initialState, action = {}, handlers = register(state, action)) {
    return handlers[action.type] ? handlers[action.type]() : state
  }
}

export function resolveEach(initialState, handlers) {
  return function resolve(state = initialState, action = {}) {
    return handlers[action.type] ? handlers[action.type](state, action) : state
  }
}
