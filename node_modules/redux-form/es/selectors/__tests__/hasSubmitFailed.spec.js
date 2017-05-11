import createHasSubmitFailed from '../hasSubmitFailed';
import plain from '../../structure/plain';
import plainExpectations from '../../structure/plain/expectations';
import immutable from '../../structure/immutable';
import immutableExpectations from '../../structure/immutable/expectations';
import addExpectations from '../../__tests__/addExpectations';

var describeHasSubmitFailed = function describeHasSubmitFailed(name, structure, expect) {
  var hasSubmitFailed = createHasSubmitFailed(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function XXX', function () {
      expect(hasSubmitFailed('foo')).toBeA('function');
    });

    it('should return false when value not present', function () {
      expect(hasSubmitFailed('foo')(fromJS({
        form: {}
      }))).toBe(false);
    });

    it('should return true when submitting', function () {
      expect(hasSubmitFailed('foo')(fromJS({
        form: {
          foo: {
            submitFailed: true
          }
        }
      }))).toBe(true);
    });

    it('should use getFormState if provided', function () {
      expect(hasSubmitFailed('foo', function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            submitFailed: true
          }
        }
      }))).toBe(true);
    });
  });
};

describeHasSubmitFailed('hasSubmitFailed.plain', plain, addExpectations(plainExpectations));
describeHasSubmitFailed('hasSubmitFailed.immutable', immutable, addExpectations(immutableExpectations));