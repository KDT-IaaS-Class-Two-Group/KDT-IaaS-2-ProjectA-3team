import { ResponseJson } from 'client/ts/Interface/LoginResponse.interface'
import { LoginData } from "client/ts/Interface/LoginData.interface";
import REQUEST_URL from 'client/ts/enum/request/REQUEST_URL.ENUM';

/**
 * * Function : fetchLogin
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-08
 * Issue :
 * @function fetchLogin
 * @description : 로그인 요청 모듈
 */

const fetchLogin = async (loginData: LoginData): Promise<string | false> => {
  const response = await fetch(REQUEST_URL.__LOGIN, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(loginData),
  });

  if (response.status === 200) {
    const data: ResponseJson = await response.json();
    return data.redirect;
  } else {
    return false;
  }
};

export default fetchLogin;
