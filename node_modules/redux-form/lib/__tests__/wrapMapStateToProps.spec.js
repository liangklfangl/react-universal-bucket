'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _wrapMapStateToProps = require('../wrapMapStateToProps');

var _wrapMapStateToProps2 = _interopRequireDefault(_wrapMapStateToProps);

describe('wrapMapStateToProps', function () {
  it('should save form if no mapStateToProps given', function () {
    var getForm = _expect.createSpy().andReturn('foo');
    var result = _wrapMapStateToProps2['default'](undefined, getForm);
    _expect2['default'](result).toBeA('function');
    _expect2['default'](result.length).toBe(1);
    var mapped = result('bar');
    _expect2['default'](getForm).toHaveBeenCalled().toHaveBeenCalledWith('bar');
    _expect2['default'](mapped).toEqual({ form: 'foo' });
  });

  it('should throw error when mapStateToProps is not a function', function () {
    var getForm = _expect.createSpy();
    _expect2['default'](function () {
      return _wrapMapStateToProps2['default'](true, getForm);
    }).toThrow('mapStateToProps must be a function');
    _expect2['default'](function () {
      return _wrapMapStateToProps2['default'](42, getForm);
    }).toThrow('mapStateToProps must be a function');
    _expect2['default'](function () {
      return _wrapMapStateToProps2['default']({}, getForm);
    }).toThrow('mapStateToProps must be a function');
    _expect2['default'](function () {
      return _wrapMapStateToProps2['default']([], getForm);
    }).toThrow('mapStateToProps must be a function');
    _expect2['default'](getForm).toNotHaveBeenCalled();
  });

  it('should call mapStateToProps when one-param function given', function () {
    var getForm = _expect.createSpy().andReturn('foo');
    var mapStateToPropsSpy = _expect.createSpy().andReturn({ a: 42, b: true, c: 'baz' });
    var mapStateToProps = function mapStateToProps(state) {
      return mapStateToPropsSpy(state);
    };
    _expect2['default'](mapStateToProps.length).toBe(1);

    var result = _wrapMapStateToProps2['default'](mapStateToProps, getForm);
    _expect2['default'](result).toBeA('function');
    _expect2['default'](result.length).toBe(1);
    var mapped = result('bar');
    _expect2['default'](mapStateToPropsSpy).toHaveBeenCalled().toHaveBeenCalledWith('bar');
    _expect2['default'](getForm).toHaveBeenCalled().toHaveBeenCalledWith('bar');

    _expect2['default'](mapped).toEqual({
      a: 42,
      b: true,
      c: 'baz',
      form: 'foo'
    });
  });

  it('should call mapStateToProps when two-param function given', function () {
    var getForm = _expect.createSpy().andReturn('foo');
    var mapStateToPropsSpy = _expect.createSpy().andReturn({ a: 42, b: true, c: 'baz' });
    var mapStateToProps = function mapStateToProps(state, ownProps) {
      return mapStateToPropsSpy(state, ownProps);
    };
    _expect2['default'](mapStateToProps.length).toBe(2);

    var result = _wrapMapStateToProps2['default'](mapStateToProps, getForm);
    _expect2['default'](result).toBeA('function');
    _expect2['default'](result.length).toBe(2);
    var mapped = result('bar', 'dog');
    _expect2['default'](mapStateToPropsSpy).toHaveBeenCalled().toHaveBeenCalledWith('bar', 'dog');
    _expect2['default'](getForm).toHaveBeenCalled().toHaveBeenCalledWith('bar');

    _expect2['default'](mapped).toEqual({
      a: 42,
      b: true,
      c: 'baz',
      form: 'foo'
    });
  });
});