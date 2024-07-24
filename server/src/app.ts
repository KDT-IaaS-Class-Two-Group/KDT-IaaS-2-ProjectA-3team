import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'; // CORS 패키지 임포트
import { Pool } from 'pg';

dotenv.config({ path: `${__dirname}/../../.env` });

const pool = new Pool({
  user: "postgres",
  host: 'localhost',
  database: 'shindatabase',
  password: '1234',
  port: 5432,
});

const port = process.env.PORT || 3001; // 기본 포트 설정 추가
const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); // CORS 설정
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM user_test');
    console.log(result.rows); // 데이터 확인을 위해 로그 출력
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
