import { untouch } from '../actions';

var describeUntouch = function describeUntouch(reducer, expect, _ref) {
  var fromJS = _ref.fromJS;
  return function () {
    it('should unmark fields as touched on untouch', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: {
            myField: { type: 'Field', name: 'myField' },
            myOtherField: { type: 'Field', name: 'myOtherField' }
          },
          values: {
            myField: 'value',
            myOtherField: 'otherValue'
          },
          fields: {
            myField: {
              touched: true
            },
            myOtherField: {
              touched: true
            }
          },
          anyTouched: true
        }
      }), untouch('foo', 'myField', 'myOtherField'));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            myField: { type: 'Field', name: 'myField' },
            myOtherField: { type: 'Field', name: 'myOtherField' }
          },
          values: {
            myField: 'value',
            myOtherField: 'otherValue'
          },
          fields: {
            myField: {},
            myOtherField: {}
          }
        }
      });
    });

    it('should only unmark anyTouched if all fields are now untouched', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: {
            myField: { type: 'Field', name: 'myField' },
            myOtherField: { type: 'Field', name: 'myOtherField' }
          },
          values: {
            myField: 'value',
            myOtherField: 'otherValue'
          },
          fields: {
            myField: {
              touched: true
            },
            myOtherField: {
              touched: true
            }
          },
          anyTouched: true
        }
      }), untouch('foo', 'myField'));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            myField: { type: 'Field', name: 'myField' },
            myOtherField: { type: 'Field', name: 'myOtherField' }
          },
          values: {
            myField: 'value',
            myOtherField: 'otherValue'
          },
          fields: {
            myField: {},
            myOtherField: {
              touched: true
            }
          },
          anyTouched: true
        }
      });
    });

    it('should unmark deep fields as touched on untouch', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: {
            'deep.myField': { type: 'Field', name: 'deep.myField' },
            'deep.myOtherField': { type: 'Field', name: 'deep.myOtherField' }
          },
          values: {
            deep: {
              myField: 'value',
              myOtherField: 'otherValue'
            }
          },
          fields: {
            deep: {
              myField: {
                touched: true
              },
              myOtherField: {
                touched: true
              }
            }
          },
          anyTouched: true
        }
      }), untouch('foo', 'deep.myField', 'deep.myOtherField'));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            'deep.myField': { type: 'Field', name: 'deep.myField' },
            'deep.myOtherField': { type: 'Field', name: 'deep.myOtherField' }
          },
          values: {
            deep: {
              myField: 'value',
              myOtherField: 'otherValue'
            }
          },
          fields: {
            deep: {
              myField: {},
              myOtherField: {}
            }
          }
        }
      });
    });

    it('should unmark array fields as touched on untouch', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: {
            'myFields[0]': { type: 'Field', name: 'myFields[0]' },
            'myFields[1]': { type: 'Field', name: 'myFields[1]' }
          },
          values: {
            myFields: ['value', 'otherValue']
          },
          fields: {
            myFields: [{ touched: true }, { touched: true }]
          },
          anyTouched: true
        }
      }), untouch('foo', 'myFields[0]', 'myFields[1]'));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            'myFields[0]': { type: 'Field', name: 'myFields[0]' },
            'myFields[1]': { type: 'Field', name: 'myFields[1]' }
          },
          values: {
            myFields: ['value', 'otherValue']
          },
          fields: {
            myFields: [{}, {}]
          }
        }
      });
    });
  };
};

export default describeUntouch;