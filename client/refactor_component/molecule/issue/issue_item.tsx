// molecule/issue/IssueItem.tsx
import React from "react";
import { Issue } from "./props/issue.interface";
import { IssueContainer } from "client/components/project_info/style/projectInfoContainer.css"; 

interface IssueItemProps {
  issue: Issue;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  return (
    <div key={issue.issue_id} className={IssueContainer}>
      <h2>{issue.issue_name.value}</h2>
      <p>Status: {issue.status.value}</p>
      <p>Project: {issue.project_name.value}</p>
      <p>User ID: {issue.user_id || "N/A"}</p>
    </div>
  );
};

export default IssueItem;
