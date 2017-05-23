"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;
function range(low, high) {
  return Array(high - low + 1).fill().map(function (_, i) {
    return i + low;
  });
}