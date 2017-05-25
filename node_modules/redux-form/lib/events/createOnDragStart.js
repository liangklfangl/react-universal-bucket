'use strict';

exports.__esModule = true;
var dataKey = 'value';
exports.dataKey = dataKey;
var createOnDragStart = function createOnDragStart(name, getValue) {
  return function (event) {
    event.dataTransfer.setData(dataKey, getValue());
  };
};

exports['default'] = createOnDragStart;