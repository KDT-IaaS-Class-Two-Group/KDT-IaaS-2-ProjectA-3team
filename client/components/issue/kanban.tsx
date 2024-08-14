import { useEffect, useState } from "react";
import { IssueProps } from "./interface/props/issue.props";
import { Issue } from "./interface/issue.interface";

import { fetchGetIssue } from "./service/fetchGetIssue";
import Modal from "../modal/modal";
import AddIssueComponent from "./item/addIssueComponent";
import {
  IssueContainer,
  ListContainer,
} from "../project_info/style/projectInfoContainer.css";
import { blueButton } from "client/styles/templatebutton.css";
import { fetchGetKanban } from "./service/fetchGetKanban";

export interface KanbanProps {
  user_id: string | null;
}

interface KanbanIssue {
  issue_id :number;
  issue_name : string;
  project_name : string;
  status : string;
  user_id : string | null;
}

const KanbanComponent: React.FC<KanbanProps> = ({ user_id }) => {
  const [issue, setIssue] = useState<KanbanIssue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user_id === null) {
          return;
        }
        const result = await fetchGetKanban(user_id);
        console.log(result);
        setIssue(result);
      } catch (error) {
        console.error("이슈 읽어오기 실패:", error);
      }
    };

    fetchData();
  }, [user_id]);

  console.log(issue)
  return (
    <div>
      <div className={ListContainer}>
        {issue.length > 0 ? (
          issue.map((item: KanbanIssue) => (
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

// id -> team -> project -> issue 순서로 찾기
