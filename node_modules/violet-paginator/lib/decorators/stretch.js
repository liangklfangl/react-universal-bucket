'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stretch;

var _decorate = require('./decorate');

var _decorate2 = _interopRequireDefault(_decorate);

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stretch(Component) {
  return (0, _decorate2.default)(Component, function (props) {
    return (0, _selectors2.default)(props.paginator).stretch();
  });
}