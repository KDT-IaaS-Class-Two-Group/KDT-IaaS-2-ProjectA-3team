/**
 * @file TeamLeaderSelect.tsx
 * @brief 팀장 선택 컴포넌트
 * @details 이 컴포넌트는 사용자가 팀장을 선택하고 제거할 수 있는 UI를 제공한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
import React from "react";
import { LeaderSelectProps, User } from "../props/team.interface";
import Button from "client/refactor_component/atom/button/button";
import Ul from "client/atoms/ul";
import {
  pageteamtext,
  pagetextsub,
  pageul,
} from "../../../../styles/team/teampage.css";
import { yellowButton } from "client/styles/templatebutton.css";
import Li from "client/refactor_component/atom/li/li";

/**
 * @brief 팀장 선택 UI 컴포넌트
 * @details 사용자가 팀장 목록에서 특정 팀장을 선택하고 제거할 수 있는 UI를 제공한다.
 * @param {User[]} leaders 팀장 후보 목록
 * @param {User | null} selectedLeader 선택된 팀장
 * @param {function} addLeader 팀장을 선택하는 함수
 * @param {function} removeLeader 선택된 팀장을 제거하는 함수
 * @return 팀장 선택 컴포넌트
 */
const TeamLeaderSelect: React.FC<LeaderSelectProps> = ({
  leaders,
  selectedLeader,
  addLeader,
  removeLeader,
}) => {
  return (
    <div className={pageteamtext}>
      <p>팀장: {selectedLeader ? selectedLeader.user_id : "없음"}</p>
      <Ul ul_style={pageul}>
        {leaders.map((user) => (
          <Li key={user.user_id} li_style={pagetextsub}>
            <strong>ID :</strong> {user.user_id}
            <Button
              button_text="추가"
              button_style={yellowButton}
              onClick={() => addLeader(user)}
            />
            {selectedLeader && selectedLeader.user_id === user.user_id && (
              <Button
                button_text="삭제"
                button_style={yellowButton}
                onClick={removeLeader}
              />
            )}
          </Li>
        ))}
      </Ul>
    </div>
  );
};

export default TeamLeaderSelect;
