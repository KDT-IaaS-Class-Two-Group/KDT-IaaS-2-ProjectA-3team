/**
 * @file useTeamState.tsx
 * @brief 팀 생성 폼의 상태와 팀원/팀장 관리를 담당하는 커스텀 훅
 * @details 이 파일에는 팀 생성과 관련된 상태 관리 및 팀원/팀장 추가, 제거 기능이 포함되어 있다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
import { useState } from "react";
import { User } from "../props/team.interface";

/**
 * @brief 팀 생성 폼의 상태를 관리하고 팀원/팀장을 추가/제거하는 훅
 * @details 팀 이름, 설명, 팀장 및 팀원 선택 등의 상태를 관리하고, 추가 및 제거 기능을 제공한다.
 * @return 폼 상태와 팀원/팀장 관리 함수들을 반환
 */
const useTeamState = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [selectedLeader, setSelectedLeader] = useState<User | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [teamDescription, setTeamDescription] = useState<string>("");

  /**
   * @brief 팀장을 추가하는 함수
   * @details 선택된 사용자를 팀장으로 설정한다.
   * @param {User} user 선택된 팀장 사용자 객체
   */
  const addLeader = (user: User) => {
    setSelectedLeader(user);
  };

  /**
   * @brief 팀장을 제거하는 함수
   * @details 현재 선택된 팀장을 제거한다.
   */
  const removeLeader = () => {
    setSelectedLeader(null);
  };

  /**
   * @brief 팀원을 추가하는 함수
   * @details 선택된 사용자를 팀원 목록에 추가한다.
   * @param {User} user 선택된 팀원 사용자 객체
   */
  const addMember = (user: User) => {
    //some 메서드는 배열 요소 중 하나라도 조건을 만족하면 true를 반환하기에, 배열에 중복된 사용자가 있는지 확인하고 중복되지 않은 경우에만 새로운 사용자를 추가하도록 한다.
    if (!selectedMembers.some((member) => member.user_id === user.user_id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
  };

  /**
   * @brief 팀원을 제거하는 함수
   * @details 현재 선택된 팀원 목록에서 특정 사용자를 제거한다.
   * @param {User} user 제거할 팀원 사용자 객체
   */
  const removeMember = (user: User) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.user_id !== user.user_id)
    );
  };

  /**
   * @brief 폼을 초기화하는 함수
   * @details 팀 이름, 팀장, 팀원, 팀 설명 등의 상태를 초기화한다.
   */
  const resetForm = () => {
    setTeamName("");
    setTeamDescription("");
    setSelectedLeader(null);
    setSelectedMembers([]);
  };

  return {
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
  };
};

export default useTeamState;
