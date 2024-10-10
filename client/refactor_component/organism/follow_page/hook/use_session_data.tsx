/**
 * @file use_session_data.ts
 * @brief 사용자 세션 데이터를 가져오는 커스텀 훅
 * @details 로그인된 사용자의 세션 데이터를 서버로부터 가져와 상태로 관리합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 */

import { useState, useEffect } from "react";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

/**
 * @brief 사용자 세션 데이터를 가져오는 커스텀 훅
 * @details 이 훅은 서버에서 사용자 세션 정보를 가져와 상태로 관리합니다. 세션 정보는 컴포넌트에서 쉽게 접근할 수 있도록 반환됩니다.
 *
 * @return { { user_id: string } | null } 현재 사용자 세션 데이터 또는 null을 반환합니다.
 */
export const useSessionData = () => {
  const [sessionData, setSessionData] = useState<{ user_id: string } | null>(
    null
  );

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setSessionData(data.session);
          console.log("Session data fetched:", data.session);
        } else {
          console.error("Failed to fetch session data", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch session data", error);
      }
    };

    fetchSessionData();
  }, []);

  return sessionData;
};
