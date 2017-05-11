import { destroy } from '../actions';

var describeDestroy = function describeDestroy(reducer, expect, _ref) {
  var fromJS = _ref.fromJS;
  return function () {
    it('should destroy form state', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: 'initialValue'
          },
          active: 'myField'
        },
        otherThing: {
          touchThis: false
        }
      }), destroy('foo'));
      expect(state).toEqualMap({
        otherThing: {
          touchThis: false
        }
      });
    });

    it('should destroy form state for multiple forms', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: 'fooInitialValue'
          },
          active: 'myFooField'
        },
        bar: {
          values: {
            myField: 'barInitialValue'
          },
          active: 'myBarField'
        },
        otherThing: {
          touchThis: false
        }
      }), destroy('foo', 'bar'));
      expect(state).toEqualMap({
        otherThing: {
          touchThis: false
        }
      });
    });
  };
};

export default describeDestroy;