'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _eventMocks = require('../eventMocks');

var mocks = _interopRequireWildcard(_eventMocks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#eventMocks', function () {
  it('should create a mock with identity functions', function () {
    var event = mocks.valueMock('value');

    (0, _expect2.default)(event.preventDefault).toBeA('function');
    (0, _expect2.default)(event.stopPropagation).toBeA('function');
    (0, _expect2.default)(event.preventDefault('id')).toEqual('id');
    (0, _expect2.default)(event.stopPropagation('id')).toEqual('id');
  });

  it('should create a value mock', function () {
    var event = mocks.valueMock('value');

    (0, _expect2.default)(event.target.value).toEqual('value');
  });

  it('should create a drag start mock', function () {
    var fn = function fn(id) {
      return id;
    };
    var event = mocks.dragStartMock(fn);

    (0, _expect2.default)(event.dataTransfer.setData).toBe(fn);
  });

  it('should create a drop mock', function () {
    var fn = function fn(id) {
      return id;
    };
    var event = mocks.dropMock(fn);

    (0, _expect2.default)(event.dataTransfer.getData).toBe(fn);
  });
});