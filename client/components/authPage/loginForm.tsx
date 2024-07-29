import useLoginHooks from "client/hooks/loginHooks";

import { container, input, button } from "../../styles/login.css";
const LoginForm = () => {
  const { setEmail, setPassword, handleLogin } = useLoginHooks();
  return (
    <div className={container}>
      <h1>Login</h1>
      <input
        type="email"
        className={input}
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
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
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
};
export default LoginForm;
