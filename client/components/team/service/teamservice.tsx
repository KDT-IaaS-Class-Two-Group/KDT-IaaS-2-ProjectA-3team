export const fetchLeadersAndMembers = async () => {
  try {
    const [leadersResponse, membersResponse] = await Promise.all([
      fetch("http://localhost:3001/getUser/leaders"),
      fetch("http://localhost:3001/getUser/members"),
    ]);

    const leadersData = await leadersResponse.json();
    const membersData = await membersResponse.json();

    return { leadersData, membersData };
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
