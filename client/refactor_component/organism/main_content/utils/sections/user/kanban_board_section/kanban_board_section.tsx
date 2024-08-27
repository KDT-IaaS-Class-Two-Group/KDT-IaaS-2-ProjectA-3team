import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import KanbanComponent from "client/refactor_component/template/kanban_board/kanban";

import MainContentProps from "client/refactor_component/organism/main_content/props/main_content.props";
import {
  kanbansection,
  usersection,
} from "client/styles/users/userdashboard.css";

const KanbanBoardSection = withCardSection(KanbanComponent, {
  sectionClassName: `${usersection} ${kanbansection}`,
  title: "Kanban Board",
  buttonText: "View Kanban",
  onClick: (props: MainContentProps) => {
    props.onClick(<KanbanComponent user_id={props.userId} />);
    return null;
  },
});

export default KanbanBoardSection;
