'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prev = Prev;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _decorators = require('./decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Prev(_ref) {
  var pageActions = _ref.pageActions,
      hasPreviousPage = _ref.hasPreviousPage;

  var prev = _react2.default.createElement(_reactFontawesome2.default, { name: 'chevron-left' });
  var link = hasPreviousPage ? _react2.default.createElement(
    'a',
    { onClick: pageActions.prev },
    prev
  ) : prev;

  return link;
}

exports.default = (0, _decorators.flip)(Prev);