import REQUEST_URL from "client/ts/enum/REQUEST_URL.ENUM";
import { AdminFetchBody } from "../utils/fetch_body/Post_body_adminData";

export const cancleHandler = async (index: number, item: { [key: string]: any }) => {
  const response = await fetch(
    REQUEST_URL.__PENDING_CANCLE,
    AdminFetchBody(item)
  );
  return response;
};