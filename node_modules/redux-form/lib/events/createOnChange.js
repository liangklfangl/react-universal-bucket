'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getValue = require('./getValue');

var _getValue2 = _interopRequireDefault(_getValue);

var createOnChange = function createOnChange(name, change, isReactNative) {
  return function (event) {
    return change(name, _getValue2['default'](event, isReactNative));
  };
};
exports['default'] = createOnChange;
module.exports = exports['default'];