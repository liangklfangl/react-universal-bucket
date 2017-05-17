'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  outline: none;\n  font-weight: 600;\n  text-decoration: none;\n  display: inline-block;\n  transition: all 0.5s;\n  margin: auto 0;\n  border: 1px solid ', ';\n  border-radius: 4px;\n  ', '\n  ', '\n\n  ', '\n  &:focus {\n    border: 1px solid ', ';\n  }\n  &:active {\n    border: 1px solid ', ';\n    box-shadow: 1px 1px 2px ', ';\n  }\n'], ['\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  outline: none;\n  font-weight: 600;\n  text-decoration: none;\n  display: inline-block;\n  transition: all 0.5s;\n  margin: auto 0;\n  border: 1px solid ', ';\n  border-radius: 4px;\n  ', '\n  ', '\n\n  ', '\n  &:focus {\n    border: 1px solid ', ';\n  }\n  &:active {\n    border: 1px solid ', ';\n    box-shadow: 1px 1px 2px ', ';\n  }\n']);

var _styledComponents = require('styled-components');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var style = exports.style = function style(_ref) {
  var theme = _ref.theme,
      primary = _ref.primary,
      disabled = _ref.disabled;
  return (0, _styledComponents.css)(_templateObject, theme.base02, primary ? '\n  background-color: ' + theme.base05 + ';\n  color: ' + theme.base00 + ';\n  ' : '\n  background-color: ' + theme.base01 + ';\n  color: ' + theme.base05 + ';\n ', disabled ? '\n  cursor: not-allowed;\n  opacity: 0.6;\n  ' : '\n  cursor: pointer;\n  ', !disabled && '\n  &:hover,\n  &:focus {\n    background-color: ' + (primary ? theme.base07 : theme.base02) + ';\n    box-shadow: 1px 1px 2px ' + theme.base03 + ';\n  }\n ', theme.base0D, theme.base03, theme.base04);
};