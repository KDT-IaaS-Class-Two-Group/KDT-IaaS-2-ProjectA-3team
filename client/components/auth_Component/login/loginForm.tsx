import useLoginHooks from "./hook/loginHooks";
import * as styles from "../../../../client/styles/index.css";
/**
 * * Function : LoginForm
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @dalramjwi / 2024-08-07
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
    <div className={styles.login}>
      <h1 className={styles.signfont}>sign in</h1>
      <input
        type="text"
        className={styles.input}
        placeholder="id"
        onChange={(e) => {
          setId(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        className={styles.input}
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles.buttonLink}
        type="button"
        onClick={async () => {
          await handleLogin();
        }}
      >
        sigin in
      </button>
    </div>
  );
};

export default LoginForm;
