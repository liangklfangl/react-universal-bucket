'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnHeader = ColumnHeader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _decorators = require('./decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ColumnHeader(_ref) {
  var pageActions = _ref.pageActions,
      field = _ref.field,
      text = _ref.text,
      sort = _ref.sort,
      sortReverse = _ref.sortReverse,
      _ref$sortable = _ref.sortable,
      sortable = _ref$sortable === undefined ? true : _ref$sortable;

  if (!sortable) {
    return _react2.default.createElement(
      'span',
      null,
      text
    );
  }

  var sortByField = function sortByField() {
    return pageActions.sort(field, !sortReverse);
  };

  var arrow = sort === field && (sortReverse ? 'sort-desc' : 'sort-asc');

  var icon = arrow || 'sort';

  return _react2.default.createElement(
    'button',
    { onClick: sortByField },
    text,
    _react2.default.createElement('i', { className: 'fa fa-' + icon })
  );
}

ColumnHeader.propTypes = {
  sort: _react.PropTypes.string,
  sortReverse: _react.PropTypes.bool,
  pageActions: _react.PropTypes.object,
  field: _react.PropTypes.string.isRequired,
  text: _react.PropTypes.string.isRequired,
  sortable: _react.PropTypes.bool
};

exports.default = (0, _decorators.sort)(ColumnHeader);