'use strict';

var _getFormSyncWarnings = require('../getFormSyncWarnings');

var _getFormSyncWarnings2 = _interopRequireDefault(_getFormSyncWarnings);

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

var describeGetFormSyncErrors = function describeGetFormSyncErrors(name, structure, expect) {
  var getFormSyncWarnings = (0, _getFormSyncWarnings2.default)(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function', function () {
      expect((0, _getFormSyncWarnings2.default)('foo')).toBeA('function');
    });

    it('should get the form values from state', function () {
      expect(getFormSyncWarnings('foo')(fromJS({
        form: {
          foo: {
            syncWarnings: {
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

    it('should return undefined if there are no syncWarnings', function () {
      expect(getFormSyncWarnings('foo')(fromJS({
        form: {
          foo: {}
        }
      }))).toEqual(undefined);
    });

    it('should use getFormState if provided', function () {
      expect(getFormSyncWarnings('foo', function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            syncWarnings: {
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

describeGetFormSyncErrors('getFormSyncWarnings.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeGetFormSyncErrors('getFormSyncWarnings.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));