/**
 * @file team_submit_hanlde.ts
 * @brief 폼 제출 처리 함수
 * @details 이 파일에는 팀 생성 폼 제출 시 데이터를 검증하고 서버에 저장 요청을 보내는 로직이 존재한다. 폼에 입력된 팀 이름, 팀장, 팀원 목록 및 팀 설명이 유효한지 확인하고, 서버에 팀 정보를 저장한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import { User } from "../interface/team.interface";
import fetchCheckTeamNameExists from "../service/checkTeamNameExist/fetchCheckTeamNameExists";
import fetchSaveTeamData from "../service/saveTeamData/fetchSaveTeamData";

/**
 * @brief 폼 제출 처리 함수
 * @details 폼 제출 시 팀 이름, 팀장, 팀원이 모두 유효한지 확인하고, 서버로 팀 데이터를 저장하는 요청을 보낸다.
 * @param {Object} params 함수에서 사용할 파라미터 객체
 * @param {string} params.teamName 팀 이름
 * @param {User | null} params.selectedLeader 선택된 팀장
 * @param {User[]} params.selectedMembers 선택된 팀원들
 * @param {string} params.teamDescription 팀 설명
 * @param {Function} params.resetForm 폼 리셋 함수
 */
const submitHanlde = async ({
  teamName,
  selectedLeader,
  selectedMembers,
  teamDescription,
  resetForm,
}: {
  teamName: string;
  selectedLeader: User | null;
  selectedMembers: User[];
  teamDescription: string;
  resetForm: () => void;
}) => {
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

export default submitHanlde;
