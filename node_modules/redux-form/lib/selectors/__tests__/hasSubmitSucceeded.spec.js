'use strict';

var _hasSubmitSucceeded = require('../hasSubmitSucceeded');

var _hasSubmitSucceeded2 = _interopRequireDefault(_hasSubmitSucceeded);

var _plain = require('../../structure/plain');

var _plain2 = _interopRequireDefault(_plain);

var _expectations = require('../../structure/plain/expectations');

var _expectations2 = _interopRequireDefault(_expectations);

var _immutable = require('../../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _expectations3 = require('../../structure/immutable/expectations');

var _expectations4 = _interopRequireDefault(_expectations3);

var _addExpectations = require('../../__tests__/addExpectations');

var _addExpectations2 = _interopRequireDefault(_addExpectations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var describeHasSubmitSucceeded = function describeHasSubmitSucceeded(name, structure, expect) {
  var hasSubmitSucceeded = (0, _hasSubmitSucceeded2.default)(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function XXX', function () {
      expect(hasSubmitSucceeded('foo')).toBeA('function');
    });

    it('should return false when value not present', function () {
      expect(hasSubmitSucceeded('foo')(fromJS({
        form: {}
      }))).toBe(false);
    });

    it('should return true when submitting', function () {
      expect(hasSubmitSucceeded('foo')(fromJS({
        form: {
          foo: {
            submitSucceeded: true
          }
        }
      }))).toBe(true);
    });

    it('should use getFormState if provided', function () {
      expect(hasSubmitSucceeded('foo', function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            submitSucceeded: true
          }
        }
      }))).toBe(true);
    });
  });
};

describeHasSubmitSucceeded('hasSubmitSucceeded.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeHasSubmitSucceeded('hasSubmitSucceeded.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));