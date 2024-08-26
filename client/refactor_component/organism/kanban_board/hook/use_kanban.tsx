import { useEffect, useState } from "react";
import { fetchGetKanban } from "../service/fetch_users"; 
import { KanbanIssue } from "../props/user.props";

/**
 * @function useKanban
 * @brief Kanban 보드 이슈를 가져오는 커스텀 훅
 * 
 * @author @zoeznm
 * @date 2024-08-25
 * 
 * @details 이 훅은 주어진 사용자 ID에 대한 Kanban 보드 이슈를 비동기적으로 가져오고, 로딩 상태와 오류 상태를 관리합니다.
 * 
 * @param {string | null} user_id - 이슈를 조회할 사용자 ID. `null`인 경우에는 데이터가 조회되지 않습니다.
 * 
 * @returns {Object} - 훅의 상태와 결과를 포함하는 객체
 * @returns {KanbanIssue[]} issue - Kanban 보드의 이슈 배열
 * @returns {boolean} loading - 데이터 로딩 상태를 나타내는 불리언 값
 * @returns {string | null} error - 오류 메시지 또는 `null` (오류가 없는 경우)
 */
export const useKanban = (user_id: string | null) => {
  const [issue, setIssue] = useState<KanbanIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id === null) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchGetKanban(user_id);
        setIssue(result);
      } catch (error) {
        console.error("이슈 읽어오기 실패:", error);
        setError("이슈 읽어오기 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  return { issue, loading, error };
};
