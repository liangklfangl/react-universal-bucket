'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _wrapMapDispatchToProps = require('../wrapMapDispatchToProps');

var _wrapMapDispatchToProps2 = _interopRequireDefault(_wrapMapDispatchToProps);

var createRestorableSpy = function createRestorableSpy() {
  return _expect.createSpy(function () {
    return null;
  }, function resetCalls() {
    // i'm not sure why expect doesn't do this by default
    this.calls = [];
  });
};

describe('wrapMapDispatchToProps', function () {
  it('should bind action creators if no mapDispatchToProps given', function () {
    var actionCreators = {
      a: _expect.createSpy(),
      b: _expect.createSpy()
    };
    var result = _wrapMapDispatchToProps2['default'](undefined, actionCreators);
    _expect2['default'](result).toBeA('function');
    _expect2['default'](result.length).toBe(1);
    var dispatch = createRestorableSpy();
    var mapped = result(dispatch);
    _expect2['default'](mapped).toBeA('object');
    _expect2['default'](mapped.a).toBeA('function');
    _expect2['default'](mapped.b).toBeA('function');

    mapped.a('foo');
    _expect2['default'](actionCreators.a).toHaveBeenCalled().toHaveBeenCalledWith('foo');
    _expect2['default'](dispatch).toHaveBeenCalled();
    dispatch.restore();
    mapped.b();
    _expect2['default'](actionCreators.b).toHaveBeenCalled();
    _expect2['default'](dispatch).toHaveBeenCalled();
  });

  it('should bind action creators if object mapDispatchToProps given', function () {
    var actionCreators = {
      a: _expect.createSpy(),
      b: _expect.createSpy()
    };
    var mapDispatchToProps = {
      c: _expect.createSpy(),
      d: _expect.createSpy()
    };
    var result = _wrapMapDispatchToProps2['default'](mapDispatchToProps, actionCreators);
    _expect2['default'](result).toBeA('function');
    _expect2['default'](result.length).toBe(1);
    var dispatch = createRestorableSpy();
    var mapped = result(dispatch);
    _expect2['default'](mapped).toBeA('object');
    _expect2['default'](mapped.a).toBeA('function');
    _expect2['default'](mapped.b).toBeA('function');
    _expect2['default'](mapped.c).toBeA('function');
    _expect2['default'](mapped.d).toBeA('function');

    mapped.a('foo');
    _expect2['default'](actionCreators.a).toHaveBeenCalled().toHaveBeenCalledWith('foo');
    _expect2['default'](dispatch).toHaveBeenCalled();
    dispatch.restore();
    mapped.b();
    _expect2['default'](actionCreators.b).toHaveBeenCalled();
    _expect2['default'](dispatch).toHaveBeenCalled();
    dispatch.restore();
    mapped.c('bar');
    _expect2['default'](mapDispatchToProps.c).toHaveBeenCalled().toHaveBeenCalledWith('bar');
    _expect2['default'](dispatch).toHaveBeenCalled();
    dispatch.restore();
    mapped.d();
    _expect2['default'](mapDispatchToProps.d).toHaveBeenCalled();
    _expect2['default'](dispatch).toHaveBeenCalled();
  });

  it('should call mapDispatchToProps when one-param function given', function () {
    var actionCreators = {
      a: _expect.createSpy(),
      b: _expect.createSpy()
    };
    var mapDispatchToPropsSpy = _expect.createSpy().andReturn({ c: 42, d: true });
    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
      return mapDispatchToPropsSpy(dispatch);
    };
    _expect2['default'](mapDispatchToProps.length).toBe(1);

    var result = _wrapMapDispatchToProps2['default'](mapDispatchToProps, actionCreators);
    _expect2['default'](result).toBeA('function');
    _expect2['default'](result.length).toBe(1);
    var dispatch = createRestorableSpy();
    var mapped = result(dispatch);
    _expect2['default'](mapDispatchToPropsSpy).toHaveBeenCalled().toHaveBeenCalledWith(dispatch);

    _expect2['default'](mapped).toBeA('object');
    _expect2['default'](mapped.a).toBeA('function');
    _expect2['default'](mapped.b).toBeA('function');
    _expect2['default'](mapped.c).toBe(42);
    _expect2['default'](mapped.d).toBe(true);

    mapped.a('foo');
    _expect2['default'](actionCreators.a).toHaveBeenCalled().toHaveBeenCalledWith('foo');
    _expect2['default'](dispatch).toHaveBeenCalled();
    dispatch.restore();
    mapped.b();
    _expect2['default'](actionCreators.b).toHaveBeenCalled();
    _expect2['default'](dispatch).toHaveBeenCalled();
  });

  it('should call mapDispatchToProps when two-param function given', function () {
    var actionCreators = {
      a: _expect.createSpy(),
      b: _expect.createSpy()
    };
    var mapDispatchToPropsSpy = _expect.createSpy().andReturn({ c: 42, d: true });
    var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
      return mapDispatchToPropsSpy(dispatch, ownProps);
    };
    _expect2['default'](mapDispatchToProps.length).toBe(2);

    var result = _wrapMapDispatchToProps2['default'](mapDispatchToProps, actionCreators);
    _expect2['default'](result).toBeA('function');
    _expect2['default'](result.length).toBe(2);
    var dispatch = createRestorableSpy();
    var mapped = result(dispatch, 75);
    _expect2['default'](mapDispatchToPropsSpy).toHaveBeenCalled().toHaveBeenCalledWith(dispatch, 75);

    _expect2['default'](mapped).toBeA('object');
    _expect2['default'](mapped.a).toBeA('function');
    _expect2['default'](mapped.b).toBeA('function');
    _expect2['default'](mapped.c).toBe(42);
    _expect2['default'](mapped.d).toBe(true);

    mapped.a('foo');
    _expect2['default'](actionCreators.a).toHaveBeenCalled().toHaveBeenCalledWith('foo');
    _expect2['default'](dispatch).toHaveBeenCalled();
    dispatch.restore();
    mapped.b();
    _expect2['default'](actionCreators.b).toHaveBeenCalled();
    _expect2['default'](dispatch).toHaveBeenCalled();
  });
});