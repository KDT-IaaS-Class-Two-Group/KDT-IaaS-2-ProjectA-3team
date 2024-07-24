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
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isTableVisible = _useState6[0],
    setIsTableVisible = _useState6[1]; // '여기가 바뀜' 테이블 표시 여부 상태 추가
  var _useState7 = (0, _react.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    nameToCheck = _useState8[0],
    setNameToCheck = _useState8[1]; // '여기가 바뀜' 확인할 이름 입력 상태 추가
  var _useState9 = (0, _react.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    validationMessage = _useState10[0],
    setValidationMessage = _useState10[1]; // '여기가 바뀜' 검증 결과 메시지 상태 추가

  // 데이터베이스에서 유저 목록을 가져오는 함수
  (0, _react.useEffect)(function () {
    fetch("http://localhost:3001/users").then(function (response) {
      return response.json();
    }).then(function (data) {
      return setInnerContent(data);
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
    }).then(function () {
      setIsTableVisible(true); // '여기가 바뀜' 테이블을 표시
    })["catch"](function (error) {
      console.error("send fetch error", error);
    });
  };

  // 이름 확인 함수 '여기가 바뀜'
  var checkName = function checkName() {
    if (users.name === nameToCheck) {
      setValidationMessage("사용자가 맞습니다");
    } else {
      setValidationMessage("사용자가 아닙니다");
    }
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
  }, "gg"), isTableVisible && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", null, "\uD14C\uC774\uBE14"), /*#__PURE__*/_react["default"].createElement("table", null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, innerContent.map(function (column) {
    return /*#__PURE__*/_react["default"].createElement("th", {
      key: column.column_name
    }, column.column_name);
  }))), /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, innerContent.map(function (column) {
    return /*#__PURE__*/_react["default"].createElement("td", {
      key: column.column_name
    }, users[column.column_name]);
  })))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: nameToCheck,
    onChange: function onChange(e) {
      return setNameToCheck(e.target.value);
    },
    placeholder: "\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694"
  }), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: checkName
  }, "\uD655\uC778"), validationMessage && /*#__PURE__*/_react["default"].createElement("p", null, validationMessage))));
};
var _default = exports["default"] = App;