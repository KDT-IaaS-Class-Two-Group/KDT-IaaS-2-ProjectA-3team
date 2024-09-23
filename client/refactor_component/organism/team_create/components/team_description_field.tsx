import React from "react";
import TextArea from "client/refactor_component/atom/text_area/text_area";
import { TeamDescriptionFieldProps } from "../props/team.interface";

/**
 * @brief 팀 설명을 입력받는 필드 컴포넌트
 * @details TextArea 컴포넌트를 사용하여 팀 설명 입력을 처리하며, 입력된 값을 상위 컴포넌트로 전달합니다.
 * @param {string} teamDescription 현재 입력된 팀 설명
 * @param {function} setTeamDescription 팀 설명을 업데이트하는 함수
 * @return 팀 설명 입력 필드 컴포넌트
 */
const TeamDescriptionField: React.FC<TeamDescriptionFieldProps> = ({
  teamDescription,
  setTeamDescription,
}) => {
  return (
    <div>
      <label htmlFor="teamDescription">팀 특징:</label>
      {/* TextArea에서 value와 onChange를 사용하여 직접 상태 관리 */}
      <TextArea
        value={teamDescription}
        onChange={(e) => setTeamDescription(e.target.value)}
        className=""
        id="teamDescription"
        name="teamDescription"
      />
    </div>
  );
};

export default TeamDescriptionField;
