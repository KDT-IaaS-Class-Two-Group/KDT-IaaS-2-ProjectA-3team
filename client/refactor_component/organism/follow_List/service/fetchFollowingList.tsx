// src/service/fetchFollowingList.ts
import { User } from "../interface/usertype";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

export const fetchFollowingList = async (): Promise<User[]> => {
  const response = await fetch(`http://localhost:3001${REQUEST_URL.FOLLOWING_LIST}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 세션 기반 인증을 위한 쿠키 포함
  });

  if (!response.ok) {
    throw new Error("Failed to fetch following list");
  }

  return await response.json();
};
