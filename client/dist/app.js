"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Input = _interopRequireDefault(require("./components/Input"));
var _Button = _interopRequireDefault(require("./components/Button"));
var _useDataServeEvent2 = _interopRequireDefault(require("./hooks/useDataServeEvent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var App = function App() {
  var _useDataServeEvent = (0, _useDataServeEvent2["default"])(),
    inputValue = _useDataServeEvent.inputValue,
    setInputValue = _useDataServeEvent.setInputValue,
    sendDataToServer = _useDataServeEvent.sendDataToServer;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Input["default"], null), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    eventFunc: sendDataToServer
  }));
};
var _default = exports["default"] = App;