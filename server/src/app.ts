import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";
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

app.use(cors());
app.use(express.json());
app.use(express.static(`${process.cwd()}/../client/dist`));

// 테이블 생성 함수
const createTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS userdb (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        phonenumber TEXT NOT NULL,
        address TEXT NOT NULL,
        birth DATE NOT NULL,
        start DATE NOT NULL,
        email TEXT NOT NULL
      );
    `;
    await client.query(queryText);
    console.log("Table 'userdb' is ready");
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
  const { id, name, password, phonenumber, address, birth, start, email } =
    req.body; // 입력값을 서버로부터 받음

  if (
    !id ||
    !name ||
    !password ||
    !phonenumber ||
    !address ||
    !birth ||
    !start ||
    !email
  ) {
    return res.status(400).send("All fields are required");
  }

  // // 날짜 형식 변환
  // const formattedBirth = new Date(birth).toISOString().split("T")[0];
  // const formattedStart = new Date(start).toISOString().split("T")[0];

  try {
    const client = await pool.connect();
    const queryText =
      "INSERT INTO userdb (id, name, password, phonenumber, address, birth, start, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const values = [
      id,
      name,
      password,
      phonenumber,
      address,
      birth, // 변환된 날짜 형식
      start, // 변환된 날짜 형식
      email,
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
    const result = await client.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'userdb'"
    );
    client.release();
    res.status(200).json(result.rows.map((row) => row.column_name));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});
//사용자 조회 API
app.get("/api/divMake", async (req, res) => {
  console.log(req.body);
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT name FROM userdb");
    client.release();
    res.status(200).json(result.rows.map((row) => row.name));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
