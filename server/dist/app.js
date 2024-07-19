"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
dotenv.config({ path: "".concat(__dirname, "/../../.env") });
var port = process.env.PORT;
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json()); // JSON 형식의 요청 본문을 파싱하기 위해 body-parser 미들웨어 사용
// 정적 파일 서비스 설정
app.use(express_1["default"].static(path_1["default"].join(__dirname, '../../client/dist')));
app.get('/', function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, '../../client/dist/index.html'));
});
// /send 경로에 대한 POST 요청 처리
app.post('/send', function (req, res) {
    var content = req.body.content;
    var a = res.json({ content: content });
    console.log(a);
});
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
