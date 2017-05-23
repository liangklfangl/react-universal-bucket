'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updatesCache;

var _simpleComposables = require('../actions/simpleComposables');

var _simpleComposables2 = _interopRequireDefault(_simpleComposables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = {};

function updatesCache(listId, dispatch) {
  var cacheSlice = cache[listId] = cache[listId] || {};
  var actions = (0, _simpleComposables2.default)(listId);

  return {
    update: function update(id, promise) {
      cacheSlice[id] = cacheSlice[id] || 0;
      dispatch(actions.updatingItem(id));
      cacheSlice[id]++;

      return promise.then(function (resp) {
        dispatch(actions.updateComplete(id, --cacheSlice[id]));
        return resp;
      }).catch(function (err) {
        dispatch(actions.updateFailed(id, --cacheSlice[id]));
        throw err;
      });
    }
  };
}