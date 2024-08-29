/**
 * @file commute_button.tsx
 * @brief 출퇴근 버튼 컴포넌트
 * @details 출근 및 퇴근 버튼을 제공하며, 버튼 클릭 시 서버에 출근/퇴근 요청을 보낸다.
 *          요청의 성공 및 실패 여부에 따라 상태 메시지를 업데이트하여 사용자에게 처리 결과를 보여준다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import React from "react";
import { CommuteButtonProps } from "./props/commute_button.props";
import Button from "client/refactor_component/atom/button/button";
import useFetchCommute from "./hook/use_fetch_commute";

/**
 * @brief 출퇴근 버튼 컴포넌트
 * @details 출근 및 퇴근 버튼을 제공하며, 버튼 클릭 시 서버에 출근/퇴근 요청을 보낸다.
 *          요청의 성공 및 실패 여부에 따라 상태 메시지를 업데이트하여 사용자에게 처리 결과를 보여준다.
 * @param {CommuteButtonProps} props 사용자 ID를 포함하는 속성
 * @return 출근 및 퇴근 버튼과 상태 메시지를 포함한 컴포넌트
 */
const CommuteButton: React.FC<CommuteButtonProps> = ({ user_id }) => {
  // useFetchCommute 훅을 사용하여 상태와 처리 함수를 가져온다.
  const [status, handleClockAction] = useFetchCommute(user_id);

  return (
    <div>
      <div>
        {/* 출근 버튼 */}
        <Button
          onClick={() =>
            handleClockAction(
              "clockin",
              "출근 처리되었습니다.",
              "출근 처리에 실패했습니다."
            )
          }
          button_text="출근"
          button_style="" // 스타일 클래스 이름
        />
        {/* 퇴근 버튼 */}
        <Button
          onClick={() =>
            handleClockAction(
              "clockout",
              "퇴근 처리되었습니다.",
              "퇴근 처리에 실패했습니다."
            )
          }
          button_text="퇴근"
          button_style="" // 스타일 클래스 이름
        />
      </div>
      {/* 상태 메시지 */}
      {status && <p>{status}</p>}
    </div>
  );
};

export default CommuteButton;
