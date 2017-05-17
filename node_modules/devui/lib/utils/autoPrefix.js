"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var prefixSelectors = exports.prefixSelectors = function prefixSelectors(tag, selectors, style) {
  return selectors.map(function (selector) {
    return tag + "::-" + selector + " " + style;
  });
};