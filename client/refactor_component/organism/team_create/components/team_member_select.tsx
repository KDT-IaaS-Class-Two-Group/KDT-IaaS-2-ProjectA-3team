/**
 * @file TeamMemberSelect.tsx
 * @brief 팀원 선택 컴포넌트
 * @details 이 컴포넌트는 사용자가 팀원을 선택하고 제거할 수 있는 UI를 제공합니다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
import React from "react";
import { User } from "../props/team.interface";
import Button from "client/refactor_component/atom/button/button";
import Ul from "client/refactor_component/atom/ul/ul";
import Li from "client/refactor_component/atom/li/li";
import { yellowButton } from "client/styles/templatebutton.css";
import { pagetextsub, pageul } from "client/styles/team/teampage.css";

interface MemberSelectionProps {
  members: User[];
  selectedMembers: User[];
  addMember: (user: User) => void;
  removeMember: (user: User) => void;
}

/**
 * @brief 팀원 선택 UI 컴포넌트
 * @details 사용자가 팀원 목록에서 특정 팀원을 선택하고 제거할 수 있는 UI를 제공합니다.
 * @param {User[]} members 팀원 후보 목록
 * @param {User[]} selectedMembers 선택된 팀원 목록
 * @param {function} addMember 팀원을 선택하는 함수
 * @param {function} removeMember 선택된 팀원을 제거하는 함수
 * @return 팀원 선택 컴포넌트
 */
const MemberSelect: React.FC<MemberSelectionProps> = ({
  members,
  selectedMembers,
  addMember,
  removeMember,
}) => {
  return (
    <div>
      <p>
        팀원:
        {selectedMembers.map((member) => member.user_id).join(", ") || "없음"}
      </p>
      <Ul ul_style={pageul}>
        {Array.isArray(members) && members.length > 0 ? (
          members.map((user) => (
            <Li key={user.user_id} li_style={pagetextsub}>
              <strong>ID :</strong> {user.user_id}
              <Button
                button_text="추가"
                button_style={yellowButton}
                onClick={() => addMember(user)}
              />
              {selectedMembers.some(
                (member) => member.user_id === user.user_id
              ) && (
                <Button
                  button_text="삭제"
                  button_style={yellowButton}
                  onClick={() => removeMember(user)}
                />
              )}
            </Li>
          ))
        ) : (
          <p>팀원 목록이 비어있습니다.</p>
        )}
      </Ul>
    </div>
  );
};


export default MemberSelect;
