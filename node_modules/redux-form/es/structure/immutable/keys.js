import { Iterable, List } from 'immutable';

var empty = List();

var keys = function keys(value) {
  return Iterable.isIterable(value) ? value.keySeq() : empty;
};

export default keys;