'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _onChangeValue = require('../onChangeValue');

var _onChangeValue2 = _interopRequireDefault(_onChangeValue);

var _eventMocks = require('../../util/eventMocks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'sampleField';

describe('onChangeValue', function () {
  it('should parse the value before returning', function () {
    var parse = (0, _expect.createSpy)(function (value) {
      return 'parsed-' + value;
    }).andCallThrough();
    var value = (0, _onChangeValue2.default)((0, _eventMocks.valueMock)('bar'), { name: name, parse: parse });
    (0, _expect2.default)(parse).toHaveBeenCalled().toHaveBeenCalledWith('bar', name);
    (0, _expect2.default)(value).toBe('parsed-bar');
  });

  it('should normalize the value before returning', function () {
    var normalize = (0, _expect.createSpy)(function (_, value) {
      return 'normalized-' + value;
    }).andCallThrough();
    var value = (0, _onChangeValue2.default)((0, _eventMocks.valueMock)('bar'), { name: name, normalize: normalize });
    (0, _expect2.default)(normalize).toHaveBeenCalled().toHaveBeenCalledWith(name, 'bar');
    (0, _expect2.default)(value).toBe('normalized-bar');
  });

  it('should parse before normalize', function () {
    var parse = (0, _expect.createSpy)(function (value) {
      return 'parsed-' + value;
    }).andCallThrough();
    var normalize = (0, _expect.createSpy)(function (_, value) {
      return 'normalized-' + value;
    }).andCallThrough();
    var value = (0, _onChangeValue2.default)((0, _eventMocks.valueMock)('bar'), { name: name, normalize: normalize, parse: parse });
    (0, _expect2.default)(parse).toHaveBeenCalled().toHaveBeenCalledWith('bar', name);
    (0, _expect2.default)(normalize).toHaveBeenCalled().toHaveBeenCalledWith(name, 'parsed-bar');
    (0, _expect2.default)(value).toBe('normalized-parsed-bar');
  });
});