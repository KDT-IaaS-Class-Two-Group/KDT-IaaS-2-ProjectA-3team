/**
 * @file TeamNameField.tsx
 * @brief 팀 이름 입력 필드 컴포넌트
 * @details 이 컴포넌트는 팀 이름을 입력받고, 입력된 값을 상위 컴포넌트에 전달하는 역할을 한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
import FormField from "client/refactor_component/molecule/form_field/form_field";
import React from "react";
import { TeamNameFieldProps } from "../interface/team.interface";

/**
 * @brief 팀 이름을 입력받는 필드 컴포넌트
 * @details FormField를 사용하여 팀 이름 입력을 처리하며, 입력된 값을 상위 컴포넌트로 전달한다.
 * @param {string} teamName 현재 입력된 팀 이름
 * @param {function} setTeamName 팀 이름을 업데이트하는 함수
 * @return 팀 이름 입력 필드 컴포넌트
 */
const TeamNameField: React.FC<TeamNameFieldProps> = ({
  teamName,
  setTeamName,
}) => {
  return (
    <FormField
      id="teamName"
      label="팀 이름:"
      value={teamName}
      input_type="text"
      placeholder="팀 이름을 입력해주세요"
      onChange={(e) => setTeamName(e.target.value)}
    />
  );
};

export default TeamNameField;
