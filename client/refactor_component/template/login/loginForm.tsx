import React from "react";
import useLoginHooks from "../../organism/login/hook/loginHooks";
import Input from "../../atom/login_input/login_input"; // 컴포넌트 경로는 프로젝트 구조에 따라 조정하세요
import Button from "../../atom/button/button"; // 컴포넌트 경로는 프로젝트 구조에 따라 조정하세요
import * as styles from "../../../styles/info/index.css";

/**
 * * Function : LoginForm
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @dalramjwi / 2024-08-07
 * Issue :
 * @function LoginForm
 * @description : 로그인 Form
 */
const LoginForm: React.FC = () => {
  const { setId, setPassword, handleLogin, isLoggedIn } = useLoginHooks();

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await handleLogin();
    }
  };

  return (
    <div className={styles.loginsub}>
      <h1 className={styles.signfont}>sign in</h1>
      <div>
        <p className={styles.idpwfont}>id</p>
        <Input
          id="id"
          type="text"
          placeholder="id"
          onChange={(e) => setId(e.target.value)}
          onKeyDown={handleKeyDown}
          value={""}
          className={styles.input}
        />
      </div>
      <div>
        <p className={styles.idpwfont}>password</p>
        <Input
          id="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          value={""}
          className={styles.input}
        />
      </div>
      <Button
        button_text="sign in"
        button_style={styles.buttonLink}
        onClick={async () => {
          await handleLogin();
        }}
      />
    </div>
  );
};

export default LoginForm;
