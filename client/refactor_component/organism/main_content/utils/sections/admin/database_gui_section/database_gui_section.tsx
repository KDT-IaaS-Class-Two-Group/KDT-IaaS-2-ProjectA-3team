import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import React from "react";
import MainContentProps from "../../../../props/main_content.props";
import { section } from "client/styles/admin/admindashboard.css";
import DBGUI from "client/refactor_component/template/dash_temp/db_gui";
import { databaseGUISection } from "client/styles/admin/databaseGUI/databasegui.css";
import DatabaseGUI from "client/components/DatabaseGuI";

const DatabaseGUISection = withCardSection(DatabaseGUI, {
  sectionClassName: `${section} ${databaseGUISection}`,
  title: "Database GUI",
  buttonText: "View Database",
  onClick: (props: MainContentProps) => {
    props.onClick(<DBGUI />);
    return null;
  },
});
export default DatabaseGUISection;
