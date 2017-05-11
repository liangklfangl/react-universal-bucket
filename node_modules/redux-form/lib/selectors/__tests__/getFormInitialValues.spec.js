'use strict';

var _getFormInitialValues = require('../getFormInitialValues');

var _getFormInitialValues2 = _interopRequireDefault(_getFormInitialValues);

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

var describeGetFormInitialValues = function describeGetFormInitialValues(name, structure, expect) {
  var getFormInitialValues = (0, _getFormInitialValues2.default)(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function', function () {
      expect(getFormInitialValues('foo')).toBeA('function');
    });

    it('should get the initial form values from state', function () {
      expect(getFormInitialValues('foo')(fromJS({
        form: {
          foo: {
            initial: {
              dog: 'Snoopy',
              cat: 'Garfield'
            }
          }
        }
      }))).toEqualMap({
        dog: 'Snoopy',
        cat: 'Garfield'
      });
    });

    it('should use getFormState if provided', function () {
      expect(getFormInitialValues('foo', function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            initial: {
              dog: 'Snoopy',
              cat: 'Garfield'
            }
          }
        }
      }))).toEqualMap({
        dog: 'Snoopy',
        cat: 'Garfield'
      });
    });
  });
};

describeGetFormInitialValues('getFormInitialValues.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeGetFormInitialValues('getFormInitialValues.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));