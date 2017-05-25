import { createSpy } from 'expect';
import generateValidator from '../generateValidator';
import plain from '../structure/plain';
import plainExpectations from '../structure/plain/expectations';
import immutable from '../structure/immutable';
import immutableExpectations from '../structure/immutable/expectations';
import addExpectations from './addExpectations';

var describeGenerateValidator = function describeGenerateValidator(name, structure, expect) {
  var fromJS = structure.fromJS;

  var required = function required(value) {
    return value == null ? 'Required' : undefined;
  };
  var minValue = function minValue(min) {
    return function (value) {
      return value && value < min ? 'Too low' : undefined;
    };
  };
  var withProps = function withProps(value, values, props) {
    return props.valid ? undefined : 'Invalid';
  };

  describe(name, function () {
    it('should return a function', function () {
      var validator = generateValidator({}, structure);
      expect(validator).toBeA('function');
    });

    it('should always pass validation when no validators given', function () {
      var validator = generateValidator({}, structure);
      expect(validator(fromJS({}))).toEqual({});
      expect(validator(fromJS({
        foo: 42,
        bar: 43
      }))).toEqual({});
    });

    it('should validate simple fields', function () {
      var requiredSpy = createSpy(required).andCallThrough();
      var minValueSpy = createSpy(minValue(4)).andCallThrough();
      var validator = generateValidator({
        foo: requiredSpy,
        bar: minValueSpy
      }, structure);

      expect(requiredSpy).toNotHaveBeenCalled();
      expect(minValueSpy).toNotHaveBeenCalled();

      var values1 = fromJS({});
      var result = validator(values1);
      expect(requiredSpy).toHaveBeenCalled();
      expect(requiredSpy.calls.length).toBe(1);
      expect(requiredSpy.calls[0].arguments[0]).toBe(undefined);
      expect(requiredSpy.calls[0].arguments[1]).toEqual(values1);
      expect(minValueSpy).toHaveBeenCalled();
      expect(minValueSpy.calls.length).toBe(1);
      expect(minValueSpy.calls[0].arguments[0]).toBe(undefined);
      expect(minValueSpy.calls[0].arguments[1]).toEqual(values1);
      expect(result).toEqual({
        foo: 'Required'
      });

      var values2 = fromJS({
        foo: 'Hello',
        bar: 3
      });
      var result2 = validator(values2);
      expect(requiredSpy.calls.length).toBe(2);
      expect(requiredSpy.calls[1].arguments[0]).toBe('Hello');
      expect(requiredSpy.calls[1].arguments[1]).toEqual(values2);
      expect(minValueSpy.calls.length).toBe(2);
      expect(minValueSpy.calls[1].arguments[0]).toBe(3);
      expect(minValueSpy.calls[1].arguments[1]).toEqual(values2);
      expect(result2).toEqual({
        bar: 'Too low'
      });

      var values3 = fromJS({
        foo: 'Hello',
        bar: 4
      });
      var result3 = validator(values3);
      expect(requiredSpy.calls.length).toBe(3);
      expect(requiredSpy.calls[2].arguments[0]).toBe('Hello');
      expect(requiredSpy.calls[2].arguments[1]).toEqual(values3);
      expect(minValueSpy.calls.length).toBe(3);
      expect(minValueSpy.calls[2].arguments[0]).toBe(4);
      expect(minValueSpy.calls[2].arguments[1]).toEqual(values3);
      expect(result3).toEqual({});
    });

    it('allows validation to refer to props', function () {
      var withPropsSpy = createSpy(withProps).andCallThrough();
      var props1 = { valid: false };
      var props2 = { valid: true };
      var validator = generateValidator({ foo: withPropsSpy }, structure);

      expect(withPropsSpy).toNotHaveBeenCalled();

      var values = fromJS({});
      var result1 = validator(values, props1);
      expect(withPropsSpy).toHaveBeenCalled();
      expect(withPropsSpy.calls.length).toBe(1);
      expect(withPropsSpy.calls[0].arguments[0]).toBe(undefined);
      expect(withPropsSpy.calls[0].arguments[1]).toEqual(values);
      expect(withPropsSpy.calls[0].arguments[2]).toEqual(props1);
      expect(result1).toEqual({
        foo: 'Invalid'
      });

      var result2 = validator(values, props2);
      expect(withPropsSpy.calls.length).toBe(2);
      expect(withPropsSpy.calls[1].arguments[0]).toBe(undefined);
      expect(withPropsSpy.calls[1].arguments[1]).toEqual(values);
      expect(withPropsSpy.calls[1].arguments[2]).toEqual(props2);
      expect(result2).toEqual({});
    });

    it('should validate deep fields', function () {
      var requiredSpy = createSpy(required).andCallThrough();
      var minValueSpy = createSpy(minValue(4)).andCallThrough();
      var validator = generateValidator({
        'deep.foo': requiredSpy,
        'even.deeper.bar': minValueSpy
      }, structure);

      expect(requiredSpy).toNotHaveBeenCalled();
      expect(minValueSpy).toNotHaveBeenCalled();

      var result = validator(fromJS({}));
      expect(requiredSpy).toHaveBeenCalled();
      expect(requiredSpy.calls.length).toBe(1);
      expect(requiredSpy.calls[0].arguments[0]).toBe(undefined);
      expect(requiredSpy.calls[0].arguments[1]).toEqual(fromJS({}));
      expect(minValueSpy).toHaveBeenCalled();
      expect(minValueSpy.calls.length).toBe(1);
      expect(minValueSpy.calls[0].arguments[0]).toBe(undefined);
      expect(minValueSpy.calls[0].arguments[1]).toEqual(fromJS({}));
      expect(result).toEqual({
        deep: {
          foo: 'Required'
        }
      });

      var values2 = fromJS({
        deep: {
          foo: 'Hello'
        },
        even: {
          deeper: {
            bar: 3
          }
        }
      });
      var result2 = validator(values2);
      expect(requiredSpy.calls.length).toBe(2);
      expect(requiredSpy.calls[1].arguments[0]).toBe('Hello');
      expect(requiredSpy.calls[1].arguments[1]).toEqual(values2);
      expect(minValueSpy.calls.length).toBe(2);
      expect(minValueSpy.calls[1].arguments[0]).toBe(3);
      expect(minValueSpy.calls[1].arguments[1]).toEqual(values2);
      expect(result2).toEqual({
        even: {
          deeper: {
            bar: 'Too low'
          }
        }
      });

      var values3 = fromJS({
        deep: {
          foo: 'Hello'
        },
        even: {
          deeper: {
            bar: 4
          }
        }
      });
      var result3 = validator(values3);
      expect(requiredSpy.calls.length).toBe(3);
      expect(requiredSpy.calls[2].arguments[0]).toBe('Hello');
      expect(requiredSpy.calls[2].arguments[1]).toEqual(values3);
      expect(minValueSpy.calls.length).toBe(3);
      expect(minValueSpy.calls[2].arguments[0]).toBe(4);
      expect(minValueSpy.calls[2].arguments[1]).toEqual(values3);
      expect(result3).toEqual({});
    });

    it('should accept multiple validators', function () {
      var requiredSpy = createSpy(required).andCallThrough();
      var minValueSpy = createSpy(minValue(4)).andCallThrough();
      var validator = generateValidator({
        foo: [requiredSpy, minValueSpy]
      }, structure);

      expect(requiredSpy).toNotHaveBeenCalled();
      expect(minValueSpy).toNotHaveBeenCalled();

      var values1 = fromJS({});
      var result1 = validator(values1);
      expect(requiredSpy).toHaveBeenCalled();
      expect(requiredSpy.calls.length).toBe(1);
      expect(requiredSpy.calls[0].arguments[0]).toBe(undefined);
      expect(requiredSpy.calls[0].arguments[1]).toEqual(values1);
      expect(minValueSpy).toNotHaveBeenCalled(); // because required errored
      expect(result1).toEqual({
        foo: 'Required'
      });

      var values2 = fromJS({ foo: '3' });
      var result2 = validator(values2);
      expect(requiredSpy.calls.length).toBe(2);
      expect(requiredSpy.calls[1].arguments[0]).toBe('3');
      expect(requiredSpy.calls[1].arguments[1]).toEqual(values2);
      expect(minValueSpy).toHaveBeenCalled();
      expect(minValueSpy.calls.length).toBe(1);
      expect(minValueSpy.calls[0].arguments[0]).toBe('3');
      expect(minValueSpy.calls[0].arguments[1]).toEqual(values2);
      expect(result2).toEqual({
        foo: 'Too low'
      });

      var values3 = fromJS({ foo: '4' });
      var result3 = validator(values3);
      expect(requiredSpy.calls.length).toBe(3);
      expect(requiredSpy.calls[2].arguments[0]).toBe('4');
      expect(requiredSpy.calls[2].arguments[1]).toEqual(values3);
      expect(minValueSpy.calls.length).toBe(2);
      expect(minValueSpy.calls[1].arguments[0]).toBe('4');
      expect(minValueSpy.calls[1].arguments[1]).toEqual(values3);
      expect(result3).toEqual({});
    });
  });
};

describeGenerateValidator('generateValidator.plain', plain, addExpectations(plainExpectations));
describeGenerateValidator('generateValidator.immutable', immutable, addExpectations(immutableExpectations));