'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tooltipStyle = exports.commonStyle = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  display: inline-block;\n  position: relative;\n  flex-shrink: 0;\n  line-height: 0;\n  margin: 0 1px;\n\n  & > button {\n    width: 100%;\n    line-height: 0;\n    ', '\n\n    > svg {\n      font-size: 1.5em;\n      overflow: visible;\n      pointer-events: none;\n    }\n\n    ', '\n  }\n'], ['\n  display: inline-block;\n  position: relative;\n  flex-shrink: 0;\n  line-height: 0;\n  margin: 0 1px;\n\n  & > button {\n    width: 100%;\n    line-height: 0;\n    ', '\n\n    > svg {\n      font-size: 1.5em;\n      overflow: visible;\n      pointer-events: none;\n    }\n\n    ', '\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  ', '\n\n  &:before {\n    content: "', '";\n    white-space: pre;\n    color: ', ';\n    line-height: 16px;\n    padding: 4px 8px;\n    border-radius: 3px;\n    background: ', ';\n    border: 1px solid ', ';\n    box-shadow: 1px 1px 2px -1px ', ', 1px 1px 2px 0px ', ';\n  }\n\n  &:after,\n  &:before {\n    opacity: 0;\n    visibility: hidden;\n    position: absolute;\n    left: 50%;\n    z-index: 999;\n    ', '\n    user-select: none;\n  }\n\n  &:before {\n    transition: 0.3s ease-in-out;\n  }\n\n  &:before {\n    ', '\n    ', ': 3px;\n    ', '\n  }\n\n  ', '\n\n  &:hover:after,\n  &:hover:before {\n    opacity: 0.9;\n    visibility: visible;\n  }\n  &:hover:after {\n    ', ': 8px;\n    transition-delay: 500ms;\n  }\n  &:hover:before {\n    ', ': -4px;\n    transition-delay: 200ms;\n  }\n'], ['\n  ', '\n\n  &:before {\n    content: "', '";\n    white-space: pre;\n    color: ', ';\n    line-height: 16px;\n    padding: 4px 8px;\n    border-radius: 3px;\n    background: ', ';\n    border: 1px solid ', ';\n    box-shadow: 1px 1px 2px -1px ', ', 1px 1px 2px 0px ', ';\n  }\n\n  &:after,\n  &:before {\n    opacity: 0;\n    visibility: hidden;\n    position: absolute;\n    left: 50%;\n    z-index: 999;\n    ', '\n    user-select: none;\n  }\n\n  &:before {\n    transition: 0.3s ease-in-out;\n  }\n\n  &:before {\n    ', '\n    ', ': 3px;\n    ', '\n  }\n\n  ', '\n\n  &:hover:after,\n  &:hover:before {\n    opacity: 0.9;\n    visibility: visible;\n  }\n  &:hover:after {\n    ', ': 8px;\n    transition-delay: 500ms;\n  }\n  &:hover:before {\n    ', ': -4px;\n    transition-delay: 200ms;\n  }\n']);

var _styledComponents = require('styled-components');

var _animations = require('../../utils/animations');

var _color = require('../../utils/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var both = function both(tooltipPosition) {
  switch (tooltipPosition) {
    case 'bottom':
      return '\n      transform: translate(-50%, 100%);\n      top: auto;\n      ';
    case 'left':
      return '\n      transform: translate(-100%, -50%);\n      top: 50%;\n      right: auto;\n      ';
    case 'right':
      return '\n      transform: translate(100%, -50%);\n      top: 50%;\n      left: auto;\n      ';
    case 'bottom-left':
      return '\n      transform: translate(-100%, 100%);\n      top: auto;\n      ';
    case 'bottom-right':
      return '\n      transform: translateY(100%);\n      top: auto;\n      ';
    case 'top-left':
      return '\n      transform: translate(-100%, -100%);\n      ';
    case 'top-right':
      return '\n      transform: translateY(-100%);\n      ';
    default:
      return '\n       transform: translate(-50%, -100%);\n      ';
  }
};

var before = function before(tooltipPosition) {
  switch (tooltipPosition) {
    case 'bottom-left':
      return '\n      left: calc(50% + 11px);\n      ';
    case 'bottom-right':
      return '\n      left: calc(50% - 11px);\n      ';
    case 'top-left':
      return '\n      left: calc(50% + 11px);\n      ';
    case 'top-right':
      return '\n      left: calc(50% - 11px);\n      ';
    default:
      return '';
  }
};

var after = function after(tooltipPosition, color) {
  switch (tooltipPosition) {
    case 'bottom':
      return '\n      border-color: transparent transparent ' + color + ' transparent;\n      ';
    case 'left':
      return '\n      border-color: transparent transparent transparent ' + color + ';\n      ';
    case 'right':
      return '\n      border-color: transparent ' + color + ' transparent transparent;\n      ';
    case 'bottom-left':
      return '\n      left: calc(50% + 10px);\n      border-color: transparent transparent ' + color + ' transparent;\n      ';
    case 'bottom-right':
      return '\n      left: calc(50% - 10px);\n      border-color: transparent transparent ' + color + ' transparent;\n      ';
    case 'top-left':
      return '\n      left: calc(50% + 10px);\n      border-color: ' + color + ' transparent transparent transparent;\n      ';
    case 'top-right':
      return '\n      left: calc(50% - 10px);\n      border-color: ' + color + ' transparent transparent transparent;\n      ';
    default:
      return '\n       border-color: ' + color + ' transparent transparent transparent;\n      ';
  }
};

var getDirection = function getDirection(tooltipPosition) {
  return tooltipPosition.indexOf('-') > 0 ? tooltipPosition.substring(0, tooltipPosition.indexOf('-')) : tooltipPosition;
};

var getSize = function getSize(size) {
  switch (size) {
    case 'big':
      return 'min-height: 34px; padding: 2px 12px;';
    case 'small':
      return 'padding: 0;';
    default:
      return 'min-height: 30px; padding: 2px 7px;';
  }
};

var commonStyle = exports.commonStyle = function commonStyle(_ref) {
  var theme = _ref.theme,
      mark = _ref.mark,
      size = _ref.size;
  return (0, _styledComponents.css)(_templateObject, getSize(size), mark && '\n    background-color: ' + (0, _color2.default)(theme[mark], 'fade', theme.light ? 0.92 : 0.82) + ';\n  \n    > svg {\n      color: ' + theme[mark] + ';\n      stroke: ' + theme[mark] + ';\n      stroke-width: 14px;\n      stroke-opacity: 0.2;\n      user-select: none;\n    }\n  ');
};

var tooltipStyle = exports.tooltipStyle = function tooltipStyle(_ref2) {
  var theme = _ref2.theme,
      tooltipTitle = _ref2.tooltipTitle,
      tooltipPosition = _ref2.tooltipPosition,
      mark = _ref2.mark,
      size = _ref2.size;
  return (0, _styledComponents.css)(_templateObject2, commonStyle({ theme: theme, mark: mark, size: size }), tooltipTitle, theme.base06, theme.base01, theme.base02, theme.base02, theme.base02, both(tooltipPosition), before(tooltipPosition), getDirection(tooltipPosition), theme.type === 'material' ? 'animation: ' + _animations.fadeIn + ' 500ms;' : '', theme.type !== 'material' && '\n  &:after {\n    content: "";\n    border-style: solid;\n    border-width: 7px;\n    margin: 1px;\n    ' + after(tooltipPosition, theme.base02) + '\n    ' + getDirection(tooltipPosition) + ': 7px;\n  }\n  ', getDirection(tooltipPosition), getDirection(tooltipPosition));
};