import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

// Middleware 설정
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'test_user' AND column_name NOT IN ('id')"
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("유저 목록 가져오기 오류:", err);
    res.status(500).send("서버 오류");
  }
});

app.post("/send", async (req, res) => {
  const { birth, password, name, phonenumber, address } = req.body;
  const value = [birth, password, name, phonenumber, address];

  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO test_user (birth, password, name, phonenumber,address) VALUES ($1,$2,$3,$4,$5)",
      value
    );
    console.log(`'${value}'  추가완료`);
  } catch (err) {
    console.log("쿼리 실행 오류 : ", err);
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
