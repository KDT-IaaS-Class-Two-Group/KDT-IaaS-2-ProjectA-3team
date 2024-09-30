import React, { useEffect, useState } from "react";
import { Issue } from "./props/issue.interface";
import { IssueContainer } from "client/components/project_info/style/projectInfoContainer.css";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

interface SessionData {
  user_id: string;
  role_name: string;
}

interface IssueItemProps {
  issue: Issue; // 표시할 이슈 정보 객체
}

const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

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
      }
    };

    fetchSessionData();
  }, []);

  return (
    <div key={issue.issue_id} className={IssueContainer}>
      <h2>{issue.issue_name.value}</h2> {/* 이슈 이름 */}
      <p>Status: {issue.status.value}</p> {/* 이슈 상태 */}
      <p>Project: {issue.project_name.value}</p> {/* 프로젝트 이름 */}
      {sessionData && (
        <p>User ID: {sessionData.user_id}</p> 
      )}
    </div>
  );
};

export default IssueItem;
