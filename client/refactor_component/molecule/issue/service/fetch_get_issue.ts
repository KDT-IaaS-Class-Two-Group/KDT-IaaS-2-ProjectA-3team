/**
 * @file fetch_get_issue.ts
 * @brief 이슈 데이터 가져오기 함수
 * @details 이 함수는 주어진 프로젝트 이름에 해당하는 이슈 데이터를 서버에서 가져온다.
 *          HTTP GET 요청을 통해 이슈 데이터를 요청하고, 응답을 JSON 형식으로 반환한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

/**
 * @brief 프로젝트 이름으로 이슈 데이터 가져오기
 * @details 주어진 프로젝트 이름을 기반으로 HTTP GET 요청을 보내어 서버에서 이슈 데이터를 가져온다.
 *          서버의 응답은 JSON 형식으로 변환하여 반환된다.
 * @param {string} project_name - 이슈를 가져올 프로젝트의 이름
 * @return {Promise<any>} 서버로부터 받은 이슈 데이터의 JSON 형태
 */
export const fetchGetIssue = async (project_name: string): Promise<any> => {
  // 주어진 프로젝트 이름을 사용하여 이슈 데이터 요청 URL 생성
  const response = await fetch(`http://localhost:3001/issue/${project_name}`);

  // 서버의 응답을 JSON으로 변환
  const result = await response.json();

  // 변환된 JSON 데이터 반환
  return result;
};
export const fetchAddIssue = async (issueData: {
  project_name: string;
  issue_title: string;
  issue_description: string;
}): Promise<any> => {
  // 이슈 데이터를 서버에 전달할 POST 요청
  const response = await fetch(`http://localhost:3001/issue/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issueData),
  });

  // 서버의 응답을 JSON으로 변환
  const result = await response.json();

  // 변환된 JSON 데이터 반환
  return result;
};