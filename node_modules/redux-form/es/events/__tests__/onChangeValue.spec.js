import expect, { createSpy } from 'expect';
import onChangeValue from '../onChangeValue';
import { valueMock } from '../../util/eventMocks';

var name = 'sampleField';

describe('onChangeValue', function () {
  it('should parse the value before returning', function () {
    var parse = createSpy(function (value) {
      return 'parsed-' + value;
    }).andCallThrough();
    var value = onChangeValue(valueMock('bar'), { name: name, parse: parse });
    expect(parse).toHaveBeenCalled().toHaveBeenCalledWith('bar', name);
    expect(value).toBe('parsed-bar');
  });

  it('should normalize the value before returning', function () {
    var normalize = createSpy(function (_, value) {
      return 'normalized-' + value;
    }).andCallThrough();
    var value = onChangeValue(valueMock('bar'), { name: name, normalize: normalize });
    expect(normalize).toHaveBeenCalled().toHaveBeenCalledWith(name, 'bar');
    expect(value).toBe('normalized-bar');
  });

  it('should parse before normalize', function () {
    var parse = createSpy(function (value) {
      return 'parsed-' + value;
    }).andCallThrough();
    var normalize = createSpy(function (_, value) {
      return 'normalized-' + value;
    }).andCallThrough();
    var value = onChangeValue(valueMock('bar'), { name: name, normalize: normalize, parse: parse });
    expect(parse).toHaveBeenCalled().toHaveBeenCalledWith('bar', name);
    expect(normalize).toHaveBeenCalled().toHaveBeenCalledWith(name, 'parsed-bar');
    expect(value).toBe('normalized-parsed-bar');
  });
});