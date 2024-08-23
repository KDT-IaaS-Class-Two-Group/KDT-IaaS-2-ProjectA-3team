/**
 * @file team.tsx
 * @brief 팀 생성 컴포넌트 파일
 * @details 이 파일에는 팀 생성 폼과 관련된 모든 UI 컴포넌트와 상태 관리 로직이 포함되어 있다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
import React, { useState, useEffect } from "react";
import * as styles from "../../styles/team/team.css";
import * as button from "../../styles/templatebutton.css";
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
import fetchCheckTeamNameExists from "./service/checkTeamNameExist/fetchCheckTeamNameExists";
import fetchSaveTeamData from "./service/saveTeamData/fetchSaveTeamData";
import TeamNameField from "./components/TeamNameField";
import TeamLeaderSelect from "./components/TeamLeaderSelect";
import MemberSelect from "./components/TeamMemberSelect";
import TeamDescriptionField from "./components/TeamDescriptionField";
import TeamButton from "./components/TeamButton";
import useTeamFetch from "./hook/useTeamFetch";
import useTeamState from "./hook/useTeamState";

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
   * @details 폼 제출 시 팀 이름, 팀장, 팀원이 모두 유효한지 확인하고, 서버로 팀 데이터를 저장하는 요청을 보낸다.
   * @param {React.FormEvent} e 폼 제출 객체
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName) {
      alert("팀 이름을 입력해 주세요.");
      return;
    }

    const nameExists = await fetchCheckTeamNameExists(teamName);
    if (nameExists) {
      alert("이미 존재하는 팀 이름입니다. 다른 팀 이름을 입력해 주세요.");
      return;
    }

    if (!selectedLeader) {
      alert("팀장을 선택해 주세요.");
      return;
    }
    if (selectedMembers.length === 0) {
      alert("팀원을 선택해 주세요.");
      return;
    }

    const teamData = {
      team_name: teamName,
      description: teamDescription,
      teamLeader: selectedLeader ? { user_id: selectedLeader.user_id } : null,
      teamMembers: selectedMembers.map((member) => ({
        user_id: member.user_id,
      })),
    };

    try {
      const result = await fetchSaveTeamData(teamData);

      if (result.error) {
        alert(result.error);
      } else {
        alert(result.message || "팀 정보 저장 성공");
        resetForm();
      }
    } catch (error) {
      alert("오류 발생");
    }
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
          <TeamButton handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default UserSelection;
