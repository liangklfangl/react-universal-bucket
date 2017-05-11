import createGetFormInitialValues from '../getFormInitialValues';
import plain from '../../structure/plain';
import plainExpectations from '../../structure/plain/expectations';
import immutable from '../../structure/immutable';
import immutableExpectations from '../../structure/immutable/expectations';
import addExpectations from '../../__tests__/addExpectations';

var describeGetFormInitialValues = function describeGetFormInitialValues(name, structure, expect) {
  var getFormInitialValues = createGetFormInitialValues(structure);

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

describeGetFormInitialValues('getFormInitialValues.plain', plain, addExpectations(plainExpectations));
describeGetFormInitialValues('getFormInitialValues.immutable', immutable, addExpectations(immutableExpectations));