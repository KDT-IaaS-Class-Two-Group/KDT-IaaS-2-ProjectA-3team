/**
 * @file useTeamFetch.tsx
 * @brief 팀장과 팀원 데이터를 가져와 초기화하는 커스텀 훅
 * @details 이 파일에는 서버로부터 팀장과 팀원 데이터를 가져와 상태를 초기화한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
import { useState, useEffect } from "react";
import { User } from "../props/team.interface";
import fetchLeadersAndMembers from "../service/leader_and_members/fetch_leaders_and_members";

/**
 * @brief 팀장과 팀원 데이터를 가져와 상태를 초기화하는 훅
 * @details 서버로부터 팀장과 팀원 데이터를 fetch하여 상태로 설정한다.
 * @return 팀장과 팀원 데이터를 반환하는 상태를 반환
 */
const useTeam = () => {
  const [leaders, setLeaders] = useState<User[]>([]);
  const [members, setMembers] = useState<User[]>([]);

  /**
   * @brief 서버에서 팀장과 팀원 데이터를 가져와 상태를 설정하는 함수
   * @details 이 함수는 컴포넌트가 마운트될 때 실행되며, fetch된 데이터를 상태에 저장한다.
   */
  useEffect(() => {
    const initializeUsers = async () => {
      try {
        const { leadersData, membersData } = await fetchLeadersAndMembers();
        // 팀장 데이터를 상태에 설정
        setLeaders(leadersData);
        // 팀원 데이터를 상태에 설정
        setMembers(membersData);
      } catch (error) {
        console.error("팀장, 팀원 데이터 전송 실패:", error);
      }
    };

    initializeUsers();
  }, []);

  return {
    leaders,
    members,
  };
};

export default useTeam;
