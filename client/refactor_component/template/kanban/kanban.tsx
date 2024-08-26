/**
 * @file Kanban.tsx
 * @brief Kanban 보드 컴포넌트
 * @details 이 컴포넌트는 Kanban 보드에서 이슈를 표시하며, 로딩 상태와 오류 메시지를 처리한다.
 * @author @zoeznm
 * @date 2024-08-25
 */

import React from "react";
import { KanbanProps } from "../../organism/kanban/props/user.props";
import { useKanban } from "../../organism/kanban/hook/use_kanban";
import {
  IssueContainer,
  KanbanListContainer,
} from "../../../components/project_info/style/projectInfoContainer.css";

/**
 * @function KanbanComponent
 * @brief Kanban 보드에서 이슈를 표시하는 컴포넌트
 * @details 이 컴포넌트는 주어진 사용자 ID를 사용하여 이슈를 가져오고, 이를 Kanban 보드에 표시한다. 로딩 상태와 오류 메시지를 처리하며, 이슈가 없을 경우 적절한 메시지를 표시한다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 * 
 * @param {KanbanProps} props - 컴포넌트에 전달되는 속성
 * @param {string} props.user_id - 이슈를 가져올 사용자의 ID
 *
 * @return {React.ReactElement} - Kanban 보드 컴포넌트의 렌더링 결과
 *
 * @example
 * // KanbanComponent를 사용하는 예제
 * <KanbanComponent user_id="12345" />
 *
 * @note `useKanban` 훅을 사용하여 이슈 데이터를 비동기로 가져오며, 로딩 상태와 오류 처리를 포함한다.
 */
const KanbanComponent: React.FC<KanbanProps> = ({ user_id }) => {
  const { issue, loading, error } = useKanban(user_id);

  return (
    <div>
      <div className={KanbanListContainer}>
        {loading && <p>로딩 중...</p>}
        {error && <p>{error}</p>}
        {issue.length > 0 ? (
          issue.map((item) => (
            <div key={item.issue_id} className={IssueContainer}>
              <h2>{item.issue_name}</h2>
              <p>Status: {item.status}</p>
              <p>Project: {item.project_name}</p>
              <p>User ID: {item.user_id || "N/A"}</p>
            </div>
          ))
        ) : (
          <p>No issues found.</p>
        )}
      </div>
    </div>
  );
};

export default KanbanComponent;
