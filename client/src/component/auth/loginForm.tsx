import React from "react";

const loginForm = () => {
  return (
    <div className="login form">
      <h2>로그인</h2>
      <form id="login-form">
        <input type="email" placeholder="이메일" required />
        <input type="password" placeholder="비밀번호" required />
        <button type="submit">로그인</button>
      </form>
      <p>
        계정이 없으신가요? <a>회원가입</a>
      </p>
    </div>
  );
};

export default loginForm;
