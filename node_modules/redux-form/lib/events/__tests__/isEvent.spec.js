'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _isEvent = require('../isEvent');

var _isEvent2 = _interopRequireDefault(_isEvent);

describe('isEvent', function () {
  it('should return false if event is undefined', function () {
    _expect2['default'](_isEvent2['default']()).toBe(false);
  });

  it('should return false if event is null', function () {
    _expect2['default'](_isEvent2['default'](null)).toBe(false);
  });

  it('should return false if event is not an object', function () {
    _expect2['default'](_isEvent2['default'](42)).toBe(false);
    _expect2['default'](_isEvent2['default'](true)).toBe(false);
    _expect2['default'](_isEvent2['default'](false)).toBe(false);
    _expect2['default'](_isEvent2['default']('not an event')).toBe(false);
  });

  it('should return false if event has no stopPropagation', function () {
    _expect2['default'](_isEvent2['default']({
      preventDefault: function preventDefault() {
        return null;
      }
    })).toBe(false);
  });

  it('should return false if event has no preventDefault', function () {
    _expect2['default'](_isEvent2['default']({
      stopPropagation: function stopPropagation() {
        return null;
      }
    })).toBe(false);
  });

  it('should return true if event has stopPropagation, and preventDefault', function () {
    _expect2['default'](_isEvent2['default']({
      stopPropagation: function stopPropagation() {
        return null;
      },
      preventDefault: function preventDefault() {
        return null;
      }
    })).toBe(true);
  });
});