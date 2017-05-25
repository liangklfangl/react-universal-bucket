'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _createOnBlur = require('../createOnBlur');

var _createOnBlur2 = _interopRequireDefault(_createOnBlur);

describe('createOnBlur', function () {
  it('should return a function', function () {
    _expect2['default'](_createOnBlur2['default']()).toExist().toBeA('function');
  });

  it('should return a function that calls blur with name and value', function () {
    var blur = _expect.createSpy();
    _createOnBlur2['default']('foo', blur)('bar');
    _expect2['default'](blur).toHaveBeenCalled().toHaveBeenCalledWith('foo', 'bar');
  });

  it('should return a function that calls blur with name and value from event', function () {
    var blur = _expect.createSpy();
    _createOnBlur2['default']('foo', blur)({
      target: {
        value: 'bar'
      },
      preventDefault: function preventDefault() {
        return null;
      },
      stopPropagation: function stopPropagation() {
        return null;
      }
    });
    _expect2['default'](blur).toHaveBeenCalled().toHaveBeenCalledWith('foo', 'bar');
  });

  it('should return a function that calls blur and then afterBlur with name and value', function () {
    var blur = _expect.createSpy();
    var afterBlur = _expect.createSpy();
    _createOnBlur2['default']('foo', blur, false, afterBlur)('bar');
    _expect2['default'](blur).toHaveBeenCalled();
    _expect2['default'](afterBlur).toHaveBeenCalled().toHaveBeenCalledWith('foo', 'bar');
  });
});