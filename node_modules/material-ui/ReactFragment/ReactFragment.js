'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _reactProdInvariant = require('react/lib/reactProdInvariant');

var _reactProdInvariant2 = _interopRequireDefault(_reactProdInvariant);

var _ReactChildren = require('react/lib/ReactChildren');

var _ReactChildren2 = _interopRequireDefault(_ReactChildren);

var _ReactElement = require('react/lib/ReactElement');

var _ReactElement2 = _interopRequireDefault(_ReactElement);

var _emptyFunction = require('fbjs/lib/emptyFunction');

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We used to allow keyed objects to serve as a collection of ReactElements,
 * or nested sets. This allowed us a way to explicitly key a set or fragment of
 * components. This is now being replaced with an opaque data structure.
 * The upgrade path is to call React.addons.createFragment({ key: value }) to
 * create a keyed fragment. The resulting data structure is an array.
 */

/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Copied from react/lib/ReactFragment in React 15.5.4
 * because this file does not exist anymore in React 16.
 * Modified to match code style.
 */

var numericPropertyRegex = /^\d+$/;

var warnedAboutNumeric = false;

var ReactFragment = {
  /**
   * Wrap a keyed object in an opaque proxy that warns you if you access any
   * of its properties.
   * See https://facebook.github.io/react/docs/create-fragment.html
   */
  create: function create(object) {
    if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) !== 'object' || !object || Array.isArray(object)) {
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'React.addons.createFragment only accepts a single object. Got: %s', object) : void 0;
      }

      return object;
    }
    if (_ReactElement2.default.isValidElement(object)) {
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'React.addons.createFragment does not accept a ReactElement ' + 'without a wrapper object.') : void 0;
      }
      return object;
    }

    if (!(object.nodeType !== 1)) {
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(false, 'React.addons.createFragment(...): Encountered an invalid child; ' + 'DOM elements are not valid children of React components.');
      } else {
        (0, _reactProdInvariant2.default)('0');
      }
    }

    var result = [];

    for (var key in object) {
      if (process.env.NODE_ENV !== 'production') {
        if (!warnedAboutNumeric && numericPropertyRegex.test(key)) {
          process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'React.addons.createFragment(...): ' + 'Child objects should have ' + 'non-numeric keys so ordering is preserved.') : void 0;
          warnedAboutNumeric = true;
        }
      }
      _ReactChildren2.default.mapIntoWithKeyPrefixInternal(object[key], result, key, _emptyFunction2.default.thatReturnsArgument);
    }

    return result;
  }
};

exports.default = ReactFragment.create;