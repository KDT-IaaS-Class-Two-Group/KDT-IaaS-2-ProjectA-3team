// organism/issue/IssueList.tsx
import React from "react";
import { Issue } from "client/components/issue/interface/issue.interface";
import IssueItem from "client/refactor_component/molecule/issue/issue_item";
import { ListContainer } from "client/components/project_info/style/projectInfoContainer.css"; 

interface IssueListProps {
  issues: Issue[];
}

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  return (
    <div className={ListContainer}>
      {issues.length > 0 ? (
        issues.map((item: Issue) => <IssueItem key={item.issue_id} issue={item} />)
      ) : (
        <p>No issues found.</p>
      )}
    </div>
  );
};

export default IssueList;
