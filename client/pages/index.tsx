import Link from 'next/link';

import * as styles from '../styles/index.css';

const MainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>DelaN</h1>
      <Link href="/login">
        <button className={styles.buttonLink}>로그인</button>
      </Link>
      <Link href="/register">
        <button className={styles.buttonLink}>회원가입</button>
      </Link>
      <div className={styles.content}>
        <h2>TEST INDEX PAGE</h2>
        <p>야호</p>
      </div>
    </div>
  );
};

export default MainPage;
