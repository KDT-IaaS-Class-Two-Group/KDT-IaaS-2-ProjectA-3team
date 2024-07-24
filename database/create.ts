import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

(async () => {
  try {
    // test_user 테이블 생성 쿼리 실행
    await pool.query(`
      CREATE TABLE IF NOT EXISTS test_user (
        id SERIAL PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        phoneNumber VARCHAR(15),
        address VARCHAR(255),
        birth DATE
      );
    `);

    console.log('test_user 테이블 생성 완료.');

    // test_orders 테이블 생성 쿼리 실행
    await pool.query(`
      CREATE TABLE IF NOT EXISTS test_orders
      ( user_id INT REFERENCES test_user(id),
        field INTEGER
      );
    `);

    console.log('test_orders 테이블 생성 완료.');
  } catch (err) {
    console.error('오류 발생:', err);
  } finally {
    // 연결 해제
    await pool.end();
  }
})();
