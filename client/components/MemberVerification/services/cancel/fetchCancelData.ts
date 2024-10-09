import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { AdminFetchBody } from "../../utils/fetch_body/post/Post_body_adminData";
import { UseItem } from "../../interface/UserItem.props.interface";
// cancelHandler 함수에서 item 타입을 UserItem으로 변경
export const cancelHandler = async (
  index: number,
  item: UseItem // 구체적인 타입으로 변경
) => {
  const response = await fetch(
    REQUEST_URL.__PENDING_CANCEL,
    AdminFetchBody(item)
  );
  return response;
};