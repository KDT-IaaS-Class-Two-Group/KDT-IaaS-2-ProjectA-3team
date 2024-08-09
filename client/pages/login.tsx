import LoginForm from "../components/auth_Component/login/loginForm";
import * as styles from "../styles/info/index.css";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backcontainer}>
        <div className={styles.login}>
          <img src="/delan.png" title="delan_logo"/>
          <h1 className={styles.heading}>DelaN</h1>
        </div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;
