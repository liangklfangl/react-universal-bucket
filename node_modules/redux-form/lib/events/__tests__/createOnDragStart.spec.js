'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _createOnDragStart = require('../createOnDragStart');

var _createOnDragStart2 = _interopRequireDefault(_createOnDragStart);

describe('createOnDragStart', function () {
  it('should return a function', function () {
    _expect2['default'](_createOnDragStart2['default']()).toExist().toBeA('function');
  });

  it('should return a function that calls dataTransfer.setData with key and result from getValue', function () {
    var getValue = _expect.createSpy().andReturn('bar');
    var setData = _expect.createSpy();
    _createOnDragStart2['default']('foo', getValue)({
      dataTransfer: { setData: setData }
    });
    _expect2['default'](getValue).toHaveBeenCalled();
    _expect2['default'](setData).toHaveBeenCalled().toHaveBeenCalledWith(_createOnDragStart.dataKey, 'bar');
  });
});