/**
 * @interface KanbanProps
 * @brief Kanban 컴포넌트에 필요한 프로퍼티를 정의하는 인터페이스
 *
 *
 * @author @zoeznm
 * @date 2024-08-25
 *
 * @details 이 인터페이스는 Kanban 컴포넌트가 받아야 할 프로퍼티를 정의합니다. 사용자 ID는 Kanban 보드의 이슈를 조회하는 데 사용됩니다.
 *
 * @property {string | null} user_id - Kanban 보드를 조회할 때 사용할 사용자 ID. `null`일 수 있으며, 이 경우 모든 사용자에 대한 정보를 조회할 수 있습니다.
 */
export interface KanbanProps {
  user_id: string | null;
}

/**
 * @interface KanbanIssue
 * @brief Kanban 보드의 이슈를 나타내는 인터페이스
 * @details 이 인터페이스는 Kanban 보드에서 사용되는 개별 이슈의 세부 사항을 정의합니다. 각 이슈는 고유한 ID, 이름, 프로젝트 이름, 상태 및 사용자 ID를 포함합니다.
 *
 * @property {number} issue_id - 이슈의 고유 식별자
 * @property {string} issue_name - 이슈의 제목 또는 이름
 * @property {string} project_name - 이슈가 관련된 프로젝트의 이름
 * @property {string} status - 이슈의 현재 상태 (예: "진행 중", "완료", "대기 중" 등)
 * @property {string | null} user_id - 이 이슈를 담당하는 사용자 ID. `null`일 경우, 이 이슈에 담당 사용자가 설정되지 않았음을 나타냅니다.
 */
export interface KanbanIssue {
  issue_id: number;
  issue_name: string;
  project_name: string;
  status: string;
  user_id: string | null;
}
