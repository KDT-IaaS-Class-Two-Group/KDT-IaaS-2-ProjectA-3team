// template/issue/IssueComponent.tsx
import React, { useState, useEffect } from "react";
import { AddIssueProps } from "client/refactor_component/molecule/issue/props/addIssue.props";
import { Issue } from "client/refactor_component/molecule/issue/props/issue.interface";
import { fetchGetIssue } from "client/refactor_component/molecule/issue/service/fetchGetIssue";
import Modal from "client/components/modal/modal";
import AddIssueComponent from "client/refactor_component/molecule/issue/item/addIssueComponent";
import { blueButton } from "client/styles/templatebutton.css";
import IssueList from "client/refactor_component/organism/issue/issue_item";

const IssueComponent: React.FC<AddIssueProps> = ({ project_name }) => {
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
    <div className={""}>
      <div>
        <button className={blueButton} onClick={onOpen}>issue추가</button>
      </div>

      <IssueList issues={issue} />

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
