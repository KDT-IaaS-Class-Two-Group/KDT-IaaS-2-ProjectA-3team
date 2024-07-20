import express from "express";
import * as dotenv from "dotenv";
import path from "path";
const cors = require("cors");
import { Pool } from "pg";

dotenv.config({ path: `${__dirname}/../../.env` });

const port = process.env.PORT || 3000;
const app = express();

// PostgreSQL 연결 설정
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: process.env.DB_PASS,
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.static(`${process.cwd()}/../client/dist`));

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
  const { input } = req.body;
  console.log(input);
  console.log("ASd");
  console.log(req.body);
  if (!input) {
    return res.status(400).send("Input data is required");
  }

  try {
    const client = await pool.connect();
    const queryText = "INSERT INTO test (input_data) VALUES ($1)";
    const values = [input];

    await client.query(queryText, values);
    client.release();

    res.status(200).send("Data inserted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting data");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
