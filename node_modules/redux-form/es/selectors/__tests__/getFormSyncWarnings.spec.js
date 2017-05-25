import createGetFormSyncErrors from '../getFormSyncWarnings';
import plain from '../../structure/plain';
import plainExpectations from '../../structure/plain/expectations';
import immutable from '../../structure/immutable';
import immutableExpectations from '../../structure/immutable/expectations';
import addExpectations from '../../__tests__/addExpectations';

var describeGetFormSyncErrors = function describeGetFormSyncErrors(name, structure, expect) {
  var getFormSyncWarnings = createGetFormSyncErrors(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function', function () {
      expect(createGetFormSyncErrors('foo')).toBeA('function');
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

describeGetFormSyncErrors('getFormSyncWarnings.plain', plain, addExpectations(plainExpectations));
describeGetFormSyncErrors('getFormSyncWarnings.immutable', immutable, addExpectations(immutableExpectations));