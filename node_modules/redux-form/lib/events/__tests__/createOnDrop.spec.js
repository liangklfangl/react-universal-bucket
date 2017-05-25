'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _createOnDrop = require('../createOnDrop');

var _createOnDrop2 = _interopRequireDefault(_createOnDrop);

var _createOnDragStart = require('../createOnDragStart');

describe('createOnDrop', function () {
  it('should return a function', function () {
    _expect2['default'](_createOnDrop2['default']()).toExist().toBeA('function');
  });

  it('should return a function that calls change with result from getData', function () {
    var change = _expect.createSpy();
    var getData = _expect.createSpy().andReturn('bar');
    _createOnDrop2['default']('foo', change)({
      dataTransfer: { getData: getData }
    });
    _expect2['default'](getData).toHaveBeenCalled().toHaveBeenCalledWith(_createOnDragStart.dataKey);
    _expect2['default'](change).toHaveBeenCalled().toHaveBeenCalledWith('foo', 'bar');
  });
});