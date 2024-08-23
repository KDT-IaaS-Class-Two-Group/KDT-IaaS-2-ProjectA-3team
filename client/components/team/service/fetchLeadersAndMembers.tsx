/**
 * @file fetchLeaderAndMembers.tsx
 * @brief 팀장과 팀원 데이터를 가져오는 함수 파일
 * @details xla장과 팀원 데이터를 가져오는 함수, 팀 이름의 존재 여부를 확인하는 함수, 팀 데이터를 저장하는 함수가 포함되어 있다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
/**
 * @brief 팀장과 팀원 데이터를 가져오는 함수
 * @details 비동기적으로 getUser/leaders, getUser/members API를 병렬로 실행한다. 각 응답을 JSON으로 변환한 후 객체로 반환한다.
 * @return {Promise<Object>} 리더 데이터와 멤버 데이터를 포함한 객체를 반환
 */
export const fetchLeadersAndMembers = async () => {
  try {
    //비동기적으로 병렬 API 실행
    const [leadersResponse, membersResponse] = await Promise.all([
      fetch("http://localhost:3001/getUser/leaders"),
      fetch("http://localhost:3001/getUser/members"),
    ]);
    //JSON으로 변환
    const leadersData = await leadersResponse.json();
    const membersData = await membersResponse.json();
    //객체 형식으로 반환
    return { leadersData, membersData };
    //오류 발생 시 빈 객체로 반환
  } catch (error) {
    console.error("Error fetching users:", error);
    return { leadersData: [], membersData: [] };
  }
};

export const checkTeamNameExists = async (name: string) => {
  try {
    const response = await fetch(
      "http://localhost:3001/getUser/checkTeamName",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team_name: name }),
      }
    );

    const result = await response.json();
    return result.exists;
  } catch (error) {
    console.error("Error checking team name:", error);
    return false;
  }
};

export const saveTeamData = async (teamData: any) => {
  try {
    const response = await fetch("http://localhost:3001/team/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamData),
    });

    if (!response.ok) {
      throw new Error("팀 정보 저장 실패");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving team data:", error);
    throw new Error("팀 정보 저장 중 오류가 발생했습니다.");
  }
};
