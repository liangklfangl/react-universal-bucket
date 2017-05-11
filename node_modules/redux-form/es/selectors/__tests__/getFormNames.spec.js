import createGetFormNames from '../getFormNames';
import plain from '../../structure/plain';
import plainExpectations from '../../structure/plain/expectations';
import immutable from '../../structure/immutable';
import immutableExpectations from '../../structure/immutable/expectations';
import addExpectations from '../../__tests__/addExpectations';

var describeGetFormNames = function describeGetFormNames(name, structure, expect) {
  var getFormNames = createGetFormNames(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function', function () {
      expect(getFormNames()).toBeA('function');
    });

    it('should get the form names from state', function () {
      expect(getFormNames()(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Snoopy',
              cat: 'Garfield'
            }
          },
          bar: {
            values: {
              dog: 'Fido',
              cat: 'Whiskers'
            }
          }
        }
      }))).toEqualMap(['foo', 'bar']);
    });

    it('should use getFormState if provided', function () {
      expect(getFormNames(function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            values: {
              dog: 'Snoopy',
              cat: 'Garfield'
            }
          },
          bar: {
            values: {
              dog: 'Fido',
              cat: 'Whiskers'
            }
          }
        }
      }))).toEqualMap(['foo', 'bar']);
    });
  });
};

describeGetFormNames('getFormNames.plain', plain, addExpectations(plainExpectations));
describeGetFormNames('getFormNames.immutable', immutable, addExpectations(immutableExpectations));