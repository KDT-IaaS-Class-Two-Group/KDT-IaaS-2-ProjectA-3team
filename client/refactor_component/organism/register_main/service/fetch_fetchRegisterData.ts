import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { PendingUser } from "../interface/PendingData.interface";
import { POST_REGISTER_META } from "../config/POST_REGISTER";

/**
 * * Function : fetchRegisterData
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @description : 회원가입 요청 모듈
 */

const fetchRegisterData = async (userData: PendingUser): Promise<boolean> => {
  const response = await fetch(
    REQUEST_URL.__REGISTER,
    POST_REGISTER_META(userData)
  );
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export default fetchRegisterData;
