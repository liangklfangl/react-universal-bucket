'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSemaphore;

var _simpleComposables = require('../actions/simpleComposables');

var _simpleComposables2 = _interopRequireDefault(_simpleComposables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = {};

function updateSemaphore(listId, dispatch) {
  var mapSlice = map[listId] = map[listId] || {};
  var actions = (0, _simpleComposables2.default)(listId);

  return {
    update: function update(id, promise) {
      mapSlice[id] = mapSlice[id] || 0;
      dispatch(actions.updatingItem(id));
      mapSlice[id]++;

      return promise.then(function (resp) {
        dispatch(actions.updateComplete(id, --mapSlice[id]));
        return resp;
      }).catch(function (err) {
        dispatch(actions.updateFailed(id, --mapSlice[id]));
        throw err;
      });
    }
  };
}