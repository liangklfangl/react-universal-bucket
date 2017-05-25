'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _asyncValidation = require('../asyncValidation');

var _asyncValidation2 = _interopRequireDefault(_asyncValidation);

describe('asyncValidation', function () {

  it('should throw an error if fn does not return a promise', function () {
    var fn = function fn() {
      return null;
    };
    var start = function start() {
      return null;
    };
    var stop = function stop() {
      return null;
    };
    _expect2['default'](function () {
      return _asyncValidation2['default'](fn, start, stop);
    }).toThrow(/promise/);
  });

  it('should return a promise', function () {
    var fn = function fn() {
      return Promise.resolve();
    };
    var start = function start() {
      return null;
    };
    var stop = function stop() {
      return null;
    };
    _expect2['default'](_isPromise2['default'](_asyncValidation2['default'](fn, start, stop))).toBe(true);
  });

  it('should call start, fn, and stop on promise resolve', function () {
    var fn = _expect.createSpy().andReturn(Promise.resolve());
    var start = _expect.createSpy();
    var stop = _expect.createSpy();
    var promise = _asyncValidation2['default'](fn, start, stop);
    _expect2['default'](fn).toHaveBeenCalled();
    _expect2['default'](start).toHaveBeenCalled();
    return promise.then(function () {
      _expect2['default'](stop).toHaveBeenCalled();
    }, function () {
      _expect2['default'](false).toBe(true); // should not get into reject branch
    });
  });

  it('should throw when promise rejected with no errors', function () {
    var fn = _expect.createSpy().andReturn(Promise.reject());
    var start = _expect.createSpy();
    var stop = _expect.createSpy();
    var promise = _asyncValidation2['default'](fn, start, stop);
    _expect2['default'](fn).toHaveBeenCalled();
    _expect2['default'](start).toHaveBeenCalled();
    return promise.then(function () {
      _expect2['default'](false).toBe(true); // should not get into resolve branch
    }, function () {
      _expect2['default'](stop).toHaveBeenCalled();
    });
  });

  it('should call start, fn, and stop on promise reject', function () {
    var errors = { foo: 'error' };
    var fn = _expect.createSpy().andReturn(Promise.reject(errors));
    var start = _expect.createSpy();
    var stop = _expect.createSpy();
    var promise = _asyncValidation2['default'](fn, start, stop);
    _expect2['default'](fn).toHaveBeenCalled();
    _expect2['default'](start).toHaveBeenCalled();
    return promise.then(function () {
      _expect2['default'](false).toBe(true); // should not get into resolve branch
    }, function () {
      _expect2['default'](stop).toHaveBeenCalled().toHaveBeenCalledWith(errors);
    });
  });
});