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
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var path_1 = __importDefault(require("path"));
var pg_1 = require("pg");
var body_parser_1 = __importDefault(require("body-parser"));
var cors = require("cors");
dotenv.config();
var app = (0, express_1["default"])();
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
app.use(express_1["default"].json());
app.use(express_1["default"].static(path_1["default"].join(__dirname, "../../client/dist")));
app.use(body_parser_1["default"].json());
// mongoose
//   .connect("mongodb://localhost:27017/test")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err: Error) => console.error("MongoDB connection error:", err));
// const mongoSchema = new mongoose.Schema({
//   data: String,
// });
// const MongoModel = mongoose.model("test", mongoSchema);
// Root route
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
// });
app.get("/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'test_user' AND column_name NOT IN ('id')")];
            case 1:
                result = _a.sent();
                console.log(result.rows);
                res.json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error("유저 목록 가져오기 오류:", err_1);
                res.status(500).send("서버 오류");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/send", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, birth, password, name, phonenumber, address, value, client, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, birth = _a.birth, password = _a.password, name = _a.name, phonenumber = _a.phonenumber, address = _a.address;
                value = [birth, password, name, phonenumber, address];
                return [4 /*yield*/, pool.connect()];
            case 1:
                client = _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, 5, 6]);
                return [4 /*yield*/, client.query("INSERT INTO test_user (birth, password, name, phonenumber,address) VALUES ($1,$2,$3,$4,$5)", value)];
            case 3:
                _b.sent();
                console.log("'".concat(value, "'  \uCD94\uAC00\uC644\uB8CC"));
                return [3 /*break*/, 6];
            case 4:
                err_2 = _b.sent();
                console.log('쿼리 실행 오류 : ', err_2);
                return [3 /*break*/, 6];
            case 5:
                client.release();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
// 데이터 저장
// app.post("/send", async (req, res) => {
//   const { content } = req.body;
//   try {
//     const mongoDoc = new MongoModel({ data: content });
//     const savedDoc = await mongoDoc.save();
//     console.log("MongoDB data saved:", savedDoc); // 로그 추가
//     const result = await pool.query(
//       "INSERT INTO realtest (content) VALUES ($1)",
//       [content]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("Error saving data:", err);
//     res.status(500).send("Error saving data");
//   }
// });
// app.post("/users", async (req, res) => {
//   const { content } = req.body;
//   console.log(req.body);
//   try {
//     const mongoDoc = new MongoModel({ data: content });
//     const savedDoc = await mongoDoc.save();
//     console.log("MongoDB data saved:", savedDoc); // 로그 추가
//     const result = await pool.query(
//       "INSERT INTO realtest (content) VALUES ($1)",
//       [content]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("Error saving data:", err);
//     res.status(500).send("Error saving data");
//   }
// });
// users 테이블 생성 (예시)
// app.get("/test_user", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM users");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("오류 발생:", err);
//     res.status(500).send("서버 오류");
//   }
// });
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
