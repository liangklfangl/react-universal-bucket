import createIsSubmitting from '../isSubmitting';
import plain from '../../structure/plain';
import plainExpectations from '../../structure/plain/expectations';
import immutable from '../../structure/immutable';
import immutableExpectations from '../../structure/immutable/expectations';
import addExpectations from '../../__tests__/addExpectations';

var describeIsSubmitting = function describeIsSubmitting(name, structure, expect) {
  var isSubmitting = createIsSubmitting(structure);

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

describeIsSubmitting('isSubmitting.plain', plain, addExpectations(plainExpectations));
describeIsSubmitting('isSubmitting.immutable', immutable, addExpectations(immutableExpectations));