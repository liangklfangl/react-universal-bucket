import createGetFormAsyncErrors from '../getFormAsyncErrors';
import plain from '../../structure/plain';
import plainExpectations from '../../structure/plain/expectations';
import immutable from '../../structure/immutable';
import immutableExpectations from '../../structure/immutable/expectations';
import addExpectations from '../../__tests__/addExpectations';

var describeGetFormAsyncErrors = function describeGetFormAsyncErrors(name, structure, expect) {
  var getFormAsyncErrors = createGetFormAsyncErrors(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function', function () {
      expect(createGetFormAsyncErrors('foo')).toBeA('function');
    });

    it('should get the form values from state', function () {
      expect(getFormAsyncErrors('foo')(fromJS({
        form: {
          foo: {
            asyncErrors: {
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

    it('should return undefined if there are no asyncErrors', function () {
      expect(getFormAsyncErrors('foo')(fromJS({
        form: {
          foo: {}
        }
      }))).toEqual(undefined);
    });

    it('should use getFormState if provided', function () {
      expect(getFormAsyncErrors('foo', function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            asyncErrors: {
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

describeGetFormAsyncErrors('getFormAsyncErrors.plain', plain, addExpectations(plainExpectations));
describeGetFormAsyncErrors('getFormAsyncErrors.immutable', immutable, addExpectations(immutableExpectations));