'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = DataRow;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _decorators = require('../decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function DataRow(_ref, context) {
  var component = _ref.component,
      rest = _objectWithoutProperties(_ref, ['component']);

  var Component = (0, _decorators.withRecordProps)(component);

  return _react2.default.createElement(Component, _extends({ listId: context.listId }, rest));
}

DataRow.propTypes = {
  component: _react.PropTypes.func.isRequired
};

DataRow.contextTypes = {
  listId: _react.PropTypes.string
};