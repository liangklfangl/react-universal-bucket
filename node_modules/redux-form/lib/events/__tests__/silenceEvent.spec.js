'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _silenceEvent = require('../silenceEvent');

var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

describe('silenceEvent', function () {
  it('should return false if not an event', function () {
    _expect2['default'](_silenceEvent2['default'](undefined)).toBe(false);
    _expect2['default'](_silenceEvent2['default'](null)).toBe(false);
    _expect2['default'](_silenceEvent2['default'](true)).toBe(false);
    _expect2['default'](_silenceEvent2['default'](42)).toBe(false);
    _expect2['default'](_silenceEvent2['default']({})).toBe(false);
    _expect2['default'](_silenceEvent2['default']([])).toBe(false);
    _expect2['default'](_silenceEvent2['default'](function () {
      return null;
    })).toBe(false);
  });

  it('should return true if an event', function () {
    _expect2['default'](_silenceEvent2['default']({
      preventDefault: function preventDefault() {
        return null;
      },
      stopPropagation: function stopPropagation() {
        return null;
      }
    })).toBe(true);
  });

  it('should call preventDefault and stopPropagation', function () {
    var preventDefault = _expect.createSpy();
    var stopPropagation = _expect.createSpy();

    _silenceEvent2['default']({
      preventDefault: preventDefault,
      stopPropagation: stopPropagation
    });
    _expect2['default'](preventDefault).toHaveBeenCalled();
    _expect2['default'](stopPropagation).toNotHaveBeenCalled();
  });
});