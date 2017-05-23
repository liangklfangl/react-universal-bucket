'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = select;
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
      results: paginator.get('results'),
      isLoading: paginator.get('isLoading'),
      updating: paginator.get('updating'),
      removing: paginator.get('removing')
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
    stretch: stretch,
    sort: sort,
    violetPaginator: violetPaginator
  };
}