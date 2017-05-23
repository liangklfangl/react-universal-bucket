'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Next = Next;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _decorators = require('./decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Next(_ref) {
  var pageActions = _ref.pageActions,
      hasNextPage = _ref.hasNextPage;

  return _react2.default.createElement(
    'button',
    { type: 'button', disabled: !hasNextPage, onClick: pageActions.next },
    _react2.default.createElement('i', { className: 'fa fa-chevron-right' })
  );
}

Next.propTypes = {
  pageActions: _react.PropTypes.shape({
    next: _react.PropTypes.func.isRequired
  }).isRequired,
  hasNextPage: _react.PropTypes.bool
};

exports.default = (0, _decorators.flip)(Next);