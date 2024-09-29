/**
 * @file fetchSaveTeamData.tsx
 * @brief 팀 데이터를 저장하는 함수 파일
 * @details 이 파일에는 팀 데이터를 서버에 저장하는 함수가 포함되어 있다. 서버에 POST 요청을 보내고, 요청 결과를 처리하여 팀 데이터가 성공적으로 저장되었는지 확인한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
/**
 * @brief 팀 데이터를 저장하는 함수
 * @details 전달된 팀 데이터를 서버에 저장하기 위해 POST 요청을 보낸다. 요청이 성공적으로 처리되지 않을 경우 오류를 발생시키고, 성공적으로 처리된 경우 응답 데이터를 반환한다.
 * @param {any} teamData 저장할 팀 데이터
 * @return {Promise<Object>} 서버에서 반환된 결과 데이터를 반환
 * @throws {Error} 요청이 실패한 경우 에러 메시지를 반환
 */
const fetchSaveTeamData = async (teamData: any): Promise<any> => {
  try {
    // 팀 데이터를 저장하기 위해 서버에 POST 요청 전송
    const response = await fetch("http://localhost:3001/user/saveTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // 요청 본문에 팀 데이터 포함
      // body: JSON.stringify(teamData),
      //임시로 더미 값 테스트중 -!!테스트
      //team 이름 중복이면 값이 안들어가기 때문에 팀 이름 바꿔가면서 테스트 필요
      body: JSON.stringify({
        team_name: "sadfsadfsaf",
        description: "임시테스트",
        teamLeader: ["user003"],
        teamMembers: ["user004"],
      }),
    });

    // 응답이 성공적이지 않으면 오류 발생
    if (!response.ok) {
      throw new Error("팀 정보 저장 실패");
    }
    console.log(teamData);
    console.log(teamData.teamLeader);
    // 응답을 JSON으로 변환하여 결과 반환
    const result = await response.json();
    console.log(result);
    return result; // 서버에서 반환된 결과 데이터 반환
  } catch (error) {
    // 오류 발생 시 콘솔에 에러 메시지 출력하고 에러 던짐
    console.error("Error saving team data:", error);
    throw new Error("팀 정보 저장 중 오류가 발생했습니다.");
  }
};

export default fetchSaveTeamData;
