import Image from "next/image";
import LoginForm from "client/refactor_component/template/login_main/loginForm";
import * as styles from "../../styles/info/index.css";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backcontainer}>
        <div className={styles.login}>
          <Image src="/delan.png" alt="" title="delan_logo" />
          <h1 className={styles.heading}>DelaN</h1>
        </div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;
