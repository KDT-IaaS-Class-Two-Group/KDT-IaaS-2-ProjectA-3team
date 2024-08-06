import useLoginHooks from "./hook/loginHooks";
import { container, input, button } from "./style/login.css";

/**
 * * Function : LoginForm
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @function LoginForm
 * @description : 로그인 Form
 */
const LoginForm = () => {
  const { setId, setPassword, handleLogin, isLoggedIn } = useLoginHooks();

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await handleLogin();
    }
  };

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
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        className={input}
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={handleKeyDown}
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
