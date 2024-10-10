import React, { useState, useEffect } from "react";
import { useKanban } from "../../refactor_component/organism/kanban_board/hook/use_kanban";
import {
  IssueContainer,
  KanbanListContainer,
} from "../../components/project_info/style/projectInfoContainer.css";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

interface SessionData {
  user_id: string;
  role_name: string;
}

const ToDoListComponent: React.FC = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loadingSession, setLoadingSession] = useState(true); // 세션 로딩 상태 관리
  const [filter, setFilter] = useState<"all" | "completed" | "in-progress">(
    "all"
  );

  // 세션에서 user_id를 가져옴
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setSessionData(data.session);
          console.log("Session data fetched:", data.session);
        } else {
          console.error("Failed to fetch session data", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch session data", error);
      } finally {
        setLoadingSession(false);
      }
    };

    fetchSessionData();
  }, []);

  // 세션 데이터를 가져오기 전에 로딩 메시지 표시
  if (loadingSession) {
    return <p>세션 데이터를 불러오는 중...</p>;
  }

  const { issue, loading, error } = useKanban(sessionData?.user_id || "");

  const filteredIssues = issue.filter((item) => {
    if (filter === "all") return true;
    return filter === "completed"
      ? item.status === "completed"
      : item.status === "in-progress";
  });

  return (
    <div>
      <h2>ToDo 리스트</h2>

      {/* 필터 버튼 */}
      <div>
        <button onClick={() => setFilter("all")}>모두 보기</button>
        <button onClick={() => setFilter("completed")}>완료된 항목</button>
        <button onClick={() => setFilter("in-progress")}>진행 중 항목</button>
      </div>

      <div className={KanbanListContainer}>
        {loading && <p>로딩 중...</p>}
        {error && <p>{error}</p>}
        {filteredIssues.length > 0 ? (
          filteredIssues.map((item) => (
            <div key={item.issue_id} className={IssueContainer}>
              <h2>{item.issue_name}</h2>
              <p>상태: {item.status}</p>
              <p>프로젝트: {item.project_name}</p>
              <input
                type="checkbox"
                defaultChecked={item.status === "completed"}
              />
              <p>사용자 ID: {item.user_id || "N/A"}</p>
            </div>
          ))
        ) : (
          <p>이슈가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ToDoListComponent;
