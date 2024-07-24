"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var App = function App() {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    innerContent = _useState2[0],
    setInnerContent = _useState2[1]; // 서버에서 가져온 데이터
  var _useState3 = (0, _react.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    users = _useState4[0],
    setUsers = _useState4[1]; // 사용자가 작성한 데이터
  var _useState5 = (0, _react.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    submittedData = _useState6[0],
    setSubmittedData = _useState6[1]; // 제출된 데이터
  var _useState7 = (0, _react.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    checkName = _useState8[0],
    setCheckName = _useState8[1]; // 이름 확인 입력값
  var _useState9 = (0, _react.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    checkResult = _useState10[0],
    setCheckResult = _useState10[1]; // 이름 확인 결과

  // 데이터베이스에서 유저 목록을 가져오는 함수
  (0, _react.useEffect)(function () {
    fetch("http://localhost:3001/users").then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log("Fetched data:", data);
      setInnerContent(data);
    })["catch"](function (error) {
      return console.error("Error fetching users", error);
    });
  }, []);
  var handleChange = function handleChange(event) {
    var _event$target = event.target,
      name = _event$target.name,
      value = _event$target.value;
    setUsers(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, value));
    });
  };

  // 서버에 데이터 전송 함수
  var send = function send() {
    fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(users)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data.message);
      setSubmittedData(users);
    })["catch"](function (error) {
      console.error("send fetch error", error);
    });
  };

  // 서버에서 name 값을 조회하는 함수
  var checkNameExists = function checkNameExists() {
    fetch("http://localhost:3001/check-name/".concat(checkName)).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.exists) {
        setCheckResult("사용자가 맞습니다");
      } else {
        setCheckResult("사용자가 아닙니다");
      }
    })["catch"](function (error) {
      console.error("checkName fetch error", error);
    });
  };
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "Users"), innerContent.map(function (column) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: column.column_name
    }, /*#__PURE__*/_react["default"].createElement("label", null, column.column_name), /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      name: column.column_name,
      value: users[column.column_name] || "",
      onChange: handleChange
    }));
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: send
  }, "Submit"), Object.keys(submittedData).length > 0 && /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, innerContent.map(function (column) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      key: column.column_name
    }, column.column_name);
  }))), /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, innerContent.map(function (column) {
    return /*#__PURE__*/_react["default"].createElement("td", {
      key: column.column_name
    }, submittedData[column.column_name]);
  })))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    placeholder: "Enter name to check",
    value: checkName,
    onChange: function onChange(e) {
      return setCheckName(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: checkNameExists
  }, "Check Name"), checkResult && /*#__PURE__*/_react["default"].createElement("p", null, checkResult)));
};
var _default = exports["default"] = App;