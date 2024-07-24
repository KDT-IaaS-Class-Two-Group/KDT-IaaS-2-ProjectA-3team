import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";
import bodyParser from "body-parser";
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

// 기존 유저 목록 가져오기
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

// 데이터 전송
app.post("/send", async (req, res) => {
  const { birth, password, name, phonenumber, address } = req.body;
  const value = [birth, password, name, phonenumber, address];

  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO test_user (birth, password, name, phonenumber, address) VALUES ($1, $2, $3, $4, $5)",
      value
    );
    console.log(`${value} 추가완료`);
    res.status(201).json({ message: "Data saved successfully" });
  } catch (err) {
    console.log("쿼리 실행 오류 : ", err);
    res.status(500).json({ message: "Error saving data" });
  } finally {
    client.release();
  }
});

// name 값 조회
app.get("/check-name/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const result = await pool.query(
      "SELECT id FROM test_user WHERE name = $1",
      [name]
    );

    if (result.rows.length > 0) {
      res.json({ exists: true, userId: result.rows[0].id });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error("쿼리 실행 오류 : ", err);
    res.status(500).json({ message: "Error checking name" });
  }
});

// test_orders에 데이터 삽입
app.post("/add-field", async (req, res) => {
  const { userId, field } = req.body;

  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO test_orders (user_id, field) VALUES ($1, $2)",
      [userId, field]
    );
    res.status(201).json({ message: "Field added successfully" });
  } catch (err) {
    console.log("쿼리 실행 오류 : ", err);
    res.status(500).json({ message: "Error adding field" });
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
