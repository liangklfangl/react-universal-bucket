'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var INITIALIZE_PAGINATOR = exports.INITIALIZE_PAGINATOR = '@@violet-paginator/INITIALIZE_PAGINATOR';
var DESTROY_PAGINATOR = exports.DESTROY_PAGINATOR = '@@violet-paginator/DESTROY_PAGINATOR';
var DESTROY_ALL = exports.DESTROY_ALL = '@@violet-paginator/DESTROY_ALL';
var EXPIRE_PAGINATOR = exports.EXPIRE_PAGINATOR = '@@violet-paginator/EXPIRE_PAGINATOR';
var EXPIRE_ALL = exports.EXPIRE_ALL = '@@violet-paginator/EXPIRE_ALL';
var FOUND_PAGINATOR = exports.FOUND_PAGINATOR = '@@violet-paginator/FOUND_PAGINATOR';
var PREVIOUS_PAGE = exports.PREVIOUS_PAGE = '@@violet-paginator/PREVIOUS_PAGE';
var NEXT_PAGE = exports.NEXT_PAGE = '@@violet-paginator/NEXT_PAGE';
var GO_TO_PAGE = exports.GO_TO_PAGE = '@@violet-paginator/GO_TO_PAGE';
var SET_PAGE_SIZE = exports.SET_PAGE_SIZE = '@@violet-paginator/SET_PAGE_SIZE';
var FETCH_RECORDS = exports.FETCH_RECORDS = '@@violet-paginator/FETCH_RECORDS';
var RESULTS_UPDATED = exports.RESULTS_UPDATED = '@@violet-paginator/RESULTS_UPDATED';
var RESULTS_UPDATED_ERROR = exports.RESULTS_UPDATED_ERROR = '@@violet-paginator/RESULTS_UPDATED_ERROR';
var TOGGLE_FILTER_ITEM = exports.TOGGLE_FILTER_ITEM = '@@violet-paginator/TOGGLE_FILTER_ITEM';
var SET_FILTER = exports.SET_FILTER = '@@violet-paginator/SET_FILTER';
var SET_FILTERS = exports.SET_FILTERS = '@@violet-paginator/SET_FILTERS';
var RESET_FILTERS = exports.RESET_FILTERS = '@@violet-paginator/RESET_FILTERS';
var SORT_CHANGED = exports.SORT_CHANGED = '@@violet-paginator/SORT_CHANGED';
var UPDATING_ITEM = exports.UPDATING_ITEM = '@@violet-paginator/UPDATING_ITEM';
var UPDATE_ITEMS = exports.UPDATE_ITEMS = '@@violet-paginator/UPDATE_ITEMS';
var UPDATE_ITEM = exports.UPDATE_ITEM = '@@violet-paginator/UPDATE_ITEM';
var UPDATING_ITEMS = exports.UPDATING_ITEMS = '@@violet-paginator/UPDATING_ITEMS';
var RESET_ITEM = exports.RESET_ITEM = '@@violet-paginator/RESET_ITEM';
var UPDATING_ALL = exports.UPDATING_ALL = '@@violet-paginator/UPDATING_ALL';
var UPDATE_ALL = exports.UPDATE_ALL = '@@violet-paginator/UPDATE_ALL';
var BULK_ERROR = exports.BULK_ERROR = '@@violet-paginator/BULK_ERROR';
var MARK_ITEMS_ERRORED = exports.MARK_ITEMS_ERRORED = '@@violet-paginator/MARK_ITEMS_ERRORED';
var RESET_RESULTS = exports.RESET_RESULTS = '@@violet-paginator/RESET_RESULTS';
var REMOVING_ITEM = exports.REMOVING_ITEM = '@@violet-paginator/REMOVING_ITEM';
var REMOVE_ITEM = exports.REMOVE_ITEM = '@@violet-paginator/REMOVE_ITEM';
var ITEM_ERROR = exports.ITEM_ERROR = '@@violet-paginator/ITEM_ERROR';