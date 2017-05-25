'use strict';

var _isSubmitting = require('../isSubmitting');

var _isSubmitting2 = _interopRequireDefault(_isSubmitting);

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

var describeIsSubmitting = function describeIsSubmitting(name, structure, expect) {
  var isSubmitting = (0, _isSubmitting2.default)(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function XXX', function () {
      expect(isSubmitting('foo')).toBeA('function');
    });

    it('should return false when value not present', function () {
      expect(isSubmitting('foo')(fromJS({
        form: {}
      }))).toBe(false);
    });

    it('should return true when submitting', function () {
      expect(isSubmitting('foo')(fromJS({
        form: {
          foo: {
            submitting: true
          }
        }
      }))).toBe(true);
    });

    it('should use getFormState if provided', function () {
      expect(isSubmitting('foo', function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            submitting: true
          }
        }
      }))).toBe(true);
    });
  });
};

describeIsSubmitting('isSubmitting.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeIsSubmitting('isSubmitting.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));