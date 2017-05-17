'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  display: block;\n  width: 100%;\n  position: relative;\n  z-index: 1;\n  padding: ', ';\n\n  label {\n    position: absolute;\n    display: block;\n    font-size: 11px;\n    padding: 0.3em 0.5em;\n    top: 0;\n    width: 100%;\n    color: ', ';\n\n    > span { color: ', '; } \n  }\n\n  input {\n    opacity: ', ';\n    outline: none;\n    box-sizing: border-box;\n    display: block;\n    width: 100%;\n    margin: 0;\n    cursor: pointer;\n    color: inherit;\n    background-color: ', ';\n    background-image:\n      linear-gradient(90deg, currentcolor, currentcolor ', '%, transparent ', '%);\n    background-clip: content-box;\n    height: 0.5em;\n    border-radius: 999px;\n    appearance: none;\n    font-size: 1em;\n  }\n\n ', '\n\n ', '\n\n  input::-moz-focus-outer {\n    border: 0;\n  }\n'], ['\n  display: block;\n  width: 100%;\n  position: relative;\n  z-index: 1;\n  padding: ', ';\n\n  label {\n    position: absolute;\n    display: block;\n    font-size: 11px;\n    padding: 0.3em 0.5em;\n    top: 0;\n    width: 100%;\n    color: ', ';\n\n    > span { color: ', '; } \n  }\n\n  input {\n    opacity: ', ';\n    outline: none;\n    box-sizing: border-box;\n    display: block;\n    width: 100%;\n    margin: 0;\n    cursor: pointer;\n    color: inherit;\n    background-color: ', ';\n    background-image:\n      linear-gradient(90deg, currentcolor, currentcolor ', '%, transparent ', '%);\n    background-clip: content-box;\n    height: 0.5em;\n    border-radius: 999px;\n    appearance: none;\n    font-size: 1em;\n  }\n\n ', '\n\n ', '\n\n  input::-moz-focus-outer {\n    border: 0;\n  }\n']);

var _styledComponents = require('styled-components');

var _autoPrefix = require('../../utils/autoPrefix');

var _color = require('../../utils/color');

var _color2 = _interopRequireDefault(_color);

var _animations = require('../../utils/animations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var style = exports.style = function style(_ref) {
  var theme = _ref.theme,
      percent = _ref.percent,
      disabled = _ref.disabled,
      withLabel = _ref.withLabel;
  return (0, _styledComponents.css)(_templateObject, withLabel ? '2em 0' : '0', theme.base06, theme.base04, disabled ? '0.7' : '1', theme.base02, percent, percent, (0, _autoPrefix.prefixSelectors)('input', ['webkit-slider-thumb', 'moz-range-thumb', 'ms-thumb'], '{\n    width: 1.5em;\n    height: 1.5em;\n    background-image: none;\n    background-color: ' + (percent === 0 ? theme.base00 : 'currentcolor') + ';\n    border: ' + (percent === 0 ? '5px solid ' + theme.base03 : 'none') + ';;\n    border-radius: 50%;\n    appearance: none;\n    transition: transform 0.18s ' + _animations.animationCurve + ',\n      border 0.18s ' + _animations.animationCurve + ',\n      box-shadow 0.18s ' + _animations.animationCurve + ',\n      background 0.28s ' + _animations.animationCurve + ';\n  }'), (0, _autoPrefix.prefixSelectors)('input:focus:not(:active)', ['webkit-slider-thumb', 'moz-range-thumb', 'ms-thumb'], '{\n    box-shadow: 0 0 0 8px ' + (0, _color2.default)(theme.base0D, 'alpha', 0.5) + ';\n    transform: scale(1.2);\n  }'));
};