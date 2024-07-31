import useLoginHooks from "client/hooks/loginHooks";

import { container, input, button } from "../../styles/login.css";

/**
 * * Function : LoginForm
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @function LoginForm
 * @description : 로그인 Form
 */
const LoginForm = () => {
  const { setId, setPassword, handleLogin } = useLoginHooks();
  return (
    <div className={container}>
      <h1>Login</h1>
      <input
        type="text"
        className={input}
        placeholder="id"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <input
        type="password"
        className={input}
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className={button}
        type="button"
        onClick={async () => {
          await handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
};
export default LoginForm;
