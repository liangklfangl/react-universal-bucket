'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var empty = (0, _immutable.List)();

var keys = function keys(value) {
  return _immutable.Iterable.isIterable(value) ? value.keySeq() : empty;
};

exports.default = keys;