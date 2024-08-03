import { LoginDTO, ResponseJson } from "../../../../shared/DTO/SharedDTO";
/**
 * * Function : fetchLogin
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @function fetchLogin
 * @description : 로그인 요청 모듈
 */

const fetchLogin = async (loginData: LoginDTO): Promise<string | false> => {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginData),
    });

    if (response.ok) { // response.status === 200
      const data: ResponseJson = await response.json();

      if (data.redirect) {
        return data.redirect;
      } else {
        console.error('Redirect path not found in response:', data);
        return false;
      }
    } else {
      const errorData = await response.json();
      console.error('Login failed with status:', response.status, 'Error:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Fetch request failed:', error);
    return false;
  }
};

export default fetchLogin;
