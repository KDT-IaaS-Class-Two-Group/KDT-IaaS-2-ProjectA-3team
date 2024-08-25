/**
 * @file TeamDescriptionField.tsx
 * @brief 팀 설명 입력 필드 컴포넌트
 * @details 이 컴포넌트는 팀 설명을 입력받고, 입력된 값을 상위 컴포넌트에 전달하는 역할을 한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
import TextArea from "client/refactor_component/atom/text_area/text_area";
import React from "react";
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
      <TextArea className="">{teamDescription}</TextArea>
    </div>
  );
};

export default TeamDescriptionField;
