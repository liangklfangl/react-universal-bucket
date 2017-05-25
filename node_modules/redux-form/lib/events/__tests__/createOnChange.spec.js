'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _createOnChange = require('../createOnChange');

var _createOnChange2 = _interopRequireDefault(_createOnChange);

describe('createOnChange', function () {
  it('should return a function', function () {
    _expect2['default'](_createOnChange2['default']()).toExist().toBeA('function');
  });

  it('should return a function that calls change with name and value', function () {
    var change = _expect.createSpy();
    _createOnChange2['default']('foo', change)('bar');
    _expect2['default'](change).toHaveBeenCalled().toHaveBeenCalledWith('foo', 'bar');
  });
});