import React from "react";

const registerForm = () => {
  return (
    <div className="register form">
      <h2>회원가입</h2>
      <form id="signup-form">
        <input type="text" placeholder="이름" required />
        <input type="email" placeholder="이메일" required />
        <input type="password" placeholder="비밀번호" required />
        <input type="password" placeholder="비밀번호 확인" required />
        <input type="text" placeholder="프로젝트 코드" />
        <button type="submit">가입하기</button>
      </form>
      <p>
        이미 계정이 있으신가요? <a>로그인</a>
      </p>
    </div>
  );
};

export default registerForm;
