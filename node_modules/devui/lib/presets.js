'use strict';

require('codemirror/mode/javascript/javascript');

require('codemirror/addon/fold/foldgutter');

require('codemirror/addon/fold/foldcode');

require('codemirror/addon/fold/brace-fold');

/* eslint-disable global-require */

if (process.env.NODE_ENV !== 'test') {
  require('../fonts/index.css');
  require('codemirror/lib/codemirror.css');
  require('codemirror/addon/fold/foldgutter.css');
}