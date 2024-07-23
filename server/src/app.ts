import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { Pool } from "pg";
import { MongoClient } from "mongodb";
dotenv.config({ path: `${__dirname}/../../.env` });

const port = process.env.PORT || 3000;
const app = express();

// PostgreSQL 연결 설정
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user_db",
  password: process.env.DB_PASS,
  port: 5432,
});
// //Mongo DB 연결 설정
// const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost:27017";
// const mongoClient = new MongoClient(mongoUrl);
app.use(cors());
app.use(express.json());
app.use(express.static(`${process.cwd()}/../client/dist`));
//Mongo DB 연결

// mongoClient
//   .connect()
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));

// 테이블 생성 함수
const createTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS test (
        id SERIAL PRIMARY KEY,
        input_data TEXT NOT NULL
      );
    `;
    await client.query(queryText);
    console.log("Table 'test' is ready");
  } catch (error) {
    console.error("Error creating table", error);
  } finally {
    client.release();
  }
};

// 서버 시작 시 테이블 생성
createTable();

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/../client/dist/index.html");
});

app.post("/useDataServeEvent", async (req, res) => {
  console.log("Request body:", req.body); // 요청 본문 로그 출력
  const { input } = req.body; // 입력값을 서버로부터 받음

  if (!input) {
    return res.status(400).send("Input data is required");
  }

  try {
    const client = await pool.connect();
    const queryText =
      "INSERT INTO userdb (id,password,name,phonenumber,address,birth,start,email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const values = [
      1,
      "John Doe",
      "1234567890",
      "123 Main St",
      "2000-01-01", // 날짜 형식
      "2024-07-23", // 날짜 형식
      "johndoe@example.com",
    ];
    await client.query(queryText, values);
    client.release();
    res.status(200).send("Data inserted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting data");
  }
});

// 데이터 조회 API
app.get("/api/inputMake", async (req, res) => {
  console.log(req.body);
  try {
    const client = await pool.connect();
    //user_db의 userdb columns 조회
    const result = await client.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'userdb'"
    );
    // console.log(result);
    client.release();
    res.status(200).json(result.rows.map((row) => row.column_name));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
