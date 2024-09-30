import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React, { useEffect, useState } from "react";
import MainContentProps from "client/refactor_component/organism/main_content/props/main_content.props";
import {
  todolistsection,
  usersection,
} from "client/styles/users/userdashboard.css";
import TodoListComponent from "./TodoListComponent"; // 실제로 사용할 TODO 리스트 컴포넌트

const TodoListSection = withCardSection((props: MainContentProps) => {
  const [issueId, setIssueId] = useState<string | null>(null); // 선택된 이슈 ID 상태
  const [issues, setIssues] = useState<any[]>([]); // 모든 이슈 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리

  useEffect(() => {
    // 이슈 데이터 가져오기 - 이슈 목록을 가져오는 API를 호출하여 설정
    const fetchIssues = async () => {
      try {
        const response = await fetch("http://localhost:3001/issue/all"); // 이슈 목록 API 호출
        const data = await response.json();
        setIssues(data); // 이슈 목록 설정
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("이슈 목록 가져오기 실패:", error);
        setLoading(false); // 로딩 실패 시에도 완료 처리
      }
    };

    fetchIssues();
  }, []);

  // 이슈 ID가 전달되면 해당 이슈에 맞는 ToDo 리스트를 표시
  useEffect(() => {
    console.log("Received issueId:", props.issueId); // issueId 값 출력
    if (props.issueId) {
      setIssueId(props.issueId);
    }
  }, [props.issueId]);

  if (loading) {
    return <div>Loading issues...</div>; // 로딩 중인 경우 메시지 표시
  }

  if (!issueId) {
    return (
      <div>
        <h3>Select an issue to view its TODO list</h3>
        <ul>
          {issues.map((issue) => (
            <li key={issue.issue_id} onClick={() => setIssueId(issue.issue_id)}>
              {issue.issue_name} {/* 이슈 목록에서 선택 가능 */}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <TodoListComponent issueId={issueId} />; // 선택된 이슈에 따라 ToDo 리스트를 표시
}, {
  sectionClassName: `${usersection} ${todolistsection}`,
  title: "TodoList",
  buttonText: "View ToDo List",
  onClick: (props: MainContentProps) => {
    if (props.onClick) {  // 여기서 props.onClick이 존재하는지 확인
      props.onClick(<TodoListSection issueId={props.issueId} />);  // 이슈 ID를 전달
    } else {
      console.warn("onClick function is not provided");
    }
    return null;
  },
});

export default TodoListSection;
