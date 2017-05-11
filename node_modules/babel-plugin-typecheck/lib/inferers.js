'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = make;
/**
 * Register the builtin type inferers and return a function which can infer the type of
 * a given node path.
 */
function make(_ref) {
  var t = _ref.types;
  var template = _ref.template;

  var INFERENCE_TYPES = {};

  /**
   * Register a new type inference for the given node type.
   */
  function register(type, fn) {
    INFERENCE_TYPES[type] = fn;
  }

  /**
   * Infer the type of the given node path and return an annotation.
   */
  function inferType(path) {
    var inferer = INFERENCE_TYPES[path.type];
    if (inferer) {
      return inferer(path);
    } else {
      console.log('Unsupported Type: ' + path.type);
      return path.getTypeAnnotation() || t.anyTypeAnnotation();
    }
  }

  function lookupGlobalIdentifier(name) {
    switch (name) {
      case 'Symbol':
        return t.functionTypeAnnotation(null, [], null, t.anyTypeAnnotation());
        return t.functionTypeAnnotation(null, [t.functionTypeParam(t.identifier('key'), t.stringTypeAnnotation())], null, t.anyTypeAnnotation() //t.genericTypeAnnotation(t.identifier('Symbol'))
        );
      default:
        return t.anyTypeAnnotation();
    }
  }

  register('ObjectExpression', function (path) {
    var _path$get$reduce = path.get('properties').reduce(function (_ref2, prop) {
      var _ref3 = _slicedToArray(_ref2, 2);

      var properties = _ref3[0];
      var indexers = _ref3[1];

      if (prop.node.computed) {
        var keyType = inferType(prop.get('key'));
        if (keyType.type === 'AnyTypeAnnotation') {
          keyType = t.stringTypeAnnotation();
        }
        indexers.push(t.objectTypeIndexer(t.identifier('key'), keyType, inferType(prop.get('value'))));
      } else {
        properties.push(t.objectTypeProperty(prop.node.key, inferType(prop.get('value'))));
      }
      return [properties, indexers];
    }, [[], []]);

    var _path$get$reduce2 = _slicedToArray(_path$get$reduce, 2);

    var properties = _path$get$reduce2[0];
    var indexers = _path$get$reduce2[1];


    return t.objectTypeAnnotation(properties, indexers);
  });

  register('CallExpression', function (path) {
    var callee = path.get('callee');
    var annotation = inferType(callee);
    dump(annotation);
    return t.anyTypeAnnotation();
  });

  register('Identifier', function (path) {
    var binding = path.scope.getBinding(path.node.name);
    if (!binding) {
      return lookupGlobalIdentifier(path.node.name);
    } else {
      console.log(binding);
    }
  });

  return inferType;
}