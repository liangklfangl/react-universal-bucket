'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tabulateLean;

var _decorate = require('./decorate');

var _decorate2 = _interopRequireDefault(_decorate);

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

var _control = require('./control');

var _control2 = _interopRequireDefault(_control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tabulateLean(Table) {
  return (0, _decorate2.default)((0, _control2.default)(Table), function (props) {
    return (0, _selectors2.default)(props.paginator).tabulateLean();
  });
}