'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _createOnFocus = require('../createOnFocus');

var _createOnFocus2 = _interopRequireDefault(_createOnFocus);

describe('createOnFocus', function () {
  it('should return a function', function () {
    _expect2['default'](_createOnFocus2['default']()).toExist().toBeA('function');
  });

  it('should return a function that calls focus with name', function () {
    var focus = _expect.createSpy();
    _createOnFocus2['default']('foo', focus)();
    _expect2['default'](focus).toHaveBeenCalled().toHaveBeenCalledWith('foo');
  });
});