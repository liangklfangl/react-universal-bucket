'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _immutable = require('immutable');

var _keys = require('../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expectEqual = function expectEqual(a, b) {
  return (0, _expect2.default)((0, _immutable.is)(a, b)).toBe(true);
};

describe('structure.immutable.keys', function () {
  it('should return empty List if state is undefined', function () {
    expectEqual((0, _keys2.default)(undefined), (0, _immutable.List)());
  });

  it('should return empty List if no keys', function () {
    expectEqual((0, _keys2.default)((0, _immutable.Map)()), (0, _immutable.List)());
  });

  it('should return keys', function () {
    expectEqual((0, _keys2.default)((0, _immutable.fromJS)({
      a: 1,
      b: 2,
      c: 3
    })), (0, _immutable.List)(['a', 'b', 'c']));
  });
});