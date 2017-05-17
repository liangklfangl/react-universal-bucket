'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerStyle = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n\n  div {\n    margin-left: 4px;\n    padding: 0.3em 0.5em;\n    border: ', 'px solid ', ';\n    border-radius: ', 'px;\n    background-color: ', ';\n    opacity: 0.7;\n  }\n'], ['\n  display: flex;\n  align-items: center;\n\n  div {\n    margin-left: 4px;\n    padding: 0.3em 0.5em;\n    border: ', 'px solid ', ';\n    border-radius: ', 'px;\n    background-color: ', ';\n    opacity: 0.7;\n  }\n']);

var _styledComponents = require('styled-components');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var containerStyle = exports.containerStyle = function containerStyle(_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(_templateObject, theme.inputBorderWidth, theme.inputBorderColor, theme.inputBorderRadius, theme.base00);
};