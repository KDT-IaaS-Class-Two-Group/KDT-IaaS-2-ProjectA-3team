import { RegisterDataDTO } from "../../../shared/DTO/SharedDTO";
/**
 * * Function : fetchRegisterData
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @function fetchRegisterData
 * @description : 회원가입 요청 모듈
 */
const fetchRegisterData = async (test: RegisterDataDTO) => {
  const response = await fetch("http://localhost:3001/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test),
  });
  if (response.ok) {
    console.log(response);
  }
};

export default fetchRegisterData;
