/**
 * @function fetchGetKanban
 * @brief Kanban 보드의 모든 이슈를 가져오는 함수
 *
 * @author @zoeznm
 * @date 2024-08-25
 *
 * @details 이 함수는 주어진 사용자 ID를 바탕으로 Kanban 보드에서 모든 이슈를 조회하는 비동기 함수이다. 서버로부터 이슈 데이터를 가져와 JSON 형식으로 반환하며, 요청 결과를 콘솔에 로그로 출력한다.
 *
 * @param {string} user_id - 이슈를 가져올 사용자 ID (현재는 사용되지 않지만, 향후 확장 가능성을 고려하여 인수로 포함됨)
 *
 * @return {Promise<any>} - 서버로부터 받은 이슈 데이터의 JSON 객체를 포함하는 Promise
 *
 * @throws {Error} - HTTP 요청에 실패할 경우 에러를 발생시킵니다.
 *
 * @example
 * // 사용 예제
 * fetchGetKanban("12345")
 *   .then(result => console.log(result))
 *   .catch(error => console.error("Error fetching Kanban issues:", error));
 *
 * @note 현재는 `user_id` 매개변수를 사용하지 않지만, 미래의 기능 확장을 고려하여 포함되어 있습니다.
 */
export const fetchGetKanban = async (user_id: string) => {
  const response = await fetch(`http://localhost:3001/issue/all`);
  const result = await response.json();
  console.log("result:", result);
  return result;
};
