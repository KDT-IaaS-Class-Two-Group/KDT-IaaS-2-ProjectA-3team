import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",
  host: 'localhost',
  database: 'shindatabase',
  password: '1234',
  port: 5432,
});

dotenv.config({ path: `${__dirname}/../../.env` });

const port = process.env.PORT;
const app = express();

app.use(express.json())//!w 집에서 확인

app.use(express.static(path.join(__dirname, '../../client/dist')));

// /send 경로에 대한 POST 요청 처리
app.post('/send', async (req, res) => {
  const { content } = req.body;
  res.json({ content });
  const client = await pool.connect(); // 연결을 기다림
  try {
    await client.query('INSERT INTO realtest(content) VALUES($1)', [content]);
    console.log(`'${content}' 추가 완료`);
  } catch (err) {
    console.error('쿼리 실행 오류:', err);
  } finally {
    client.release(); // 연결 종료
  }

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
