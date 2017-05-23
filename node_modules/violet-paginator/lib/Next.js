'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Next = Next;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _decorators = require('./decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Next(_ref) {
  var pageActions = _ref.pageActions,
      hasNextPage = _ref.hasNextPage;

  var next = _react2.default.createElement(_reactFontawesome2.default, { name: 'chevron-right' });
  var link = hasNextPage ? _react2.default.createElement(
    'a',
    { onClick: pageActions.next },
    next
  ) : next;

  return link;
}

exports.default = (0, _decorators.flip)(Next);