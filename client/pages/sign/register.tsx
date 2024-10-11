import Image from "next/image";
import RegisterForm from "client/refactor_component/template/register_main/register_form";
import * as styles from "../../styles/info/index.css";

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backcontainerClone}>
        <div className={styles.login}>
          <Image src="/delan.png" alt="" />
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
