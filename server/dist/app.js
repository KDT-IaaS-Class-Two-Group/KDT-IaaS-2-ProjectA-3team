"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.static("".concat(process.cwd(), "/../client/dist")));
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + "/../client/dist/index.html");
});
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
