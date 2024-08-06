import Link from "next/link";

import * as styles from "../styles/index.css";

const MainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>DelaN</h1>
      <Link href="/login" passHref>
        <button className={styles.buttonLink}>로그인</button>
      </Link>
      <Link href="/register" passHref>
        <button className={styles.buttonLink}>회원가입</button>
      </Link>
      <div className={styles.content}>
        <h2>임시</h2>
        <p>안녕ㅎ</p>
      </div>
    </div>
  );
};

export default MainPage;
