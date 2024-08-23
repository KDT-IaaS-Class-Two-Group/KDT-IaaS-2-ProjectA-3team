/**
 * @file TeamButton.tsx
 * @brief 팀 생성 버튼 컴포넌트
 * @details 이 컴포넌트는 사용자가 팀 생성 폼을 제출할 때 사용하는 버튼을 제공합니다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
import React from "react";
import Button from "client/refactor_component/atom/button/button";
import * as styles from "../../../styles/team/team.css";
import { TeamButtonProps } from "../interface/team.interface";
/**
 * @brief 팀 생성 버튼 컴포넌트
 * @details 팀 생성 폼을 제출하는 버튼을 제공하며, 사용자가 클릭할 때 `handleSubmit` 함수가 호출됩니다.
 * @param {function} handleSubmit 폼 제출 시 호출되는 함수
 * @return 제출 버튼 컴포넌트
 */
const TeamButton: React.FC<TeamButtonProps> = ({ handleSubmit }) => {
  return (
    <Button
      button_text="팀 생성"
      button_style={styles.blueButton}
      onClick={handleSubmit}
    />
  );
};

export default TeamButton;
