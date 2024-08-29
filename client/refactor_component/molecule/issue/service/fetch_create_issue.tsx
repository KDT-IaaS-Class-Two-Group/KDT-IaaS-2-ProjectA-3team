/**
 * @file fetch_create_issue.ts
 * @brief 이슈 생성 요청 함수
 * @details 이 함수는 주어진 프로젝트 이름과 이슈 이름을 사용하여 서버에 새로운 이슈를 생성 요청을 보낸다.
 *          HTTP POST 요청을 통해 이슈 생성 요청을 서버에 전달하며, 요청이 실패할 경우 오류를 발생시킨다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

/**
 * @brief 새로운 이슈 생성 요청
 * @details 주어진 프로젝트 이름과 이슈 이름을 사용하여 서버에 새로운 이슈를 생성하는 POST 요청을 보낸다.
 *          요청이 성공하면 `true`를 반환하며, 실패할 경우 오류를 발생시킨다.
 * @param {string} project_name - 이슈를 생성할 프로젝트의 이름
 * @param {string} issue_name - 생성할 이슈의 이름
 * @return {Promise<boolean>} 요청이 성공할 경우 `true`, 실패 시 오류를 발생시킴
 * @throws {Error} 요청 실패 시 오류를 발생시킴
 */
const fetchCreateIssue = async (
  project_name: string,
  issue_name: string
): Promise<boolean> => {
  const response = await fetch("http://localhost:3001/issue/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ project_name, issue_name }),
  });

  if (!response.ok) {
    throw new Error("Fetch 실패 - POST issue");
  }

  return true;
};

export default fetchCreateIssue;
