'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  width: 100%;\n  font-family: ', ';\n  font-size: 12px;\n  line-height: 16px;\n  ', '\n  padding: ', ' 5px;\n  background-color: ', ';\n  text-align: center;\n  position: relative;\n  ', '\n  \n  & > div {\n    margin: auto ', ';\n  }\n  \n  & button {\n    border-radius: 0;\n    ', '\n    white-space: nowrap;\n    box-shadow: none !important;\n  }\n\n  & > .Select {\n    position: static;\n    text-align: left;\n    margin: auto 1px;\n    flex-grow: 1;\n    \n    .Select-control {\n      cursor: pointer;\n      border-radius: 0 !important;\n      text-align: center;\n      background-color: ', ';\n    }\n\n    .Select-menu-outer {\n      margin-top: 5px;\n    }\n  }\n  & > .Select.is-focused > .Select-control {\n    text-align: left;\n  }\n'], ['\n  display: flex;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  width: 100%;\n  font-family: ', ';\n  font-size: 12px;\n  line-height: 16px;\n  ', '\n  padding: ', ' 5px;\n  background-color: ', ';\n  text-align: center;\n  position: relative;\n  ', '\n  \n  & > div {\n    margin: auto ', ';\n  }\n  \n  & button {\n    border-radius: 0;\n    ', '\n    white-space: nowrap;\n    box-shadow: none !important;\n  }\n\n  & > .Select {\n    position: static;\n    text-align: left;\n    margin: auto 1px;\n    flex-grow: 1;\n    \n    .Select-control {\n      cursor: pointer;\n      border-radius: 0 !important;\n      text-align: center;\n      background-color: ', ';\n    }\n\n    .Select-menu-outer {\n      margin-top: 5px;\n    }\n  }\n  & > .Select.is-focused > .Select-control {\n    text-align: left;\n  }\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Toolbar = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.fontFamily || 'monospace';
}, function (props) {
  return props.fullHeight && 'height: 100%;';
}, function (props) {
  return props.compact ? '0' : '5px';
}, function (props) {
  return props.theme.base01;
}, function (_ref) {
  var borderPosition = _ref.borderPosition,
      theme = _ref.theme;
  return borderPosition && 'border-' + borderPosition + ': 1px solid ' + theme.base02 + ';';
}, function (props) {
  return props.noBorder ? '0' : '1px;';
}, function (props) {
  return props.noBorder && 'border-color: transparent;';
}, function (props) {
  return props.theme.base01;
});

exports.default = Toolbar;