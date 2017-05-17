'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _default = require('../themes/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getStyle = function getStyle(styles, type) {
  return (typeof styles === 'undefined' ? 'undefined' : _typeof(styles)) === 'object' ? styles[type] || styles.default : styles;
};

exports.default = function (styles, component) {
  return (0, _styledComponents2.default)(component || 'div')(_templateObject, function (props) {
    return props.theme.type ? getStyle(styles, props.theme.type) :
    // used outside of container (theme provider)
    getStyle(styles, 'default')(_extends({}, props, { theme: (0, _default2.default)(props.theme) }));
  });
};

// TODO: memoize it?