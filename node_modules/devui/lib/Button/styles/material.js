'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  outline: none;\n  font-family: inherit;\n  font-weight: 600;\n  text-decoration: none;\n  display: inline-block;\n  border: none;\n  text-transform: uppercase;\n  margin: auto 0;\n  background-color: ', ';\n  ', '\n  ', '\n\n\n  &:hover, &:focus:not(:active) {\n    background-color: ', ';\n  }\n\n  &:focus:not(:active) {\n    background-color: ', ';\n    box-shadow: 0 0 4px ', ', 0 4px 8px ', ';\n  }\n\n  ', '\n'], ['\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  outline: none;\n  font-family: inherit;\n  font-weight: 600;\n  text-decoration: none;\n  display: inline-block;\n  border: none;\n  text-transform: uppercase;\n  margin: auto 0;\n  background-color: ', ';\n  ', '\n  ', '\n\n\n  &:hover, &:focus:not(:active) {\n    background-color: ', ';\n  }\n\n  &:focus:not(:active) {\n    background-color: ', ';\n    box-shadow: 0 0 4px ', ', 0 4px 8px ', ';\n  }\n\n  ', '\n']);

var _styledComponents = require('styled-components');

var _animations = require('../../utils/animations');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var style = exports.style = function style(_ref) {
  var theme = _ref.theme,
      primary = _ref.primary,
      disabled = _ref.disabled;
  return (0, _styledComponents.css)(_templateObject, primary ? theme.base05 : theme.base01, disabled ? '\n  cursor: not-allowed;\n  color: ' + theme.base04 + ';\n  opacity: 0.6;\n  ' : '\n  cursor: pointer;\n  color: ' + (primary ? theme.base00 : theme.base05) + ';\n  ', !disabled ? '\n    box-shadow:\n      0 2px 2px 0 ' + theme.base03 + ',\n      0 3px 1px -2px ' + theme.base02 + ',\n      0 1px 5px 0 ' + theme.base02 + ';\n  ' : '', theme.base02, theme.base02, theme.base02, theme.base04, (0, _animations.ripple)(theme));
};