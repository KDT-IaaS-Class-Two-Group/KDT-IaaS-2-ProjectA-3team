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
 *          팀 이름이 비어 있거나 이미 존재하는 경우, 팀장이 선택되지 않았거나 팀원이 없는 경우에는 경고 메시지를 표시한다.
 * @param {string} teamName 팀 이름
 * @param {User | null} selectedLeader 선택된 팀장
 * @param {User[]} selectedMembers 선택된 팀원 목록
 * @param {string} teamDescription 팀 설명
 * @param {Function} resetForm 폼 초기화 함수
 * @return {Promise<void>} 서버 요청의 결과에 따라 알림을 표시하고 폼을 초기화한다.
 */
const submitHandle = async ({
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
  // 1. 팀 이름이 비어 있는지 확인
  if (!teamName) {
    alert("팀 이름을 입력해 주세요.");
    return;
  }

  // 2. 팀 이름이 이미 존재하는지 확인
  const nameExists = await fetchCheckTeamNameExists(teamName);
  if (nameExists) {
    alert("이미 존재하는 팀 이름입니다. 다른 팀 이름을 입력해 주세요.");
    return;
  }

  // 3. 팀장이 선택되었는지 확인
  if (!selectedLeader) {
    alert("팀장을 선택해 주세요.");
    return;
  }

  // 4. 팀원이 선택되었는지 확인
  if (selectedMembers.length === 0) {
    alert("팀원을 선택해 주세요.");
    return;
  }

  // 5. 팀 데이터를 서버에 전송하기 위한 데이터 객체 생성
  const teamData = {
    team_name: teamName,
    description: teamDescription,
    teamLeader: selectedLeader ? { user_id: selectedLeader.user_id } : null,
    teamMembers: selectedMembers.map((member) => ({
      user_id: member.user_id,
    })),
  };

  try {
    // 6. 서버에 팀 데이터 저장 요청
    const result = await fetchSaveTeamData(teamData);

    // 7. 요청 결과에 따라 사용자에게 알림 표시
    if (result.error) {
      alert(result.error);
    } else {
      alert(result.message || "팀 정보 저장 성공");
      // 8. 폼 초기화
      resetForm();
    }
  } catch (error) {
    // 9. 요청 중 오류가 발생한 경우 오류 메시지 표시
    alert("오류 발생");
  }
};

export default submitHandle;
