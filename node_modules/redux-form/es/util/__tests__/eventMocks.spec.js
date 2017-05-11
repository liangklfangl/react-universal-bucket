import expect from 'expect';
import * as mocks from '../eventMocks';

describe('#eventMocks', function () {
  it('should create a mock with identity functions', function () {
    var event = mocks.valueMock('value');

    expect(event.preventDefault).toBeA('function');
    expect(event.stopPropagation).toBeA('function');
    expect(event.preventDefault('id')).toEqual('id');
    expect(event.stopPropagation('id')).toEqual('id');
  });

  it('should create a value mock', function () {
    var event = mocks.valueMock('value');

    expect(event.target.value).toEqual('value');
  });

  it('should create a drag start mock', function () {
    var fn = function fn(id) {
      return id;
    };
    var event = mocks.dragStartMock(fn);

    expect(event.dataTransfer.setData).toBe(fn);
  });

  it('should create a drop mock', function () {
    var fn = function fn(id) {
      return id;
    };
    var event = mocks.dropMock(fn);

    expect(event.dataTransfer.getData).toBe(fn);
  });
});