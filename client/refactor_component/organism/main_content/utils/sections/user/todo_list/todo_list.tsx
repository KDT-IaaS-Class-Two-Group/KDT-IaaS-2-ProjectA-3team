import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React, { useEffect, useState } from "react";
import MainContentProps from "client/refactor_component/organism/main_content/props/main_content.props";
import {
  todolistsection,
  usersection,
} from "client/styles/users/userdashboard.css";
import TodoListComponent from "./TodoListComponent"; // 실제로 사용할 TODO 리스트 컴포넌트

const TodoListSection = withCardSection((props: MainContentProps) => {
  const [issueId, setIssueId] = useState<string | null>(null);

  useEffect(() => {
    console.log("Received issueId:", props.issueId);
    if (props.issueId) {
      setIssueId(props.issueId);
    }
  }, [props.issueId]);

  if (!issueId) {
    return <div>Select an issue to view its TODO list</div>;
  }

  return <TodoListComponent issueId={issueId} />; // 실제 이슈 ID에 따라 TODO 리스트를 표시
}, {
  sectionClassName: `${usersection} ${todolistsection}`,
  title: "TodoList",
  buttonText: "todolist",
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
