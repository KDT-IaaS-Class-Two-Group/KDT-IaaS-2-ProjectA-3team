/**
 * @file fetchCheckTeamNameExists.tsx
 * @brief 팀 이름의 존재 여부를 확인하는 함수 파일
 * @details 이 파일에는 특정 팀 이름이 이미 존재하는지 서버에 확인하는 함수가 포함되어 있다. 서버에 POST 요청을 보내고, 응답 결과를 기반으로 팀 이름이 존재하는지 여부를 반환한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */
/**
 * @brief 팀 이름의 존재 여부를 확인하는 함수
 * @details 특정 팀 이름이 이미 존재하는지 확인하기 위해 서버에 POST 요청을 보낸다. 요청 본문에는 확인할 팀 이름이 포함되어 있다.
 * @param {string} name 확인할 팀 이름
 * @return {Promise<boolean>} 팀 이름이 존재하면 true, 존재하지 않으면 false를 반환
 */
const fetchCheckTeamNameExists = async (name: string): Promise<boolean> => {
  try {
    // 팀 이름 확인을 위해 서버에 POST 요청 전송
    const response = await fetch(
      "http://localhost:3001/getUser/checkTeamName",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 요청 본문에 팀 이름 포함
        body: JSON.stringify({ team_name: name }),
      }
    );

    // 응답을 JSON으로 변환하여 결과 반환
    const result = await response.json();
    // 팀 이름 존재 여부 반환
    return result.exists;
    // 오류 발생 시 콘솔에 에러 메시지 출력하고 false 반환
  } catch (error) {
    console.error("Error checking team name:", error);
    return false;
  }
};

export default fetchCheckTeamNameExists;
