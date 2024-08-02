import { PendingUserDTO } from '../../../shared/DTO/SharedDTO';

/**
 * * Function : fetchRegisterData
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @description : 회원가입 요청 모듈
 */
const fetchRegisterData = async (userData: PendingUserDTO) => {
  const response = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    console.log('Registration successful:', await response.json());
  } else {
    console.error('Registration failed:', await response.text());
  }
};

export default fetchRegisterData;
