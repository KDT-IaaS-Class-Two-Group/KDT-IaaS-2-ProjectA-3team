import React from "react";
import useLoginHooks from "../../organism/login_main/hook/use.uselogin_hooks";
import Input from "../../atom/login_input/login_input"; // 컴포넌트 경로는 프로젝트 구조에 따라 조정하세요
import Button from "../../atom/button/button"; // 컴포넌트 경로는 프로젝트 구조에 따라 조정하세요
import * as styles from "../../../styles/info/index.css";

/**
 * @function LoginForm
 * @brief 사용자가 로그인할 수 있는 폼을 렌더링합니다.
 * @description 사용자가 ID와 비밀번호를 입력하여 로그인할 수 있는 폼을 제공합니다. "Enter" 키를 눌러 로그인하거나, "sign in" 버튼을 클릭하여 로그인 요청을 처리할 수 있습니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 *
 * @component
 *
 * @returns {JSX.Element} 로그인 폼 컴포넌트를 반환합니다.
 *
 * @example
 * // LoginForm 컴포넌트를 렌더링합니다.
 * <LoginForm />
 *
 * @note
 * 이 컴포넌트는 로그인 성공 후의 동작이나 상태 관리는 포함하지 않습니다. 해당 기능은 `useLoginHooks`에서 처리됩니다.
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
