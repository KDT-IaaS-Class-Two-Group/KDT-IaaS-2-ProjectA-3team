import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import Project from "client/refactor_component/template/project_table/project";
import React from "react";
import MainContentProps from "../../../../props/main_content.props";
import ProjectView from "client/components/project/info";
import {
  projectSection,
  section,
} from "client/styles/admin/admindashboard.css";

const ProjectSection = withCardSection(Project, {
  sectionClassName: `${section} ${projectSection}`,
  title: "Project",
  buttonText: "View Project",
  onClick: (props: MainContentProps) => {
    props.onClick(<ProjectView />);
    return null; // ReactNode 반환으로 에러 해결
  },
});

export default ProjectSection;
