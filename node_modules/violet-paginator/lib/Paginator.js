'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Paginator = Paginator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _paginate = require('./decorators/paginate');

var _paginate2 = _interopRequireDefault(_paginate);

var _range = require('./lib/range');

var _range2 = _interopRequireDefault(_range);

var _PageNumber = require('./PageNumber');

var _Prev = require('./Prev');

var _Next = require('./Next');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Paginator(props) {
  var currentPage = props.currentPage,
      totalPages = props.totalPages;


  var upperOffset = Math.max(0, currentPage - totalPages + 3);
  var minPage = Math.max(props.currentPage - 3 - upperOffset, 1);
  var maxPage = Math.min(minPage + 6, totalPages);

  var pageLinks = [].concat(_toConsumableArray((0, _range2.default)(minPage, maxPage))).map(function (page) {
    var pageLinkClass = (0, _classnames2.default)({ current: page === currentPage });

    return _react2.default.createElement(
      'li',
      { className: pageLinkClass, key: page },
      _react2.default.createElement(_PageNumber.PageNumber, _extends({}, props, { page: page }))
    );
  });

  var separator = totalPages > 7 ? _react2.default.createElement(
    'li',
    { className: 'skip' },
    _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' })
  ) : false;

  var begin = separator && minPage > 1 ? _react2.default.createElement(
    'li',
    null,
    _react2.default.createElement(_PageNumber.PageNumber, _extends({}, props, { page: 1 }))
  ) : false;

  var end = separator && maxPage < totalPages ? _react2.default.createElement(
    'li',
    null,
    _react2.default.createElement(_PageNumber.PageNumber, _extends({}, props, { page: totalPages }))
  ) : false;

  return _react2.default.createElement(
    'ul',
    { className: 'pagination' },
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_Prev.Prev, props)
    ),
    begin,
    begin && separator,
    pageLinks,
    end && separator,
    end,
    _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(_Next.Next, props)
    )
  );
}

Paginator.propTypes = {
  currentPage: _react.PropTypes.number,
  totalPages: _react.PropTypes.number,
  hasPreviousPage: _react.PropTypes.bool,
  hasNextPage: _react.PropTypes.bool
};

exports.default = (0, _paginate2.default)(Paginator);