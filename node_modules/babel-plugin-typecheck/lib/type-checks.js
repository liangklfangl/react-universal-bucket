'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = make;
var INVALID = exports.INVALID = 0;
var NEEDS_CHECK = exports.NEEDS_CHECK = 1;
var STATICALLY_VERIFIED = exports.STATICALLY_VERIFIED = 3;

function make(_ref) {
  var t = _ref.types;

  var ANNOTATION_TYPES = {};

  registerAnnotationType('VoidTypeAnnotation', {
    compatible: ['VoidTypeAnnotation', 'NullableTypeAnnotation'],
    checkAnnotation: function checkAnnotation(expected, candidate) {
      if (candidate.type === 'VoidTypeAnnotation') {
        return STATICALLY_VERIFIED;
      } else {
        return NEEDS_CHECK;
      }
    },
    checkValue: function checkValue(expected, candidate) {
      if (t.isIdentifier(candidate) && candidate.node.name === 'undefined') {
        return STATICALLY_VERIFIED;
      } else {
        switch (candidate.type) {
          case 'NullLiteral':
          case 'ThisExpression':
          case 'NewExpression':
          case 'ObjectExpression':
          case 'ArrayExpression':
          case 'FunctionExpression':
          case 'ArrowFunctionExpression':
          case 'BooleanLiteral':
          case 'NumericLiteral':
          case 'StringLiteral':
          case 'RegExpLiteral':
            return INVALID;
          case 'Identifier':
            return candidate.node.name === 'undefined' ? INVALID : NEEDS_CHECK;
          default:
            return NEEDS_CHECK;
        }
      }
    },
    runtime: function runtime(expected, id) {
      return id + ' === undefined';
    }
  });

  registerAnnotationType('NullLiteralTypeAnnotation', {
    compatible: ['NullLiteralTypeAnnotation', 'NullableTypeAnnotation'],
    checkAnnotation: function checkAnnotation(expected, candidate) {
      if (candidate.type === 'NullLiteralTypeAnnotation') {
        return STATICALLY_VERIFIED;
      } else {
        return NEEDS_CHECK;
      }
    },
    checkValue: function checkValue(expected, candidate) {
      if (candidate.type === 'Identifier' && candidate.node.name === 'undefined') {
        return INVALID;
      } else if (candidate.type === 'NullLiteral') {
        return STATICALLY_VERIFIED;
      } else {
        switch (candidate.type) {
          case 'ThisExpression':
          case 'NewExpression':
          case 'ObjectExpression':
          case 'ArrayExpression':
          case 'FunctionExpression':
          case 'ArrowFunctionExpression':
          case 'BooleanLiteral':
          case 'NumericLiteral':
          case 'StringLiteral':
          case 'RegExpLiteral':
            return INVALID;
          default:
            return NEEDS_CHECK;
        }
      }
    },
    runtime: function runtime(expected, id) {
      return id + ' === null';
    }
  });

  registerLiteralAnnotationType('Boolean');
  registerLiteralAnnotationType('Numeric');
  registerLiteralAnnotationType('String');

  registerAnnotationType('NullableTypeAnnotation', {
    compatible: ['NullableTypeAnnotation', 'NullLiteralTypeAnnotation', 'VoidTypeAnnotation']

  });

  /**
   * Register an annotation type with the given name / config.
   */
  function registerAnnotationType(name, config) {
    ANNOTATION_TYPES[name] = config;
  }

  /**
   * Register a literal annotation type.
   */
  function registerLiteralAnnotationType(shortName) {

    var typeName = shortName + 'Literal';
    var annotationName = shortName + 'TypeAnnotation';
    var literalAnnotationName = typeName + 'TypeAnnotation';

    registerAnnotationType(literalAnnotationName, {
      compatible: [literalAnnotationName, annotationName],
      checkAnnotation: function checkAnnotation(expected, candidate) {
        if (candidate.type === literalAnnotationName) {
          if (candidate.value === expected.value) {
            return STATICALLY_VERIFIED;
          } else {
            return INVALID;
          }
        } else {
          return NEEDS_CHECK;
        }
      },
      checkValue: function checkValue(expected, candidate) {
        if (candidate.type === typeName) {
          if (candidate.value === expected.value) {
            return STATICALLY_VERIFIED;
          } else {
            return INVALID;
          }
        } else {
          switch (candidate.type) {
            case 'NullLiteral':
            case 'ThisExpression':
            case 'NewExpression':
            case 'ObjectExpression':
            case 'ArrayExpression':
            case 'FunctionExpression':
            case 'ArrowFunctionExpression':
            case 'BooleanLiteral':
            case 'NumericLiteral':
            case 'StringLiteral':
            case 'RegExpLiteral':
              return INVALID;
            case 'Identifier':
              return candidate.node.name === 'undefined' ? INVALID : NEEDS_CHECK;
            default:
              return NEEDS_CHECK;
          }
        }
      },
      runtime: function runtime(expected, id) {
        return [id + ' === value', { value: expected.value }];
      }
    });

    registerAnnotationType(annotationName, {
      compatible: [annotationName, literalAnnotationName],
      checkAnnotation: function checkAnnotation(expected, candidate) {
        if (candidate.type === literalAnnotationName) {
          return STATICALLY_VERIFIED;
        } else {
          return NEEDS_CHECK;
        }
      },
      checkValue: function checkValue(expected, candidate) {
        if (candidate.type === typeName) {
          return STATICALLY_VERIFIED;
        } else {
          switch (candidate.type) {
            case 'NullLiteral':
            case 'ThisExpression':
            case 'NewExpression':
            case 'ObjectExpression':
            case 'ArrayExpression':
            case 'FunctionExpression':
            case 'ArrowFunctionExpression':
            case 'BooleanLiteral':
            case 'NumericLiteral':
            case 'StringLiteral':
            case 'RegExpLiteral':
              return INVALID;
            case 'Identifier':
              return candidate.node.name === 'undefined' ? INVALID : NEEDS_CHECK;
            default:
              return NEEDS_CHECK;
          }
        }
      },
      runtime: function runtime(expected, id) {
        switch (shortName) {
          case 'String':
            return 'typeof ' + id + ' === \'string\'';
          case 'Numeric':
            return 'typeof ' + id + ' === \'number\'';
          case 'Boolean':
            return 'typeof ' + id + ' === \'boolean\'';
        }
      }
    });
  }

  function checkStatic(path) {}

  function checkRuntime(path) {}

  return { checkStatic: checkStatic, checkRuntime: checkRuntime };
}