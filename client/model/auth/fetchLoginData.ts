import { LoginDTO } from "../../../shared/DTO/SharedDTO";
/**
 * * Function : fetchLogin
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @function fetchLogin
 * @description : 로그인 요청 모듈
 */
const fetchLogin = async (test: LoginDTO) => {
  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(test),
  });
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

export default fetchLogin;
