'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationCurve = exports.ripple = exports.fadeIn = exports.spinner = exports.spin = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  to { transform: rotate(1turn); }\n'], ['\n  to { transform: rotate(1turn); }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  from { opacity: 0; }\n  to { opacity: 1; }\n'], ['\n  from { opacity: 0; }\n  to { opacity: 1; }\n']);

var _styledComponents = require('styled-components');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var spin = exports.spin = (0, _styledComponents.keyframes)(_templateObject);
var spinner = exports.spinner = function spinner(theme) {
  return '\n  animation: ' + spin + ' 400ms infinite linear;\n  width: ' + theme.spinnerSize + 'px;\n  height: ' + theme.spinnerSize + 'px;\n  box-sizing: border-box;\n  border-radius: 50%;\n  border: ' + Math.floor(theme.spinnerSize / 8) + 'px solid ' + theme.base02 + ';\n  border-right-color: ' + theme.base06 + ';\n  display: inline-block;\n  position: relative;\n';
};

var fadeIn = exports.fadeIn = (0, _styledComponents.keyframes)(_templateObject2);

// Based on https://github.com/mladenplavsic/css-ripple-effect
var ripple = exports.ripple = function ripple(theme) {
  return '\n  & {\n    position: relative;\n    overflow: hidden;\n  }\n\n  &:after {\n    content: "";\n    display: block;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    pointer-events: none;\n    background-image: radial-gradient(circle, ' + theme.base07 + ' 11%, transparent 11%);\n    background-repeat: no-repeat;\n    background-position: 50%;\n    transform: scale(10, 10);\n    opacity: 0;\n    transition: transform .5s, opacity 1s;\n  }\n\n  &:active:after {\n    transform: scale(0, 0);\n    opacity: .2;\n    transition: 0s;\n  }\n';
};

var animationCurve = exports.animationCurve = 'cubic-bezier(0.4, 0, 0.2, 1)';