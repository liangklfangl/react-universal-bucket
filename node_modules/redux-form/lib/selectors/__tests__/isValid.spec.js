'use strict';

var _isValid = require('../isValid');

var _isValid2 = _interopRequireDefault(_isValid);

var _plain = require('../../structure/plain');

var _plain2 = _interopRequireDefault(_plain);

var _expectations = require('../../structure/plain/expectations');

var _expectations2 = _interopRequireDefault(_expectations);

var _immutable = require('../../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _expectations3 = require('../../structure/immutable/expectations');

var _expectations4 = _interopRequireDefault(_expectations3);

var _addExpectations = require('../../__tests__/addExpectations');

var _addExpectations2 = _interopRequireDefault(_addExpectations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var describeIsValid = function describeIsValid(name, structure, expect) {
  var isValid = (0, _isValid2.default)(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn,
      setIn = structure.setIn;

  var getFormState = function getFormState(state) {
    return getIn(state, 'form');
  };

  describe(name, function () {
    it('should return a function', function () {
      expect(isValid('foo', getFormState)).toBeA('function');
    });

    it('should return true when form data not present', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {}
      }))).toBe(true);
    });

    it('should return true when there are no errors', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Snoopy',
              cat: 'Garfield'
            },
            asyncErrors: {},
            submitErrors: {},
            syncErrors: {}
          }
        }
      }))).toBe(true);
    });

    it('should return true when there are sync errors for a NON-registered field', function () {
      expect(isValid('foo', getFormState)(setIn(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            },
            syncErrors: {
              horse: 'Too old'
            }
          }
        }
      }), 'form.foo.syncErrors', {
        horse: 'Too Old'
      }))).toBe(true);
    });

    it('should return false when there are sync errors for registered fields', function () {
      expect(isValid('foo', getFormState)(setIn(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            }
          }
        }
      }), 'form.foo.syncErrors', {
        dog: 'Too old'
      }))).toBe(false);
    });

    it('should return false with sync error for registered array field', function () {
      expect(isValid('foo', getFormState)(setIn(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cats: ['Garfield']
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cats: { name: 'cats', type: 'FieldArray', count: 1 }
            }
          }
        }
      }), 'form.foo.syncErrors', {
        cats: {
          _error: 'Too many cats'
        }
      }))).toBe(false);
    });

    it('should return false when there is a syncError', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            error: 'Bad data',
            syncError: true,
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            }
          }
        }
      }))).toBe(false);
    });

    it('should return true when there are async errors for a NON-registered field', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            },
            asyncErrors: {
              horse: 'Too old'
            }
          }
        }
      }))).toBe(true);
    });

    it('should return false when there are async errors for registered fields', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            },
            asyncErrors: {
              dog: 'Too old'
            }
          }
        }
      }))).toBe(false);
    });

    it('should return false with async error for registered array field', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cats: ['Garfield']
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cats: { name: 'cats', type: 'FieldArray', count: 1 }
            },
            asyncErrors: {
              cats: {
                _error: 'Too many cats'
              }
            }
          }
        }
      }))).toBe(false);
    });

    it('should return true when there are submit errors for a NON-registered field', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            },
            submitErrors: {
              horse: 'Too old'
            }
          }
        }
      }))).toBe(true);
    });

    it('should return false when there are submit errors for registered fields', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            },
            submitErrors: {
              dog: 'Too old'
            }
          }
        }
      }))).toBe(false);
    });

    it('should return false with submit error for registered array field', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cats: ['Garfield']
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cats: { name: 'cats', type: 'FieldArray', count: 1 }
            },
            submitErrors: {
              cats: {
                _error: 'Too many cats'
              }
            }
          }
        }
      }))).toBe(false);
    });

    it('should return false when there is a form-wide submit error', function () {
      expect(isValid('foo', getFormState)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            },
            error: 'Form wide'
          }
        }
      }))).toBe(false);
    });

    it('should return true when there are submit errors for registered fields but told to ignore submit errors', function () {
      expect(isValid('foo', getFormState, true)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            },
            submitErrors: {
              dog: 'Too old'
            }
          }
        }
      }))).toBe(true);
    });

    it('should return true when there is a form-wide submit error, but ignoring submit errors', function () {
      expect(isValid('foo', getFormState, true)(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            },
            error: 'Form wide'
          }
        }
      }))).toBe(true);
    });

    it('should use getFormState if provided', function () {
      expect(isValid('foo', function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            values: {
              dog: 'Odie',
              cat: 'Garfield'
            },
            registeredFields: {
              dog: { name: 'dog', type: 'Field', count: 1 },
              cat: { name: 'cat', type: 'Field', count: 1 }
            },
            submitErrors: {
              dog: 'That dog is ugly'
            }
          }
        }
      }))).toBe(false);
    });

    it('should have default getFormState', function () {
      expect(isValid('foo')(fromJS({
        form: {}
      }))).toBe(true);
    });
  });
};

describeIsValid('isValid.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeIsValid('isValid.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));