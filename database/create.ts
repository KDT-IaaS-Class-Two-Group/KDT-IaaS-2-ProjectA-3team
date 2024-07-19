import { Pool } from 'pg';

const pool = new Pool({
  user : "postgres",
  host : 'localhost',
  database : 'postgres',
  password : '1234',
  port : 5432,
});

(async () => {
  try {
    // 테이블 생성 쿼리 실행
    await pool.query('CREATE TABLE IF NOT EXISTS realTest (content VARCHAR(50) NOT NULL)');
    console.log('테이블 생성 완료.');
  } catch (err) {
    console.error('오류 발생:', err);
  } finally {
    // 연결 해제
    await pool.end();
  }
})();