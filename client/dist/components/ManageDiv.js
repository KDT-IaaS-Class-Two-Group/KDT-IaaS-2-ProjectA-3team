"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _useFetchDivData2 = _interopRequireDefault(require("../hooks/useFetchDivData"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ManageDiv = function ManageDiv() {
  var _useFetchDivData = (0, _useFetchDivData2["default"])(),
    columns = _useFetchDivData.columns;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "User Names"), columns.length > 0 ? /*#__PURE__*/_react["default"].createElement("ul", null, columns.map(function (name, index) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      key: index
    }, name);
  })) : /*#__PURE__*/_react["default"].createElement("p", null, "No data available"));
};
var _default = exports["default"] = ManageDiv;