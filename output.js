"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parent = function () {
    function Parent() {
        (0, _classCallCheck3.default)(this, Parent);
    }

    (0, _createClass3.default)(Parent, null, [{
        key: "getAge",
        value: function getAge() {
            console.log(12);
        }
    }]);
    return Parent;
}();

