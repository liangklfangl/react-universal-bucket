import createHasSubmitSucceeded from '../hasSubmitSucceeded';
import plain from '../../structure/plain';
import plainExpectations from '../../structure/plain/expectations';
import immutable from '../../structure/immutable';
import immutableExpectations from '../../structure/immutable/expectations';
import addExpectations from '../../__tests__/addExpectations';

var describeHasSubmitSucceeded = function describeHasSubmitSucceeded(name, structure, expect) {
  var hasSubmitSucceeded = createHasSubmitSucceeded(structure);

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

describeHasSubmitSucceeded('hasSubmitSucceeded.plain', plain, addExpectations(plainExpectations));
describeHasSubmitSucceeded('hasSubmitSucceeded.immutable', immutable, addExpectations(immutableExpectations));