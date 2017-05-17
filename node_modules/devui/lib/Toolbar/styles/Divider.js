'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  background-color: ', ';\n  box-shadow: 1px 1px 2px ', ';\n  height: ', 'px;\n  width: 1px;\n  margin: auto 3px !important;\n  flex-shrink: 0;\n'], ['\n  background-color: ', ';\n  box-shadow: 1px 1px 2px ', ';\n  height: ', 'px;\n  width: 1px;\n  margin: auto 3px !important;\n  flex-shrink: 0;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Divider = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.base02;
}, function (props) {
  return props.theme.base00;
}, function (props) {
  return props.theme.inputHeight || '30';
});

exports.default = Divider;