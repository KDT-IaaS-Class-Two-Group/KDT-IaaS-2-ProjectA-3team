import { PendingUser } from 'client/ts/Interface/PendingData.interface'

/**
 * * Function : fetchRegisterData
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @description : 회원가입 요청 모듈
 */
const fetchRegisterData = async (userData: PendingUser): Promise<boolean> => {
  const response = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    console.log('회원가입 성공', await response.json());
    return true;
  } else {
    console.error('회원가입 실패', await response.text());
    return false;
  }
};

export default fetchRegisterData;
