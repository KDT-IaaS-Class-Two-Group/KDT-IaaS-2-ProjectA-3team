import REQUEST_URL from "client/ts/enum/REQUEST_URL.ENUM";
import { AdminFetchBody } from "../utils/FetchBody_pendingUser";

export const approveHandler = async (
  index: number,
  item: { [key: string]: any }
) => {
  const response = await fetch(
    REQUEST_URL.__PENDING_APPROVE,
    AdminFetchBody(item)
  );
};