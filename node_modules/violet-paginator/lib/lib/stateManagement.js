'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.registerPaginator = registerPaginator;
exports.getPaginator = getPaginator;
exports.getItem = getItem;
exports.listConfig = listConfig;
exports.preloadedPaginator = preloadedPaginator;
exports.isUpdating = isUpdating;
exports.isRemoving = isRemoving;
exports.currentQuery = currentQuery;

var _immutable = require('immutable');

var _reducer = require('../reducer');

var _pageInfoTranslator = require('../pageInfoTranslator');

var stateMap = {};
var defaultLocator = function defaultLocator(listId) {
  return function (state) {
    return state[listId];
  };
};
var preload = { results: [] };

var defaultPageParams = function defaultPageParams() {
  var _responseProps = (0, _pageInfoTranslator.responseProps)(),
      _responseProps2 = _slicedToArray(_responseProps, 2),
      totalCountProp = _responseProps2[0],
      resultsProp = _responseProps2[1];

  return {
    totalCountProp: totalCountProp,
    resultsProp: resultsProp
  };
};

function registerPaginator(_ref) {
  var listId = _ref.listId,
      fetch = _ref.fetch,
      _ref$initialSettings = _ref.initialSettings,
      initialSettings = _ref$initialSettings === undefined ? {} : _ref$initialSettings,
      _ref$pageParams = _ref.pageParams,
      pageParams = _ref$pageParams === undefined ? {} : _ref$pageParams,
      _ref$locator = _ref.locator,
      locator = _ref$locator === undefined ? defaultLocator(listId) : _ref$locator;

  stateMap[listId] = {
    locator: locator,
    fetch: fetch,
    initialSettings: initialSettings,
    params: _extends({}, defaultPageParams(), pageParams)
  };

  return stateMap[listId];
}

function getPaginator(listId, state) {
  var config = stateMap[listId] || {
    locator: defaultLocator(listId)
  };

  return config.locator(state) || _reducer.defaultPaginator;
}

function getItem(state, listId, itemId) {
  return getPaginator(listId, state).get('results').find(function (r) {
    return r.get((0, _pageInfoTranslator.recordProps)().identifier) === itemId;
  }, undefined, (0, _immutable.Map)());
}

function listConfig(listId) {
  return stateMap[listId];
}

function preloadedPaginator(state, listId) {
  var preloaded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : preload;

  var paginator = getPaginator(listId, state);
  return paginator.equals(_reducer.defaultPaginator) ? paginator.merge(preloaded) : paginator;
}

function isUpdating(state, listId, itemId) {
  var paginator = getPaginator(listId, state);
  return paginator.get('updating').includes(itemId) || paginator.get('massUpdating').includes(itemId);
}

function isRemoving(state, listId, itemId) {
  return getPaginator(listId, state).get('removing').includes(itemId);
}

function currentQuery(state, listId) {
  return (0, _pageInfoTranslator.translate)(getPaginator(state, listId));
}