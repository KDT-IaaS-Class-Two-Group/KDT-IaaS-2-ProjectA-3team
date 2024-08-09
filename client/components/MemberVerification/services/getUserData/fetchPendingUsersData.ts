import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { PedingUserFetchBody } from "../../utils/fetch_body/get/Get_body_pendingUsers";

/**
 * * Function : getPendingUsers
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-06
 * Issue :
 * @description : 대기중인 회원들을 [{}] 형태로 가져올 수 있는 Fetch 함수.
 */
const getPendingUsers = async (): Promise<[{ [key: string]: any }]> => {
  const response = await fetch(
    REQUEST_URL.__GET_PENDING_USERS,
    PedingUserFetchBody()
  );
  const resJson = await response.json();
  return resJson;
};

export default getPendingUsers;
