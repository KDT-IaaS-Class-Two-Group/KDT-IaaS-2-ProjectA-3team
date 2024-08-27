import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import KanbanComponent from "client/refactor_component/template/kanban_board/kanban";

import MainContentProps from "client/refactor_component/organism/main_content/props/main_content.props";
import {
  todolistsection,
  usersection,
} from "client/styles/users/userdashboard.css";
import KanbanBoardSection from "../kanban_board_section/kanban_board_section";
import ClockInButton from "client/components/backButtonSection/ClockInButton";
//임시로 ClockInButton과 연결함. 아직 todolist 미구현
const TodoListSection = withCardSection(ClockInButton, {
  sectionClassName: `${usersection} ${todolistsection}`,
  title: "TodoList",
  buttonText: "todolist",
  onClick: (props: MainContentProps) => {
    props.onClick(<TodoListSection />);
    return null;
  },
});

export default TodoListSection;
