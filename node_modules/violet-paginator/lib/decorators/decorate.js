'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = decorate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _PaginationWrapper = require('../containers/PaginationWrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function wrap(Component, decorator) {
  var Wrapped = function Wrapped(props) {
    var paginator = props.paginator,
        rest = _objectWithoutProperties(props, ['paginator']);

    return _react2.default.createElement(
      _PaginationWrapper.PaginationWrapper,
      _extends({ paginator: paginator }, rest),
      _react2.default.createElement(Component, _extends({}, rest, decorator(props)))
    );
  };

  Wrapped.propTypes = {
    paginator: _react.PropTypes.instanceOf(_immutable.Map)
  };

  return Wrapped;
}

function decorate(Component, decorator) {
  return (0, _PaginationWrapper.connector)(wrap(Component, decorator));
}