'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerWrapper = exports.MainContainerWrapper = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex-flow: column nowrap;\n  background-color: ', ';\n  color: ', ';\n  font-size: 12px;\n\n  div, input, textarea, keygen, select, button {\n   font-family: ', ';\n }\n\n .CodeMirror div, pre, .monitor-LogMonitor * {\n   font-family: ', ';\n }\n\n .monitor {\n    flex-grow: 1;\n    display: flex;\n    flex-flow: column nowrap;\n    height: 100%;\n\n    > div {\n      flex-grow: 1;\n    }\n  }\n'], ['\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex-flow: column nowrap;\n  background-color: ', ';\n  color: ', ';\n  font-size: 12px;\n\n  div, input, textarea, keygen, select, button {\n   font-family: ', ';\n }\n\n .CodeMirror div, pre, .monitor-LogMonitor * {\n   font-family: ', ';\n }\n\n .monitor {\n    flex-grow: 1;\n    display: flex;\n    flex-flow: column nowrap;\n    height: 100%;\n\n    > div {\n      flex-grow: 1;\n    }\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex-flow: column nowrap;\n'], ['\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex-flow: column nowrap;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _color = require('../../utils/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MainContainerWrapper = exports.MainContainerWrapper = _styledComponents2.default.div(_templateObject, function (props) {
  return (0, _color2.default)(props.theme.base00, 'lighten', 0.03);
}, function (props) {
  return props.theme.base07;
}, function (props) {
  return props.theme.fontFamily || 'monaco, monospace';
}, function (props) {
  return props.theme.codeFontFamily || props.theme.fontFamily || 'monospace';
});

var ContainerWrapper = exports.ContainerWrapper = _styledComponents2.default.div(_templateObject2);