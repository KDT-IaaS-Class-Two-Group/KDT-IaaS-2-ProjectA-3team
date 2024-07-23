"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose = require("mongoose");
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var pg_1 = require("pg");
var cors = require("cors");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
var port = process.env.PORT || 3001;
var pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "1234",
    port: parseInt(process.env.DB_PORT || "5432", 10)
});
// Middleware 설정
app.use(cors());
app.use(express_1["default"].static(path_1["default"].join(__dirname, "../../client/dist")));
mongoose
    .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () { return console.log("MongoDB connected"); });
var mongoSchema = new mongoose.Schema({
    data: String
});
var MongoModel = mongoose.model("test", mongoSchema);
// Root route
app.get("/", function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, "../../client/dist/index.html"));
});
// 데이터 저장
app.post("/send", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var content, mongoDoc, savedDoc, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = req.body.content;
                res.json({ content: content }); //! 클라이언트에 보내주는 코드
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                mongoDoc = new MongoModel({ data: content });
                return [4 /*yield*/, mongoDoc.save()];
            case 2:
                savedDoc = _a.sent();
                console.log("MongoDB data saved:", savedDoc); // 로그 추가
                res.status(200).send("Data saved successfully");
                return [4 /*yield*/, pool.query("INSERT INTO realtest (content) VALUES ($1)", [content])];
            case 3:
                result = _a.sent();
                res.status(201).json(result.rows[0]);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error("Error saving data:", err_1);
                res.status(500).send("Error saving data");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
