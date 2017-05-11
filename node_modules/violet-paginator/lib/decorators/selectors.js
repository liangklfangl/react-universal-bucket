'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = select;

var _pageInfoTranslator = require('../pageInfoTranslator');

function select(paginator) {
  var totalPages = Math.ceil(paginator.get('totalCount') / paginator.get('pageSize'));

  var page = paginator.get('page');

  var flip = function flip() {
    return {
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages
    };
  };

  var paginate = function paginate() {
    return _extends({
      currentPage: page,
      totalPages: totalPages
    }, flip());
  };

  var tabulate = function tabulate() {
    return {
      results: paginator.get('results').toJS(),
      isLoading: paginator.get('isLoading')
    };
  };

  var tabulateLean = function tabulateLean() {
    return {
      ids: paginator.get('results').map(function (r) {
        return r.get((0, _pageInfoTranslator.recordProps)().identifier);
      }),
      isLoading: paginator.get('isLoading')
    };
  };

  var stretch = function stretch() {
    return {
      pageSize: paginator.get('pageSize')
    };
  };

  var sort = function sort() {
    return {
      sort: paginator.get('sort'),
      sortReverse: paginator.get('sortReverse')
    };
  };

  var violetPaginator = function violetPaginator() {
    return _extends({}, paginate(), tabulate(), stretch(), sort());
  };

  return {
    flip: flip,
    paginate: paginate,
    tabulate: tabulate,
    tabulateLean: tabulateLean,
    stretch: stretch,
    sort: sort,
    violetPaginator: violetPaginator
  };
}