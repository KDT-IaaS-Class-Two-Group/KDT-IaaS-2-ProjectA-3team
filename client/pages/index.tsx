import Link from "next/link";
import Image from "next/image";

import * as styles from "../styles/info/index.css";
const MainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.backcontainer}>
          <div className={styles.login}>
            <Image
              src="/delan.png"
              alt=""
              width={50}
              height={50}
              title="delan_logo"
            />
            <h1 className={styles.heading}>DelaN</h1>
          </div>
          <div className={styles.buttoncontainer}>
            <Link href="/sign/login">
              <button className={styles.buttonLink}>Sign in</button>
            </Link>
            <Link href="/sign/register">
              <button className={styles.buttonLink}>Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
