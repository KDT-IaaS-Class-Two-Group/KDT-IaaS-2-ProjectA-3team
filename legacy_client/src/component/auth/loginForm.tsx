import React from "react";
import loginViewModel from "../../viewmodel/loginViewModel";

const loginForm = () => {
  const { id, password, isLoggedIn, setId, setPassword, handleLogin } =
    loginViewModel();

  return (
    <div className="login form">
      <h2>로그인</h2>
      <form id="login-form">
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => {
            setId(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button
          type="button"
          onClick={async () => {
            const test = await handleLogin();
            if (!test) {
              alert("야야");
            } else {
              alert("ok");
            }
          }}
        >
          로그인
        </button>
      </form>
      <p>
        계정이 없으신가요? <a>회원가입</a>
      </p>
    </div>
  );
};

export default loginForm;
