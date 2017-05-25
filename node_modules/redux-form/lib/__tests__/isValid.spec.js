'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _isValid = require('../isValid');

var _isValid2 = _interopRequireDefault(_isValid);

describe('isValid', function () {

  it('should return true if the value is falsy', function () {
    _expect2['default'](_isValid2['default'](undefined)).toBe(true);
    _expect2['default'](_isValid2['default'](null)).toBe(true);
    _expect2['default'](_isValid2['default'](false)).toBe(true);
  });

  it('should return false if the value is truthy', function () {
    _expect2['default'](_isValid2['default']('error')).toBe(false);
    _expect2['default'](_isValid2['default'](true)).toBe(false);
  });

  it('should return true if the value is an array of falsy values', function () {
    _expect2['default'](_isValid2['default']([undefined, null, false])).toBe(true);
  });

  it('should return true if the value is an empty array', function () {
    _expect2['default'](_isValid2['default']([])).toBe(true);
  });

  it('should return false if the value is an array with one truthy value', function () {
    _expect2['default'](_isValid2['default']([undefined, 'error', undefined])).toBe(false);
  });

  it('should return true if the value is an empty object', function () {
    _expect2['default'](_isValid2['default']({})).toBe(true);
  });

  it('should return true if the value is an object with a falsy value', function () {
    _expect2['default'](_isValid2['default']({ name: undefined })).toBe(true);
    _expect2['default'](_isValid2['default']({ name: null })).toBe(true);
    _expect2['default'](_isValid2['default']({ name: false })).toBe(true);
    _expect2['default'](_isValid2['default']({ name: '' })).toBe(true);
  });

  it('should return false if the value is an object with a value', function () {
    _expect2['default'](_isValid2['default']({ name: 'error' })).toBe(false);
  });
});