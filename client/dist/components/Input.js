"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Input = function Input(_ref) {
  var inputValue = _ref.inputValue,
    setInputValue = _ref.setInputValue;
  return /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    placeholder: "Enter your input here",
    value: inputValue,
    onChange: function onChange(e) {
      setInputValue(e.target.value);
    }
  });
};
var _default = exports["default"] = Input;