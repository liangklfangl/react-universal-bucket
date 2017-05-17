'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  align-items: flex-start;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  box-shadow: inset ', ' 0 0 1px;\n  font-size: 1.1em;\n  padding: 7px;\n  width: 100%;\n  color: ', ';\n  ', '\n\n  & > svg:first-child {\n    font-size: 1.4em;\n    opacity: 0.5;\n  }\n\n  & > span {\n    width: 100%;\n    text-align: center;\n    padding: 0.1em;\n  }\n\n  & > button {\n    cursor: pointer;\n    float: right;\n    font-size: 1.1em;\n    border: 1px solid transparent;\n    background: transparent;\n    padding: 0.1em;\n    line-height: 0;\n    outline: none;\n    color: inherit;\n    opacity: 0.8;\n  }\n\n  & > button:hover, & > button:active {\n    opacity: 1;\n  }\n\n  & > button:focus {\n    border: 1px solid ', ';\n  }\n'], ['\n  display: flex;\n  align-items: flex-start;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  box-shadow: inset ', ' 0 0 1px;\n  font-size: 1.1em;\n  padding: 7px;\n  width: 100%;\n  color: ', ';\n  ', '\n\n  & > svg:first-child {\n    font-size: 1.4em;\n    opacity: 0.5;\n  }\n\n  & > span {\n    width: 100%;\n    text-align: center;\n    padding: 0.1em;\n  }\n\n  & > button {\n    cursor: pointer;\n    float: right;\n    font-size: 1.1em;\n    border: 1px solid transparent;\n    background: transparent;\n    padding: 0.1em;\n    line-height: 0;\n    outline: none;\n    color: inherit;\n    opacity: 0.8;\n  }\n\n  & > button:hover, & > button:active {\n    opacity: 1;\n  }\n\n  & > button:focus {\n    border: 1px solid ', ';\n  }\n']);

var _styledComponents = require('styled-components');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getBackground = function getBackground(theme, type) {
  switch (type) {
    case 'success':
      return 'background-color: ' + theme.base0B + ';';
    case 'warning':
      return 'background-color: ' + theme.base0A + ';';
    case 'error':
      return 'background-color: ' + theme.base08 + ';';
    default:
      return 'background-color: ' + theme.base0D + ';';
  }
};

exports.default = function (_ref) {
  var theme = _ref.theme,
      type = _ref.type;
  return (0, _styledComponents.css)(_templateObject, theme.base05, theme.base01, getBackground(theme, type), theme.base03);
};