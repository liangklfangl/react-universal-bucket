'use strict';

module.exports = function(fn, delay) {
  var allowSample = true;
  return function(e) {
    if (allowSample) {
      allowSample = false;
      setTimeout(function() { allowSample = true; }, delay);
      fn(e);
    }
  };
}
