'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flipper = Flipper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _decorators = require('./decorators');

var _Prev = require('./Prev');

var _Next = require('./Next');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Flipper(props) {
  var prevClasses = (0, _classnames2.default)({ disabled: !props.hasPreviousPage });
  var nextClasses = (0, _classnames2.default)({ disabled: !props.hasNextPage });

  return _react2.default.createElement(
    'ul',
    { className: 'pagination' },
    _react2.default.createElement(
      'li',
      { className: prevClasses },
      _react2.default.createElement(_Prev.Prev, props)
    ),
    _react2.default.createElement(
      'li',
      { className: nextClasses },
      _react2.default.createElement(_Next.Next, props)
    )
  );
}

Flipper.propTypes = {
  hasPreviousPage: _react.PropTypes.bool,
  hasNextPage: _react.PropTypes.bool
};

exports.default = (0, _decorators.flip)(Flipper);