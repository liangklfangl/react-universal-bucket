'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getValue = require('./getValue');

var _getValue2 = _interopRequireDefault(_getValue);

var createOnBlur = function createOnBlur(name, blur, isReactNative, afterBlur) {
  return function (event) {
    var value = _getValue2['default'](event, isReactNative);
    blur(name, value);
    if (afterBlur) {
      afterBlur(name, value);
    }
  };
};
exports['default'] = createOnBlur;
module.exports = exports['default'];