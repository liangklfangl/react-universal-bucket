'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = simpleComposables;

var _immutable = require('immutable');

var _pageInfoTranslator = require('../pageInfoTranslator');

var _actionTypes = require('./actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

var _stateManagement = require('../lib/stateManagement');

var _updateSemaphore = require('../lib/updateSemaphore');

var _updateSemaphore2 = _interopRequireDefault(_updateSemaphore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _recordProps = (0, _pageInfoTranslator.recordProps)(),
    identifier = _recordProps.identifier;

function simpleComposables(id) {
  var basic = {
    expire: function expire() {
      return {
        type: (0, actionTypes.default)(actionTypes.EXPIRE_PAGINATOR, id)
      };
    },
    updatingItem: function updatingItem(itemId) {
      return {
        type: (0, actionTypes.default)(actionTypes.UPDATING_ITEM, id),
        itemId: itemId
      };
    },
    updateItem: function updateItem(itemId, data) {
      return {
        type: (0, actionTypes.default)(actionTypes.UPDATE_ITEM, id),
        itemId: itemId,
        data: data
      };
    },
    updatingItems: function updatingItems(itemIds) {
      return {
        type: (0, actionTypes.default)(actionTypes.UPDATING_ITEMS, id),
        itemIds: itemIds
      };
    },
    updateItems: function updateItems(itemIds, data) {
      return {
        type: (0, actionTypes.default)(actionTypes.UPDATE_ITEMS, id),
        itemIds: itemIds,
        data: data
      };
    },
    updateComplete: function updateComplete(itemId, updatesRemaining) {
      return {
        type: (0, actionTypes.default)(actionTypes.UPDATE_COMPLETE, id),
        itemId: itemId,
        updatesRemaining: updatesRemaining
      };
    },
    updateFailed: function updateFailed(itemId, updatesRemaining) {
      return {
        type: (0, actionTypes.default)(actionTypes.UPDATE_FAILED, itemId),
        id: id,
        updatesRemaining: updatesRemaining
      };
    },
    massUpdateComplete: function massUpdateComplete(itemIds) {
      return {
        type: (0, actionTypes.default)(actionTypes.MASS_UPDATE_COMPLETE, id),
        itemIds: itemIds
      };
    },
    massUpdateFailed: function massUpdateFailed(itemIds) {
      return {
        type: (0, actionTypes.default)(actionTypes.MASS_UPDATE_FAILED, id),
        itemIds: itemIds
      };
    },
    resetItem: function resetItem(itemId, data) {
      return {
        type: (0, actionTypes.default)(actionTypes.RESET_ITEM, id),
        itemId: itemId,
        data: data
      };
    },
    updatingAll: function updatingAll() {
      return {
        type: (0, actionTypes.default)(actionTypes.UPDATING_ALL, id)
      };
    },
    updateAll: function updateAll(data) {
      return {
        type: (0, actionTypes.default)(actionTypes.UPDATE_ALL, id),
        data: data
      };
    },
    resetResults: function resetResults(results) {
      return {
        type: (0, actionTypes.default)(actionTypes.RESET_RESULTS, id),
        results: results
      };
    },
    removingItem: function removingItem(itemId) {
      return {
        type: (0, actionTypes.default)(actionTypes.REMOVING_ITEM, id),
        itemId: itemId
      };
    },
    removeItem: function removeItem(itemId) {
      return {
        type: (0, actionTypes.default)(actionTypes.REMOVE_ITEM, id),
        itemId: itemId
      };
    }
  };

  var updateAsync = function updateAsync(itemId, data, update) {
    return function (dispatch, getState) {
      var sem = (0, _updateSemaphore2.default)(id, dispatch);

      var item = (0, _stateManagement.getPaginator)(id, getState()).get('results').find(function (r) {
        return r.get(identifier) === itemId;
      }) || (0, _immutable.Map)();

      dispatch(basic.updateItem(itemId, data));

      return sem.update(itemId, update).catch(function (err) {
        dispatch(basic.resetItem(itemId, item.toJS()));
        throw err;
      });
    };
  };

  var updateItemsAsync = function updateItemsAsync(itemIds, data, update) {
    return function (dispatch, getState) {
      var results = (0, _stateManagement.getPaginator)(id, getState()).get('results');

      dispatch(basic.updateItems(itemIds, data));
      dispatch(basic.updatingItems(itemIds));

      return update.then(function (resp) {
        dispatch(basic.massUpdateComplete(itemIds));
        return resp;
      }).catch(function (err) {
        dispatch(basic.massUpdateFailed(itemIds));
        dispatch(basic.resetResults(results.toJS()));
        throw err;
      });
    };
  };

  var removeAsync = function removeAsync(itemId, remove) {
    var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return function (dispatch, getState) {
      var item = (0, _stateManagement.getPaginator)(id, getState()).get('results').find(function (r) {
        return r.get(identifier) === itemId;
      }) || (0, _immutable.Map)();

      dispatch(basic.removingItem(itemId));
      return remove.then(function (resp) {
        if (expire) {
          dispatch(basic.expire());
        } else {
          dispatch(basic.removeItem(itemId));
        }

        return resp;
      }).catch(function (err) {
        dispatch(basic.resetItem(itemId, item.toJS()));
        throw err;
      });
    };
  };

  return _extends({}, basic, {
    updateAsync: updateAsync,
    updateItemsAsync: updateItemsAsync,
    removeAsync: removeAsync
  });
}