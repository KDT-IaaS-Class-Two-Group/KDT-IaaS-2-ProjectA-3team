import REQUEST_URL from "client/ts/enum/REQUEST_URL.ENUM";
import { AdminFetchBody } from "../../utils/fetch_body/post/Post_body_adminData";

export const cancelHandler = async (index: number, item: { [key: string]: any }) => {
  const response = await fetch(
    REQUEST_URL.__PENDING_CANCEL,
    AdminFetchBody(item)
  );
  return response;
};