"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveAll = resolveAll;
exports.resolveEach = resolveEach;
function resolveAll(initialState, register) {
  return function resolve() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var handlers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : register(state, action);

    return handlers[action.type] ? handlers[action.type]() : state;
  };
}

function resolveEach(initialState, handlers) {
  return function resolve() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return handlers[action.type] ? handlers[action.type](state, action) : state;
  };
}