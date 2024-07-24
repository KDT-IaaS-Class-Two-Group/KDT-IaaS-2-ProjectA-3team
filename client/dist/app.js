"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _useDataServeEvent2 = _interopRequireDefault(require("./hooks/useDataServeEvent"));
var _DynamicInputForm = _interopRequireDefault(require("./components/DynamicInputForm"));
var _ManageDiv = _interopRequireDefault(require("./components/ManageDiv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var App = function App() {
  var _useDataServeEvent = (0, _useDataServeEvent2["default"])(),
    inputValue = _useDataServeEvent.inputValue,
    setInputValue = _useDataServeEvent.setInputValue,
    sendDataToServer = _useDataServeEvent.sendDataToServer;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_DynamicInputForm["default"], null), /*#__PURE__*/_react["default"].createElement(_ManageDiv["default"], null));
};
var _default = exports["default"] = App;