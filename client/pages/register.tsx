import RegisterForm from "../components/auth_Component/register/registerForm";
import * as styles from "../styles/index.css";
const RegisterPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backcontainer}>
        <div className={styles.login}>
          <img src="/delan.png" />
          <h1 className={styles.heading}>DelaN</h1>
        </div>
        <p className={styles.signfont}>sign up</p>
        <div>
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
