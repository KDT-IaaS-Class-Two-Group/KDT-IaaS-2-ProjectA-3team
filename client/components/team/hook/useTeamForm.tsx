/**
 * @file useTeamForm.tsx
 * @brief 팀 생성 폼의 상태를 관리하는 커스텀 훅
 * @details 이 파일에는 팀 생성과 관련된 상태 및 함수들을 관리하는 훅이 포함되어 있다. 폼 데이터를 초기화하고, 리더와 팀원 목록을 관리하는 기능을 제공한다.
 *
 * @autor @dalramjwi
 * @date 2024-08-23
 */
import { useState, useEffect } from "react";
import fetchLeadersAndMembers from "../service/leaderAndMembers/fetchLeadersAndMembers";
import { User } from "../interface/team.interface";

/**
 * @brief 팀 생성 폼의 상태를 관리하는 훅
 * @details 팀 이름, 리더, 팀원, 팀 설명 등 폼 입력값을 상태로 관리한다.
 * @return 폼의 상태와 각종 처리 함수들을 반환
 */
const useTeamForm = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [leaders, setLeaders] = useState<User[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<User | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [teamDescription, setTeamDescription] = useState<string>("");

  useEffect(() => {
    const initializeUsers = async () => {
      //fetchLeadersAndMembers에서 전송된 팀장과 팀원 목록 데이터를 전송받아 기본 데이터로 설정한다.
      const { leadersData, membersData } = await fetchLeadersAndMembers();
      setLeaders(leadersData);
      setMembers(membersData);
    };

    initializeUsers();
  }, []);

  const addLeader = (user: User) => {
    setSelectedLeader(user);
  };

  const removeLeader = () => {
    setSelectedLeader(null);
  };

  const addMember = (user: User) => {
    if (!selectedMembers.some((member) => member.user_id === user.user_id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
  };

  const removeMember = (user: User) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.user_id !== user.user_id)
    );
  };

  const resetForm = () => {
    setTeamName("");
    setTeamDescription("");
    setSelectedLeader(null);
    setSelectedMembers([]);
  };

  return {
    teamName,
    setTeamName,
    leaders,
    members,
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

export default useTeamForm;
