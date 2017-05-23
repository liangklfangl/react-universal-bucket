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
    markItemsErrored: function markItemsErrored(itemIds, error) {
      return {
        type: (0, actionTypes.default)(actionTypes.MARK_ITEMS_ERRORED, id),
        itemIds: itemIds,
        error: error
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
    },
    itemError: function itemError(itemId, error) {
      return {
        type: (0, actionTypes.default)(actionTypes.ITEM_ERROR, id),
        itemId: itemId,
        error: error
      };
    }
  };

  var updateAsync = function updateAsync(itemId, data, update) {
    return function (dispatch, getState) {
      var item = (0, _stateManagement.getPaginator)(id, getState()).get('results').find(function (r) {
        return r.get(identifier) === itemId;
      }) || (0, _immutable.Map)();

      dispatch(basic.updateItem(itemId, data));
      dispatch(basic.updatingItem(itemId));
      return update.then(function (serverUpdate) {
        return dispatch(basic.updateItem(itemId, serverUpdate));
      }).catch(function (err) {
        dispatch(basic.resetItem(itemId, item.toJS()));
        return dispatch(basic.itemError(itemId, err));
      });
    };
  };

  var updateItemsAsync = function updateItemsAsync(itemIds, data, update) {
    var showUpdating = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return function (dispatch, getState) {
      var results = (0, _stateManagement.getPaginator)(id, getState()).get('results');

      dispatch(basic.updateItems(itemIds, data));
      if (showUpdating) {
        dispatch(basic.updatingItems(itemIds));
      }

      return update.then(function (resp) {
        if (showUpdating) {
          dispatch(basic.updateItems(itemIds, data));
        }

        return resp;
      }).catch(function (err) {
        dispatch(basic.resetResults(results.toJS()));
        return dispatch(basic.markItemsErrored(itemIds, err));
      });
    };
  };

  var removeAsync = function removeAsync(itemId, remove) {
    return function (dispatch, getState) {
      var item = (0, _stateManagement.getPaginator)(id, getState()).get('results').find(function (r) {
        return r.get(identifier) === itemId;
      }) || (0, _immutable.Map)();

      dispatch(basic.removingItem(itemId));
      return remove.then(function () {
        return dispatch(basic.removeItem(itemId));
      }).catch(function (err) {
        dispatch(basic.resetItem(itemId, item.toJS()));
        return dispatch(basic.itemError(itemId, err));
      });
    };
  };

  return _extends({}, basic, {
    updateAsync: updateAsync,
    updateItemsAsync: updateItemsAsync,
    removeAsync: removeAsync
  });
}