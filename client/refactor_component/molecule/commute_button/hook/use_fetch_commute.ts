/**
 * @file use_fetch_commute.ts
 * @brief 출퇴근 처리 훅
 * @details 이 훅은 출근 및 퇴근 요청을 서버에 보내고, 요청의 성공 및 실패 여부에 따라 상태를 업데이트한다.
 *          훅은 상태 메시지와 출퇴근 처리 함수를 반환하여, 컴포넌트에서 출퇴근 처리를 쉽게 수행할 수 있도록 한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import { useState } from "react";
import postFetchData from "client/service/postFetch";

/**
 * @brief 출퇴근 처리 훅
 * @details 출근 및 퇴근 버튼 클릭 시 호출되어 서버에 요청을 보내고, 요청의 결과에 따라 상태를 업데이트한다.
 * @param {string} userId 사용자 ID
 * @return {[string, Function]} 상태 메시지와 출근/퇴근 처리 함수
 */
const useFetchCommute = (userId: string) => {
  const [status, setStatus] = useState<string>("");

  /**
   * @brief 출퇴근 처리 함수
   * @details 출근 또는 퇴근 버튼 클릭 시 호출되어 서버에 요청을 보내고, 요청의 결과에 따라 상태를 업데이트한다.
   * @param {("clockin" | "clockout")} action 처리할 작업 (출근 또는 퇴근)
   * @param {string} successMessage 작업이 성공했을 때 표시할 메시지
   * @param {string} failureMessage 작업이 실패했을 때 표시할 메시지
   */
  const handleClockAction = async (
    action: "clockin" | "clockout",
    successMessage: string,
    failureMessage: string
  ) => {
    try {
      const response = await postFetchData(
        `http://localhost:3001/getUser/${action}`, // 요청 URL
        JSON.stringify({ user_id: userId }) // 요청 본문
      );

      if (response.ok) {
        const result = await response.json();
        console.log(`${action} :`, result); // 성공 시 결과를 콘솔에 출력
        setStatus(successMessage); // 상태 메시지를 성공 메시지로 업데이트
      } else {
        console.error(`${action} :`, response.statusText); // 실패 시 에러 메시지 콘솔에 출력
        setStatus(failureMessage); // 상태 메시지를 실패 메시지로 업데이트
      }
    } catch (error) {
      console.error(`${action} :`, error); // 예외 발생 시 에러 메시지 콘솔에 출력
      setStatus(failureMessage); // 상태 메시지를 실패 메시지로 업데이트
    }
  };

  return [status, handleClockAction] as const;
};

export default useFetchCommute;
