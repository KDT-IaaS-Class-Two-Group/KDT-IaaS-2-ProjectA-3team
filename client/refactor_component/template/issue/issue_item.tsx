import React, { useState, useEffect } from "react";
import { AddIssueProps } from "client/refactor_component/molecule/issue/props/add_issue.props";
import { fetchGetIssue } from "client/refactor_component/molecule/issue/service/fetch_get_issue";
import Modal from "client/components/modal/modal";
import AddIssueComponent from "client/refactor_component/molecule/issue/add_issue_component";
import { blueButton } from "client/styles/templatebutton.css";
import IssueList from "client/refactor_component/organism/issue/issue_item";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { Issue } from "client/refactor_component/molecule/issue/props/issue.interface";
interface SessionData {
  user_id: string;
  role_name: string;
}



const IssueComponent: React.FC<AddIssueProps> = ({ project_name }) => {
  const [issue, setIssue] = useState<Issue[]>([]); // Issue 타입으로 정의
  const [isOpen, setOpen] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  // 세션 데이터 가져오기
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
          if (data.session) {
            setSessionData(data.session); // 세션 데이터 설정
          } else {
            console.error("세션 데이터가 비어 있습니다.");
          }
        } else {
          console.error("세션 데이터를 가져오는 데 실패했습니다: ", response.statusText);
        }
      } catch (error) {
        console.error("세션 데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchSessionData();
  }, []);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const result = await fetchGetIssue(project_name);
      setIssue(result);
    } catch (error) {
      console.error("이슈 데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [project_name, isOpen]);

  return (
    <div>
      <div>
        <button className={blueButton} onClick={onOpen}>issue 추가</button>
      </div>

      <IssueList issues={issue} />

      <Modal isOpen={isOpen} onClose={onClose}>
        {sessionData ? (
          <AddIssueComponent
            project_name={project_name}
            user_id={sessionData.user_id}  // 세션의 user_id 전달
            onClose={onClose}
          />
        ) : (
          <p>세션 데이터를 불러오는 중입니다...</p>
        )}
      </Modal>
    </div>
  );
};

export default IssueComponent;
