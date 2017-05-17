'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  flex-shrink: 0;\n\n  > [data-selected], > [data-selected]:hover {\n    background-color: ', ';\n    color: ', ';\n  }\n\n  > button {\n    outline: none;\n    box-sizing: border-box;\n    flex-shrink: 0;\n    -webkit-font-smoothing: antialiased;\n    min-height: 30px;\n    border: 1px solid ', ';\n    border-left-width: 0;\n    padding: 5px 10px;\n    ', '\n\n    &:first-child {\n      border-top-left-radius: 3px;\n      border-bottom-left-radius: 3px;\n      border-left-width: 1px;\n    }\n\n    &:last-child {\n      border-top-right-radius: 3px;\n      border-bottom-right-radius: 3px;\n    }\n  }\n'], ['\n  display: flex;\n  flex-shrink: 0;\n\n  > [data-selected], > [data-selected]:hover {\n    background-color: ', ';\n    color: ', ';\n  }\n\n  > button {\n    outline: none;\n    box-sizing: border-box;\n    flex-shrink: 0;\n    -webkit-font-smoothing: antialiased;\n    min-height: 30px;\n    border: 1px solid ', ';\n    border-left-width: 0;\n    padding: 5px 10px;\n    ', '\n\n    &:first-child {\n      border-top-left-radius: 3px;\n      border-bottom-left-radius: 3px;\n      border-left-width: 1px;\n    }\n\n    &:last-child {\n      border-top-right-radius: 3px;\n      border-bottom-right-radius: 3px;\n    }\n  }\n']);

var _styledComponents = require('styled-components');

var _color = require('../../utils/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

exports.default = function (_ref) {
  var theme = _ref.theme,
      disabled = _ref.disabled;
  return (0, _styledComponents.css)(_templateObject, theme.base04, theme.base00, (0, _color2.default)(theme.base03, 'alpha', 0.4), disabled ? '\n    cursor: not-allowed;\n    opacity: 0.6;\n    ' : '\n    cursor: pointer;\n    color: ' + theme.base05 + ';\n    background-color: ' + theme.base01 + ';\n\n    &:hover, &:focus {\n      background-color: ' + theme.base02 + ';\n      color: ' + theme.base07 + ';\n    }\n    ');
};