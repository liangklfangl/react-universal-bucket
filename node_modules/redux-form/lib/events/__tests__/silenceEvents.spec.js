'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _silenceEvents = require('../silenceEvents');

var _silenceEvents2 = _interopRequireDefault(_silenceEvents);

describe('silenceEvents', function () {
  it('should return a function', function () {
    _expect2['default'](_silenceEvents2['default']()).toExist().toBeA('function');
  });

  it('should return pass all args if first arg is not event', function () {
    var spy = _expect.createSpy();
    var silenced = _silenceEvents2['default'](spy);

    silenced(1, 2, 3);
    _expect2['default'](spy).toHaveBeenCalled().toHaveBeenCalledWith(1, 2, 3);
    spy.restore();

    silenced('foo', 'bar');
    _expect2['default'](spy).toHaveBeenCalled().toHaveBeenCalledWith('foo', 'bar');
    spy.restore();

    silenced({ value: 10 }, false);
    _expect2['default'](spy).toHaveBeenCalled().toHaveBeenCalledWith({ value: 10 }, false);
    spy.restore();
  });

  it('should return pass other args if first arg is event', function () {
    var spy = _expect.createSpy();
    var silenced = _silenceEvents2['default'](spy);
    var event = {
      preventDefault: function preventDefault() {
        return null;
      },
      stopPropagation: function stopPropagation() {
        return null;
      }
    };

    silenced(event, 1, 2, 3);
    _expect2['default'](spy).toHaveBeenCalled().toHaveBeenCalledWith(1, 2, 3);
    spy.restore();

    silenced(event, 'foo', 'bar');
    _expect2['default'](spy).toHaveBeenCalled().toHaveBeenCalledWith('foo', 'bar');
    spy.restore();

    silenced(event, { value: 10 }, false);
    _expect2['default'](spy).toHaveBeenCalled().toHaveBeenCalledWith({ value: 10 }, false);
    spy.restore();
  });

  it('should silence event', function () {
    var spy = _expect.createSpy();
    var preventDefault = _expect.createSpy();
    var stopPropagation = _expect.createSpy();
    var event = {
      preventDefault: preventDefault,
      stopPropagation: stopPropagation
    };

    _silenceEvents2['default'](spy)(event);
    _expect2['default'](preventDefault).toHaveBeenCalled();
    _expect2['default'](stopPropagation).toNotHaveBeenCalled();
    _expect2['default'](spy).toHaveBeenCalled();
  });
});