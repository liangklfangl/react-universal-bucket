'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchingComposables;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _actionTypes = require('./actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

var _pageInfoTranslator = require('../pageInfoTranslator');

var _stateManagement = require('../lib/stateManagement');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetcher = function fetcher(id) {
  return function (dispatch, getState) {
    var _listConfig = (0, _stateManagement.listConfig)(id),
        fetch = _listConfig.fetch,
        params = _listConfig.params;

    var pageInfo = (0, _stateManagement.getPaginator)(id, getState());
    var requestId = _uuid2.default.v1();

    dispatch({ type: (0, actionTypes.default)(actionTypes.FETCH_RECORDS, id), requestId: requestId });

    var promise = dispatch(fetch((0, _pageInfoTranslator.translate)(pageInfo)));

    return promise.then(function (resp) {
      return dispatch({
        type: (0, actionTypes.default)(actionTypes.RESULTS_UPDATED, id),
        results: resp.data[params.resultsProp],
        totalCount: resp.data[params.totalCountProp],
        requestId: requestId
      });
    }).catch(function (error) {
      return dispatch({
        type: (0, actionTypes.default)(actionTypes.RESULTS_UPDATED_ERROR, id),
        error: error
      });
    });
  };
};

function fetchingComposables(config) {
  var id = config.listId;
  var resolve = function resolve(t) {
    return (0, actionTypes.default)(t, id);
  };

  return {
    initialize: function initialize() {
      return {
        type: resolve(actionTypes.INITIALIZE_PAGINATOR),
        preloaded: config.preloaded
      };
    },
    reload: function reload() {
      return fetcher(id);
    },
    next: function next() {
      return {
        type: resolve(actionTypes.NEXT_PAGE)
      };
    },
    prev: function prev() {
      return {
        type: resolve(actionTypes.PREVIOUS_PAGE)
      };
    },
    goTo: function goTo(page) {
      return {
        type: resolve(actionTypes.GO_TO_PAGE),
        page: page
      };
    },
    setPageSize: function setPageSize(size) {
      return {
        type: resolve(actionTypes.SET_PAGE_SIZE),
        size: size
      };
    },
    toggleFilterItem: function toggleFilterItem(field, value) {
      return {
        type: resolve(actionTypes.TOGGLE_FILTER_ITEM),
        field: field,
        value: value
      };
    },
    setFilter: function setFilter(field, value) {
      return {
        type: resolve(actionTypes.SET_FILTER),
        field: field,
        value: value
      };
    },
    setFilters: function setFilters(filters) {
      return {
        type: resolve(actionTypes.SET_FILTERS),
        filters: filters
      };
    },
    resetFilters: function resetFilters(filters) {
      return {
        type: resolve(actionTypes.RESET_FILTERS),
        filters: filters
      };
    },
    sort: function sort(field, reverse) {
      return {
        type: resolve(actionTypes.SORT_CHANGED),
        field: field,
        reverse: reverse
      };
    }
  };
}