/**
 * @file team.tsx
 * @brief 팀 생성 컴포넌트 파일
 * @details 이 파일에는 팀 생성 폼과 관련된 모든 UI 컴포넌트와 상태 관리 로직이 포함되어 있다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
import React from "react";
import {
  pageinput,
  pagemaincontainer,
  pagemainmain,
  pagemaintext,
  pageteamtext,
  pagetextarea,
  pagetextsub,
  pageul,
  teambuttoncontainer,
} from "client/styles/team/teampage.css";
import TeamNameField from "./components/TeamNameField";
import TeamLeaderSelect from "./components/TeamLeaderSelect";
import MemberSelect from "./components/TeamMemberSelect";
import TeamDescriptionField from "./components/TeamDescriptionField";
import TeamButton from "./components/TeamButton";
import useTeamFetch from "./hook/useTeamFetch";
import useTeamState from "./hook/useTeamState";
import submitHanlde from "./utils/team_submit_handle";
/**
 * @brief 팀 생성 폼 UI 컴포넌트
 * @details 팀 이름, 팀장, 팀원, 팀 설명 등을 입력받고 폼을 제출하는 UI를 제공.
 * @return 팀 생성 폼 UI 컴포넌트
 */
function UserSelection() {
  const { leaders, members } = useTeamFetch();
  const {
    teamName,
    setTeamName,
    selectedLeader,
    selectedMembers,
    teamDescription,
    setTeamDescription,
    addLeader,
    removeLeader,
    addMember,
    removeMember,
    resetForm,
  } = useTeamState();

  /**
   * @brief 폼 제출 처리 함수
   * @details submithandle 함수를 호출하여 폼 제출 시 필요한 검증과 서버 요청을 처리한다.
   * @param {React.FormEvent} e 폼 제출 이벤트 객체
   */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitHanlde({
      teamName,
      selectedLeader,
      selectedMembers,
      teamDescription,
      resetForm,
    });
  };

  return (
    <div className={pagemainmain}>
      <div className={pagemaincontainer}>
        <div className={pagemaintext}>팀 제작</div>
        <TeamNameField teamName={teamName} setTeamName={setTeamName} />
        <TeamLeaderSelect
          leaders={leaders}
          selectedLeader={selectedLeader}
          addLeader={addLeader}
          removeLeader={removeLeader}
        />
        <MemberSelect
          members={members}
          selectedMembers={selectedMembers}
          addMember={addMember}
          removeMember={removeMember}
        />
        <TeamDescriptionField
          teamDescription={teamDescription}
          setTeamDescription={setTeamDescription}
        />
        <div className={teambuttoncontainer}>
          <TeamButton handleSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

export default UserSelection;
