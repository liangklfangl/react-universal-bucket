import expect from 'expect';
import prefixName from '../prefixName';

describe('prefixName', function () {
  it('should concat sectionPrefix and name', function () {
    var context = {
      _reduxForm: {
        sectionPrefix: 'foo'
      }
    };
    expect(prefixName(context, 'bar')).toBe('foo.bar');
  });

  it('should ignore empty sectionPrefix', function () {
    var context = {
      _reduxForm: {
        sectionPrefix: undefined
      }
    };
    expect(prefixName(context, 'bar')).toBe('bar');
  });
});