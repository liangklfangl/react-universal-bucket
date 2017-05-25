'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../actions');

var describeArrayRemove = function describeArrayRemove(reducer, expect, _ref) {
  var fromJS = _ref.fromJS,
      setIn = _ref.setIn;
  return function () {
    it('should remove from beginning', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 0));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: ['b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      });
    });

    it('should remove from end', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 3));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }]
            }
          }
        }
      });
    });

    it('should remove from middle', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 1));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: ['a', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      });
    });

    it('should remove sync error from beginning', function () {
      var state = reducer(setIn(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      }), 'foo.syncErrors', {
        myField: {
          subField: ['error 0', 'error 1', 'error 2', 'error 3']
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 0));
      expect(state).toEqualMap(setIn(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      }), 'foo.syncErrors', {
        myField: {
          subField: ['error 1', 'error 2', 'error 3']
        }
      }));
    });

    it('should remove sync error from end', function () {
      var state = reducer(setIn(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      }), 'foo.syncErrors', {
        myField: {
          subField: ['error 0', 'error 1', 'error 2', 'error 3']
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 3));
      expect(state).toEqualMap(setIn(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }]
            }
          }
        }
      }), 'foo.syncErrors', {
        myField: {
          subField: ['error 0', 'error 1', 'error 2']
        }
      }));
    });

    it('should remove sync error from middle', function () {
      var state = reducer(setIn(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      }), 'foo.syncErrors', {
        myField: {
          subField: ['error 0', 'error 1', 'error 2', 'error 3']
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 1));
      expect(state).toEqualMap(setIn(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true, visited: true }, { touched: true }]
            }
          }
        }
      }), 'foo.syncErrors', {
        myField: {
          subField: ['error 0', 'error 2', 'error 3']
        }
      }));
    });

    it('should remove async error from beginning', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          asyncErrors: {
            myField: {
              subField: ['error 0', 'error 1', 'error 2', 'error 3']
            }
          }
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 0));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: ['b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          asyncErrors: {
            myField: {
              subField: ['error 1', 'error 2', 'error 3']
            }
          }
        }
      });
    });

    it('should remove async error from end', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          asyncErrors: {
            myField: {
              subField: ['error 0', 'error 1', 'error 2', 'error 3']
            }
          }
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 3));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }]
            }
          },
          asyncErrors: {
            myField: {
              subField: ['error 0', 'error 1', 'error 2']
            }
          }
        }
      });
    });

    it('should remove async error from middle', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          asyncErrors: {
            myField: {
              subField: ['error 0', 'error 1', 'error 2', 'error 3']
            }
          }
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 1));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: ['a', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          asyncErrors: {
            myField: {
              subField: ['error 0', 'error 2', 'error 3']
            }
          }
        }
      });
    });
    it('should remove submit error from beginning', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          submitErrors: {
            myField: {
              subField: ['error 0', 'error 1', 'error 2', 'error 3']
            }
          }
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 0));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: ['b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          submitErrors: {
            myField: {
              subField: ['error 1', 'error 2', 'error 3']
            }
          }
        }
      });
    });

    it('should remove submit error from end', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          submitErrors: {
            myField: {
              subField: ['error 0', 'error 1', 'error 2', 'error 3']
            }
          }
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 3));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }]
            }
          },
          submitErrors: {
            myField: {
              subField: ['error 0', 'error 1', 'error 2']
            }
          }
        }
      });
    });

    it('should remove submit error from middle', function () {
      var state = reducer(fromJS({
        foo: {
          values: {
            myField: {
              subField: ['a', 'b', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          submitErrors: {
            myField: {
              subField: ['error 0', 'error 1', 'error 2', 'error 3']
            }
          }
        }
      }), (0, _actions.arrayRemove)('foo', 'myField.subField', 1));
      expect(state).toEqualMap({
        foo: {
          values: {
            myField: {
              subField: ['a', 'c', 'd']
            }
          },
          fields: {
            myField: {
              subField: [{ touched: true, visited: true }, { touched: true, visited: true }, { touched: true }]
            }
          },
          submitErrors: {
            myField: {
              subField: ['error 0', 'error 2', 'error 3']
            }
          }
        }
      });
    });
  };
};

exports.default = describeArrayRemove;