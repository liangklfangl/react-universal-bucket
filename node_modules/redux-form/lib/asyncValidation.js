'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _isValid = require('./isValid');

var _isValid2 = _interopRequireDefault(_isValid);

var asyncValidation = function asyncValidation(fn, start, stop) {
  start();
  var promise = fn();
  if (!_isPromise2['default'](promise)) {
    throw new Error('asyncValidate function passed to reduxForm must return a promise');
  }
  var handleErrors = function handleErrors(rejected) {
    return function (errors) {
      if (!_isValid2['default'](errors)) {
        stop(errors);
        return Promise.reject();
      } else if (rejected) {
        stop();
        throw new Error('Asynchronous validation promise was rejected without errors.');
      }
      stop();
      return Promise.resolve();
    };
  };
  return promise.then(handleErrors(false), handleErrors(true));
};

exports['default'] = asyncValidation;
module.exports = exports['default'];