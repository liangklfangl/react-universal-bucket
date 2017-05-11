'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultPaginator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createPaginator;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxResolver = require('redux-resolver');

var _reduxResolver2 = require('./lib/reduxResolver');

var _actionTypes = require('./actions/actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

var _pageInfoTranslator = require('./pageInfoTranslator');

var _stateManagement = require('./lib/stateManagement');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultPaginator = exports.defaultPaginator = (0, _immutable.Map)({
  initialized: false,
  page: 1,
  pageSize: 15,
  totalCount: 0,
  sort: '',
  sortReverse: false,
  isLoading: false,
  stale: false,
  results: (0, _immutable.List)(),
  updating: (0, _immutable.Set)(),
  massUpdating: (0, _immutable.Set)(),
  removing: (0, _immutable.Set)(),
  requestId: null,
  loadError: null,
  filters: (0, _immutable.Map)()
});

function initialize(state, action) {
  return state.merge(_extends({
    initialized: true,
    stale: !action.preloaded
  }, action.preloaded || {}));
}

function expire(state) {
  return state.merge({ stale: true, loadError: null });
}

function next(state) {
  return expire(state.set('page', state.get('page') + 1));
}

function prev(state) {
  return expire(state.set('page', state.get('page') - 1));
}

function goToPage(state, action) {
  return expire(state.set('page', action.page));
}

function setPageSize(state, action) {
  return expire(state.merge({
    pageSize: action.size,
    page: 1
  }));
}

function toggleFilterItem(state, action) {
  var items = state.getIn(['filters', action.field], (0, _immutable.Set)()).toSet();

  return expire(state.set('page', 1).setIn(['filters', action.field], items.includes(action.value) ? items.delete(action.value) : items.add(action.value)));
}

function setFilter(state, action) {
  return expire(state.setIn(['filters', action.field], _immutable2.default.fromJS(action.value)).set('page', 1));
}

function setFilters(state, action) {
  return expire(state.set('filters', state.get('filters').merge(action.filters)).set('page', 1));
}

function resetFilters(state, action) {
  return expire(state.set('filters', _immutable2.default.fromJS(action.filters || {})).set('page', 1));
}

function sortChanged(state, action) {
  return expire(state.merge({
    sort: action.field,
    sortReverse: action.reverse,
    page: 1
  }));
}

function fetching(state, action) {
  return state.merge({
    isLoading: true,
    requestId: action.requestId
  });
}

function updateResults(state, action) {
  if (action.requestId !== state.get('requestId')) {
    return state;
  }

  return state.merge({
    results: _immutable2.default.fromJS(action.results),
    totalCount: action.totalCount,
    isLoading: false,
    stale: false
  });
}

function resetResults(state, action) {
  return state.set('results', _immutable2.default.fromJS(action.results));
}

function error(state, action) {
  return state.merge({
    isLoading: false,
    loadError: action.error
  });
}

function updatingItem(state, action) {
  return state.set('updating', state.get('updating').add(action.itemId));
}

function updateItem(state, action) {
  return state.merge({
    results: (0, _reduxResolver2.updateListItem)(state.get('results'), action.itemId, function (item) {
      return item.merge(action.data);
    }, (0, _pageInfoTranslator.recordProps)().identifier)
  });
}

function updateComplete(state, action) {
  if (action.updatesRemaining > 0) {
    return state;
  }

  var updating = state.get('updating');
  return state.set('updating', updating.delete(action.itemId));
}

function updateItems(state, action) {
  var itemIds = action.itemIds;


  return state.merge({
    results: state.get('results').map(function (r) {
      if (itemIds.includes(r.get((0, _pageInfoTranslator.recordProps)().identifier))) {
        return r.merge(action.data);
      }

      return r;
    })
  });
}

function updatingItems(state, action) {
  var itemIds = action.itemIds;


  return state.set('massUpdating', state.get('massUpdating').union(itemIds));
}

function massUpdateComplete(state, action) {
  var itemIds = action.itemIds;


  return state.set('massUpdating', state.get('massUpdating').subtract(itemIds));
}

function resetItem(state, action) {
  return state.merge({
    results: (0, _reduxResolver2.updateListItem)(state.get('results'), action.itemId, function () {
      return _immutable2.default.fromJS(action.data);
    }, (0, _pageInfoTranslator.recordProps)().identifier)
  });
}

function removingItem(state, action) {
  return state.set('removing', state.get('removing').add(action.itemId));
}

function removeItem(state, action) {
  return state.merge({
    totalCount: state.get('totalCount') - 1,
    removing: state.get('removing').toSet().delete(action.itemId),
    results: state.get('results').filter(function (item) {
      return item.get((0, _pageInfoTranslator.recordProps)().identifier) !== action.itemId;
    })
  });
}

function createPaginator(config) {
  var _extends2;

  var _registerPaginator = (0, _stateManagement.registerPaginator)(config),
      initialSettings = _registerPaginator.initialSettings;

  var _config$augmentWith = config.augmentWith,
      augmentWith = _config$augmentWith === undefined ? {} : _config$augmentWith;

  var resolve = function resolve(t) {
    return (0, actionTypes.default)(t, config.listId);
  };

  return (0, _reduxResolver.resolveEach)(defaultPaginator.merge(initialSettings), _extends({}, augmentWith, (_extends2 = {}, _defineProperty(_extends2, actionTypes.EXPIRE_ALL, expire), _defineProperty(_extends2, resolve(actionTypes.INITIALIZE_PAGINATOR), initialize), _defineProperty(_extends2, resolve(actionTypes.EXPIRE_PAGINATOR), expire), _defineProperty(_extends2, resolve(actionTypes.PREVIOUS_PAGE), prev), _defineProperty(_extends2, resolve(actionTypes.NEXT_PAGE), next), _defineProperty(_extends2, resolve(actionTypes.GO_TO_PAGE), goToPage), _defineProperty(_extends2, resolve(actionTypes.SET_PAGE_SIZE), setPageSize), _defineProperty(_extends2, resolve(actionTypes.FETCH_RECORDS), fetching), _defineProperty(_extends2, resolve(actionTypes.RESULTS_UPDATED), updateResults), _defineProperty(_extends2, resolve(actionTypes.RESULTS_UPDATED_ERROR), error), _defineProperty(_extends2, resolve(actionTypes.TOGGLE_FILTER_ITEM), toggleFilterItem), _defineProperty(_extends2, resolve(actionTypes.SET_FILTER), setFilter), _defineProperty(_extends2, resolve(actionTypes.SET_FILTERS), setFilters), _defineProperty(_extends2, resolve(actionTypes.RESET_FILTERS), resetFilters), _defineProperty(_extends2, resolve(actionTypes.SORT_CHANGED), sortChanged), _defineProperty(_extends2, resolve(actionTypes.UPDATING_ITEM), updatingItem), _defineProperty(_extends2, resolve(actionTypes.UPDATE_ITEM), updateItem), _defineProperty(_extends2, resolve(actionTypes.UPDATING_ITEMS), updatingItems), _defineProperty(_extends2, resolve(actionTypes.UPDATE_ITEMS), updateItems), _defineProperty(_extends2, resolve(actionTypes.UPDATE_COMPLETE), updateComplete), _defineProperty(_extends2, resolve(actionTypes.UPDATE_FAILED), updateComplete), _defineProperty(_extends2, resolve(actionTypes.MASS_UPDATE_COMPLETE), massUpdateComplete), _defineProperty(_extends2, resolve(actionTypes.MASS_UPDATE_FAILED), massUpdateComplete), _defineProperty(_extends2, resolve(actionTypes.RESET_ITEM), resetItem), _defineProperty(_extends2, resolve(actionTypes.RESET_RESULTS), resetResults), _defineProperty(_extends2, resolve(actionTypes.REMOVING_ITEM), removingItem), _defineProperty(_extends2, resolve(actionTypes.REMOVE_ITEM), removeItem), _extends2)));
}