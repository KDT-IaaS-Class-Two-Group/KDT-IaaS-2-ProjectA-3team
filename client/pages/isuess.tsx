import React, { useState, useEffect } from "react";
import { AddIssueProps } from "client/refactor_component/molecule/issue/props/add_issue.props";
import { Issue } from "client/refactor_component/molecule/issue/props/issue.interface";
import { fetchGetIssue, fetchAddIssue } from "client/refactor_component/molecule/issue/service/fetch_get_issue";
import Modal from "client/components/modal/modal";
import AddIssueComponent from "client/refactor_component/molecule/issue/add_issue_component";
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

  // 새로운 테스트 이슈 추가
  const addTestIssue = async () => {
    const testIssue = {
      project_name,
      issue_title: "테스트 이슈",
      issue_description: "이것은 테스트 이슈입니다.",
    };

    try {
      const result = await fetchAddIssue(testIssue); // 새로운 이슈 생성
      console.log("Test Issue Added: ", result);
      await fetchData(); // 이슈 리스트 새로고침
    } catch (error) {
      console.error("이슈 추가 실패:", error);
    }
  };

  const fetchData = async () => {
    try {
      const result = await fetchGetIssue(project_name);
      console.log(result);
      setIssue(result);
    } catch (error) {
      console.error("이슈 읽어오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [project_name, isOpen]);

  return (
    <div className={""}>
      <div>
        <button className={blueButton} onClick={onOpen}>issue추가</button>
        <button className={blueButton} onClick={addTestIssue}>테스트 이슈 추가</button> {/* 테스트 이슈 추가 버튼 */}
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
