'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var noop = function noop() {
  return undefined;
};

var silencePromise = function silencePromise(promise) {
  return _isPromise2['default'](promise) ? promise.then(noop, noop) : promise;
};

exports['default'] = silencePromise;
module.exports = exports['default'];