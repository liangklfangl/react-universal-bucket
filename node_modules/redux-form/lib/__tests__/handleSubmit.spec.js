'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _handleSubmit = require('../handleSubmit');

var _handleSubmit2 = _interopRequireDefault(_handleSubmit);

describe('handleSubmit', function () {

  it('should stop if sync validation fails', function () {
    var _expect$toHaveBeenCalled;

    var values = { foo: 'bar', baz: 42 };
    var fields = ['foo', 'baz'];
    var submit = _expect.createSpy().andReturn(69);
    var touch = _expect.createSpy();
    var startSubmit = _expect.createSpy();
    var stopSubmit = _expect.createSpy();
    var submitFailed = _expect.createSpy();
    var asyncValidate = _expect.createSpy();
    var validate = _expect.createSpy().andReturn({ foo: 'error' });
    var props = { fields: fields, startSubmit: startSubmit, stopSubmit: stopSubmit, submitFailed: submitFailed, touch: touch, validate: validate };

    _expect2['default'](_handleSubmit2['default'](submit, values, props, asyncValidate)).toBe(undefined);

    (_expect$toHaveBeenCalled = _expect2['default'](touch).toHaveBeenCalled()).toHaveBeenCalledWith.apply(_expect$toHaveBeenCalled, fields);
    _expect2['default'](validate).toHaveBeenCalled().toHaveBeenCalledWith(values, props);
    _expect2['default'](asyncValidate).toNotHaveBeenCalled();
    _expect2['default'](submit).toNotHaveBeenCalled();
    _expect2['default'](startSubmit).toNotHaveBeenCalled();
    _expect2['default'](stopSubmit).toNotHaveBeenCalled();
    _expect2['default'](submitFailed).toHaveBeenCalled();
  });

  it('should return result of sync submit', function () {
    var _expect$toHaveBeenCalled2;

    var values = { foo: 'bar', baz: 42 };
    var fields = ['foo', 'baz'];
    var submit = _expect.createSpy().andReturn(69);
    var dispatch = function dispatch() {
      return null;
    };
    var touch = _expect.createSpy();
    var startSubmit = _expect.createSpy();
    var stopSubmit = _expect.createSpy();
    var submitFailed = _expect.createSpy();
    var asyncValidate = _expect.createSpy();
    var validate = _expect.createSpy().andReturn({});
    var props = { dispatch: dispatch, fields: fields, startSubmit: startSubmit, stopSubmit: stopSubmit, submitFailed: submitFailed, touch: touch, validate: validate };

    _expect2['default'](_handleSubmit2['default'](submit, values, props, asyncValidate)).toBe(69);

    (_expect$toHaveBeenCalled2 = _expect2['default'](touch).toHaveBeenCalled()).toHaveBeenCalledWith.apply(_expect$toHaveBeenCalled2, fields);
    _expect2['default'](validate).toHaveBeenCalled().toHaveBeenCalledWith(values, props);
    _expect2['default'](asyncValidate).toHaveBeenCalled().toHaveBeenCalledWith();
    _expect2['default'](submit).toHaveBeenCalled().toHaveBeenCalledWith(values, dispatch);
    _expect2['default'](startSubmit).toNotHaveBeenCalled();
    _expect2['default'](stopSubmit).toNotHaveBeenCalled();
    _expect2['default'](submitFailed).toNotHaveBeenCalled();
  });

  it('should not submit if async validation fails', function () {
    var values = { foo: 'bar', baz: 42 };
    var fields = ['foo', 'baz'];
    var submit = _expect.createSpy().andReturn(69);
    var dispatch = function dispatch() {
      return null;
    };
    var touch = _expect.createSpy();
    var startSubmit = _expect.createSpy();
    var stopSubmit = _expect.createSpy();
    var submitFailed = _expect.createSpy();
    var asyncValidate = _expect.createSpy().andReturn(Promise.reject());
    var validate = _expect.createSpy().andReturn({});
    var props = { dispatch: dispatch, fields: fields, startSubmit: startSubmit, stopSubmit: stopSubmit, submitFailed: submitFailed, touch: touch, validate: validate };

    return _handleSubmit2['default'](submit, values, props, asyncValidate).then(function (result) {
      var _expect$toHaveBeenCalled3;

      _expect2['default'](result).toBe(undefined);
      (_expect$toHaveBeenCalled3 = _expect2['default'](touch).toHaveBeenCalled()).toHaveBeenCalledWith.apply(_expect$toHaveBeenCalled3, fields);
      _expect2['default'](validate).toHaveBeenCalled().toHaveBeenCalledWith(values, props);
      _expect2['default'](asyncValidate).toHaveBeenCalled().toHaveBeenCalledWith();
      _expect2['default'](submit).toNotHaveBeenCalled();
      _expect2['default'](startSubmit).toNotHaveBeenCalled();
      _expect2['default'](stopSubmit).toNotHaveBeenCalled();
      _expect2['default'](submitFailed).toHaveBeenCalled();
    }, function () {
      _expect2['default'](false).toBe(true); // should not get into reject branch
    });
  });

  it('should not submit if async validation fails and return rejected promise', function () {
    var values = { foo: 'bar', baz: 42 };
    var fields = ['foo', 'baz'];
    var submit = _expect.createSpy().andReturn(69);
    var dispatch = function dispatch() {
      return null;
    };
    var touch = _expect.createSpy();
    var startSubmit = _expect.createSpy();
    var stopSubmit = _expect.createSpy();
    var submitFailed = _expect.createSpy();
    var asyncValidate = _expect.createSpy().andReturn(Promise.reject());
    var validate = _expect.createSpy().andReturn({});
    var props = { dispatch: dispatch, fields: fields, startSubmit: startSubmit, stopSubmit: stopSubmit, submitFailed: submitFailed, touch: touch, validate: validate,
      returnRejectedSubmitPromise: true };

    return _handleSubmit2['default'](submit, values, props, asyncValidate).then(function () {
      _expect2['default'](false).toBe(true); // should not get into resolve branch
    }, function (result) {
      var _expect$toHaveBeenCalled4;

      _expect2['default'](result).toBe(undefined);
      (_expect$toHaveBeenCalled4 = _expect2['default'](touch).toHaveBeenCalled()).toHaveBeenCalledWith.apply(_expect$toHaveBeenCalled4, fields);
      _expect2['default'](validate).toHaveBeenCalled().toHaveBeenCalledWith(values, props);
      _expect2['default'](asyncValidate).toHaveBeenCalled().toHaveBeenCalledWith();
      _expect2['default'](submit).toNotHaveBeenCalled();
      _expect2['default'](startSubmit).toNotHaveBeenCalled();
      _expect2['default'](stopSubmit).toNotHaveBeenCalled();
      _expect2['default'](submitFailed).toHaveBeenCalled();
    });
  });

  it('should sync submit if async validation passes', function () {
    var values = { foo: 'bar', baz: 42 };
    var fields = ['foo', 'baz'];
    var submit = _expect.createSpy().andReturn(69);
    var dispatch = function dispatch() {
      return null;
    };
    var touch = _expect.createSpy();
    var startSubmit = _expect.createSpy();
    var stopSubmit = _expect.createSpy();
    var submitFailed = _expect.createSpy();
    var asyncValidate = _expect.createSpy().andReturn(Promise.resolve());
    var validate = _expect.createSpy().andReturn({});
    var props = { dispatch: dispatch, fields: fields, startSubmit: startSubmit, stopSubmit: stopSubmit, submitFailed: submitFailed, touch: touch, validate: validate };

    return _handleSubmit2['default'](submit, values, props, asyncValidate).then(function (result) {
      var _expect$toHaveBeenCalled5;

      _expect2['default'](result).toBe(69);
      (_expect$toHaveBeenCalled5 = _expect2['default'](touch).toHaveBeenCalled()).toHaveBeenCalledWith.apply(_expect$toHaveBeenCalled5, fields);
      _expect2['default'](validate).toHaveBeenCalled().toHaveBeenCalledWith(values, props);
      _expect2['default'](asyncValidate).toHaveBeenCalled().toHaveBeenCalledWith();
      _expect2['default'](submit).toHaveBeenCalled().toHaveBeenCalledWith(values, dispatch);
      _expect2['default'](startSubmit).toNotHaveBeenCalled();
      _expect2['default'](stopSubmit).toNotHaveBeenCalled();
      _expect2['default'](submitFailed).toNotHaveBeenCalled();
    }, function () {
      _expect2['default'](false).toBe(true); // should not get into reject branch
    });
  });

  it('should async submit if async validation passes', function () {
    var values = { foo: 'bar', baz: 42 };
    var fields = ['foo', 'baz'];
    var submit = _expect.createSpy().andReturn(Promise.resolve(69));
    var dispatch = function dispatch() {
      return null;
    };
    var touch = _expect.createSpy();
    var startSubmit = _expect.createSpy();
    var stopSubmit = _expect.createSpy();
    var submitFailed = _expect.createSpy();
    var asyncValidate = _expect.createSpy().andReturn(Promise.resolve());
    var validate = _expect.createSpy().andReturn({});
    var props = { dispatch: dispatch, fields: fields, startSubmit: startSubmit, stopSubmit: stopSubmit, submitFailed: submitFailed, touch: touch, validate: validate };

    return _handleSubmit2['default'](submit, values, props, asyncValidate).then(function (result) {
      var _expect$toHaveBeenCalled6;

      _expect2['default'](result).toBe(69);
      (_expect$toHaveBeenCalled6 = _expect2['default'](touch).toHaveBeenCalled()).toHaveBeenCalledWith.apply(_expect$toHaveBeenCalled6, fields);
      _expect2['default'](validate).toHaveBeenCalled().toHaveBeenCalledWith(values, props);
      _expect2['default'](asyncValidate).toHaveBeenCalled().toHaveBeenCalledWith();
      _expect2['default'](submit).toHaveBeenCalled().toHaveBeenCalledWith(values, dispatch);
      _expect2['default'](startSubmit).toHaveBeenCalled();
      _expect2['default'](stopSubmit).toHaveBeenCalled().toHaveBeenCalledWith();
      _expect2['default'](submitFailed).toNotHaveBeenCalled();
    }, function () {
      _expect2['default'](false).toBe(true); // should not get into reject branch
    });
  });

  it('should set submit errors if async submit fails', function () {
    var values = { foo: 'bar', baz: 42 };
    var fields = ['foo', 'baz'];
    var submitErrors = { foo: 'error' };
    var submit = _expect.createSpy().andReturn(Promise.reject(submitErrors));
    var dispatch = function dispatch() {
      return null;
    };
    var touch = _expect.createSpy();
    var startSubmit = _expect.createSpy();
    var stopSubmit = _expect.createSpy();
    var submitFailed = _expect.createSpy();
    var asyncValidate = _expect.createSpy().andReturn(Promise.resolve());
    var validate = _expect.createSpy().andReturn({});
    var props = { dispatch: dispatch, fields: fields, startSubmit: startSubmit, stopSubmit: stopSubmit, submitFailed: submitFailed, touch: touch, validate: validate };

    return _handleSubmit2['default'](submit, values, props, asyncValidate).then(function (result) {
      var _expect$toHaveBeenCalled7;

      _expect2['default'](result).toBe(undefined);
      (_expect$toHaveBeenCalled7 = _expect2['default'](touch).toHaveBeenCalled()).toHaveBeenCalledWith.apply(_expect$toHaveBeenCalled7, fields);
      _expect2['default'](validate).toHaveBeenCalled().toHaveBeenCalledWith(values, props);
      _expect2['default'](asyncValidate).toHaveBeenCalled().toHaveBeenCalledWith();
      _expect2['default'](submit).toHaveBeenCalled().toHaveBeenCalledWith(values, dispatch);
      _expect2['default'](startSubmit).toHaveBeenCalled();
      _expect2['default'](stopSubmit).toHaveBeenCalled().toHaveBeenCalledWith(submitErrors);
      _expect2['default'](submitFailed).toNotHaveBeenCalled();
    }, function () {
      _expect2['default'](false).toBe(true); // should not get into reject branch
    });
  });

  it('should set submit errors if async submit fails and return rejected promise', function () {
    var values = { foo: 'bar', baz: 42 };
    var fields = ['foo', 'baz'];
    var submitErrors = { foo: 'error' };
    var submit = _expect.createSpy().andReturn(Promise.reject(submitErrors));
    var dispatch = function dispatch() {
      return null;
    };
    var touch = _expect.createSpy();
    var startSubmit = _expect.createSpy();
    var stopSubmit = _expect.createSpy();
    var submitFailed = _expect.createSpy();
    var asyncValidate = _expect.createSpy().andReturn(Promise.resolve());
    var validate = _expect.createSpy().andReturn({});
    var props = { dispatch: dispatch, fields: fields, startSubmit: startSubmit, stopSubmit: stopSubmit, submitFailed: submitFailed, touch: touch, validate: validate,
      returnRejectedSubmitPromise: true };

    return _handleSubmit2['default'](submit, values, props, asyncValidate).then(function () {
      _expect2['default'](false).toBe(true); // should not get into resolve branch
    }, function (result) {
      var _expect$toHaveBeenCalled8;

      _expect2['default'](result).toBe(submitErrors);
      (_expect$toHaveBeenCalled8 = _expect2['default'](touch).toHaveBeenCalled()).toHaveBeenCalledWith.apply(_expect$toHaveBeenCalled8, fields);
      _expect2['default'](validate).toHaveBeenCalled().toHaveBeenCalledWith(values, props);
      _expect2['default'](asyncValidate).toHaveBeenCalled().toHaveBeenCalledWith();
      _expect2['default'](submit).toHaveBeenCalled().toHaveBeenCalledWith(values, dispatch);
      _expect2['default'](startSubmit).toHaveBeenCalled();
      _expect2['default'](stopSubmit).toHaveBeenCalled().toHaveBeenCalledWith(submitErrors);
      _expect2['default'](submitFailed).toNotHaveBeenCalled();
    });
  });
});