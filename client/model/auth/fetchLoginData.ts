<<<<<<< HEAD
import { LoginDTO } from '../../../shared/DTO/SharedDTO';
=======
import { LoginDTO, ResponseJson } from "../../../shared/DTO/SharedDTO";
>>>>>>> naviadev/issue50
/**
 * * Function : fetchLogin
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @function fetchLogin
 * @description : 로그인 요청 모듈
 */
<<<<<<< HEAD
const fetchLogin = async (loginData: LoginDTO) => {
  const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
=======

const fetchLogin = async (loginData: LoginDTO): Promise<string | false> => {
  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
>>>>>>> naviadev/issue50
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
