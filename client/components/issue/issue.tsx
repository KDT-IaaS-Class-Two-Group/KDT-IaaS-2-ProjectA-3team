import { useEffect, useState } from "react";
import { IssueProps } from "./interface/props/issue.props";
import { Issue } from "./interface/issue.interface";

import { fetchGetIssue } from "./service/fetchGetIssue";
import Modal from "../modal/modal";
import AddIssueComponent from "./item/addIssueComponent";
import { pagemainmain } from "client/styles/team/teampage.css";
import { IssueContainer, ListContainer } from "../project_info/style/projectInfoContainer.css";
import { blueButton } from "client/styles/templatebutton.css";

const IssueComponent: React.FC<IssueProps> = ({ project_name }) => {
  const [issue, setIssue] = useState<Issue[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGetIssue(project_name);
        console.log(result);
        setIssue(result);
      } catch (error) {
        console.error("이슈 읽어오기 실패:", error);
      }
    };

    fetchData();
  }, [project_name, isOpen]);

  return (
    <div>
      <div>
        <button className ={blueButton}onClick={onOpen}>issue추가</button>
      </div>

      <div className={ListContainer}>
        {issue.length > 0 ? (
          issue.map((item: Issue) => (
            <div key={item.issue_id} className={IssueContainer}>
              <h2>{item.issue_name.value}</h2>
              <p>Status: {item.status.value}</p>
              <p>Project: {item.project_name.value}</p>
              <p>User ID: {item.user_id || "N/A"}</p>
            </div>
          ))
        ) : (
          <p>No issues found.</p>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <AddIssueComponent
          project_name={project_name}
          onClose={onClose}
        ></AddIssueComponent>
      </Modal>
    </div>
  );
};

export default IssueComponent;
