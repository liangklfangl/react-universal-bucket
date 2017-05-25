'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../actions');

var describeInitialize = function describeInitialize(reducer, expect, _ref) {
  var fromJS = _ref.fromJS;
  return function () {
    it('should set initialize values on initialize on empty state', function () {
      var state = reducer(undefined, (0, _actions.initialize)('foo', { myField: 'initialValue' }));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: 'initialValue'
          },
          initial: {
            myField: 'initialValue'
          }
        }
      });
    });

    it('should allow initializing null values', function () {
      var state = reducer(undefined, (0, _actions.initialize)('foo', { bar: 'baz', dog: null }));
      expect(state).toEqualMap({
        foo: {
          values: {
            bar: 'baz',
            dog: null
          },
          initial: {
            bar: 'baz',
            dog: null
          }
        }
      });
    });

    it('should initialize nested values on initialize on empty state', function () {
      var state = reducer(undefined, (0, _actions.initialize)('foo', { myField: { subField: 'initialValue' } }));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: 'initialValue'
            }
          },
          initial: {
            myField: {
              subField: 'initialValue'
            }
          }
        }
      });
    });

    it('should initialize array values on initialize on empty state', function () {
      var state = reducer(undefined, (0, _actions.initialize)('foo', { myField: ['initialValue'] }));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: ['initialValue']
          },
          initial: {
            myField: ['initialValue']
          }
        }
      });
    });

    it('should initialize array values with subvalues on initialize on empty state', function () {
      var state = reducer(undefined, (0, _actions.initialize)('foo', {
        accounts: [{
          name: 'Bobby Tables',
          email: 'bobby@gmail.com'
        }, {
          name: 'Sammy Tables',
          email: 'sammy@gmail.com'
        }]
      }));
      expect(state).toEqualMap({
        foo: {
          values: {
            accounts: [{
              name: 'Bobby Tables',
              email: 'bobby@gmail.com'
            }, {
              name: 'Sammy Tables',
              email: 'sammy@gmail.com'
            }]
          },
          initial: {
            accounts: [{
              name: 'Bobby Tables',
              email: 'bobby@gmail.com'
            }, {
              name: 'Sammy Tables',
              email: 'sammy@gmail.com'
            }]
          }
        }
      });
    });

    it('should set initialize values, making form pristine when initializing', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: 'dirtyValue'
          },
          fields: {
            myField: {
              touched: true
            }
          }
        }
      }), (0, _actions.initialize)('foo', { myField: 'cleanValue' }));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: 'cleanValue'
          },
          initial: {
            myField: 'cleanValue'
          }
        }
      });
    });

    it('should set initialize values, and not remove registered fields', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: {
            username: { name: 'username', type: 'Field', count: 1 },
            password: { name: 'password', type: 'Field', count: 1 }
          },
          values: {
            username: 'dirtyValue'
          },
          fields: {
            username: {
              touched: true
            }
          }
        }
      }), (0, _actions.initialize)('foo', { username: 'cleanValue', password: 'cleanPassword' }));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            username: { name: 'username', type: 'Field', count: 1 },
            password: { name: 'password', type: 'Field', count: 1 }
          },
          values: {
            username: 'cleanValue',
            password: 'cleanPassword'
          },
          initial: {
            username: 'cleanValue',
            password: 'cleanPassword'
          }
        }
      });
    });

    it('should not retain submitSucceeded when keepSubmitSucceeded is not set', function () {
      var state = reducer(fromJS({
        foo: {
          submitSucceeded: true
        }
      }), (0, _actions.initialize)('foo', {}));
      expect(state).toEqualMap({
        foo: {
          values: {},
          initial: {}
        }
      });
    });

    it('should retain submitSucceeded when keepSubmitSucceeded is set', function () {
      var state = reducer(fromJS({
        foo: {
          submitSucceeded: true
        }
      }), (0, _actions.initialize)('foo', {}, { keepSubmitSucceeded: true }));
      expect(state).toEqualMap({
        foo: {
          values: {},
          initial: {},
          submitSucceeded: true
        }
      });
    });

    it('should retain dirty values when keepDirty is set', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: {
            myField: { name: 'myField', type: 'Field', count: 1 }
          },
          values: {
            myField: 'dirtyValue'
          },
          initial: {
            myField: 'initialValue'
          }
        }
      }), (0, _actions.initialize)('foo', { myField: 'newValue' }, true));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            myField: { name: 'myField', type: 'Field', count: 1 }
          },
          values: {
            myField: 'dirtyValue'
          },
          initial: {
            myField: 'newValue'
          }
        }
      });
    });

    it('should replace pristine values when keepDirty is set', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: {
            myField: { name: 'myField', type: 'Field', count: 1 }
          },
          values: {
            myField: 'initialValue'
          },
          initial: {
            myField: 'initialValue'
          }
        }
      }), (0, _actions.initialize)('foo', { myField: 'newValue' }, true));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            myField: { name: 'myField', type: 'Field', count: 1 }
          },
          values: {
            myField: 'newValue'
          },
          initial: {
            myField: 'newValue'
          }
        }
      });
    });

    it('should treat a matching dirty value as pristine when keepDirty is set', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: {
            myField: { name: 'myField', type: 'Field', count: 1 }
          },
          values: {
            myField: 'newValue'
          },
          initial: {
            myField: 'initialValue'
          }
        }
      }), (0, _actions.initialize)('foo', { myField: 'newValue' }, true));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            myField: { name: 'myField', type: 'Field', count: 1 }
          },
          values: {
            myField: 'newValue'
          },
          initial: {
            myField: 'newValue'
          }
        }
      });
    });

    it('allows passing keepDirty in options argument', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: {
            myField: { name: 'myField', type: 'Field', count: 1 }
          },
          values: {
            myField: 'dirtyValue'
          },
          initial: {
            myField: 'initialValue'
          }
        }
      }), (0, _actions.initialize)('foo', { myField: 'newValue' }, { keepDirty: true }));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            myField: { name: 'myField', type: 'Field', count: 1 }
          },
          values: {
            myField: 'dirtyValue'
          },
          initial: {
            myField: 'newValue'
          }
        }
      });
    });

    it('should persist warnings if they exist', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: [{ name: 'myField', type: 'Field' }],
          values: {
            myField: 'newValue'
          },
          initial: {
            myField: 'initialValue'
          },
          warning: 'form wide warning',
          syncWarnings: {
            myField: 'field warning'
          }
        }
      }), (0, _actions.initialize)('foo', { myField: 'newValue' }, true));
      expect(state).toEqualMap({
        foo: {
          registeredFields: [{ name: 'myField', type: 'Field' }],
          values: {
            myField: 'newValue'
          },
          initial: {
            myField: 'newValue'
          },
          warning: 'form wide warning',
          syncWarnings: {
            myField: 'field warning'
          }
        }
      });
    });

    it('should persist errors if they exist', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: [{ name: 'myField', type: 'Field' }],
          values: {
            myField: 'newValue'
          },
          initial: {
            myField: 'initialValue'
          },
          error: 'form wide error',
          syncErrors: {
            myField: 'field error'
          }
        }
      }), (0, _actions.initialize)('foo', { myField: 'newValue' }, true));
      expect(state).toEqualMap({
        foo: {
          registeredFields: [{ name: 'myField', type: 'Field' }],
          values: {
            myField: 'newValue'
          },
          initial: {
            myField: 'newValue'
          },
          error: 'form wide error',
          syncErrors: {
            myField: 'field error'
          }
        }
      });
    });
  };
};

exports.default = describeInitialize;