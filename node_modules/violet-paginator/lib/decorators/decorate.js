'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = decorate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PaginationWrapper = require('../containers/PaginationWrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function decorate(Component, decorator) {
  return (0, _PaginationWrapper.connector)(function (props) {
    return _react2.default.createElement(
      _PaginationWrapper.PaginationWrapper,
      props,
      _react2.default.createElement(Component, _extends({}, props, decorator(props)))
    );
  });
}