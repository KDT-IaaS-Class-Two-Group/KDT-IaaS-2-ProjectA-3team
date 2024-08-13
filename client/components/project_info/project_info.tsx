import { useEffect, useState } from "react";
import MemberInfoItem from "./item/membeList";
import ProjectInfoItem from "./item/projectContent";
import { MemberList } from "./style/memberList.css";
import { ProjectInfoSection } from "./style/projectInfoSection.css";
import { MemeberContainer } from "./style/memberListContainer.css";
import { ProjectInfoContainer } from "./style/projectInfoContainer.css";
import AddStackButton from "./item/addStackButton";
import ProjectInfo from "./interface/project_info.interface";
import fetchProjectInfo from "./service/fetchProjectInfo";
import ProjectInfoProps from "./interface/props/projectInfo.props";
import ProjectInfoBottomContainer from "./style/projectInfoBottom.css";
import Issue from "./interface/issue.interface";
import IssueList from "./item/issueList";

const ProjectInfoComponent: React.FC<ProjectInfoProps> = ({ project_name }) => {
  const [memberData, setMemberData] = useState([]);
  const [projectStack, setProjectStack] = useState([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  useEffect(() => {
    fetchProjectInfo(project_name, setMemberData, setProjectStack);
  }, [project_name]);

  return (
    <div className={ProjectInfoSection}>
      <div className={MemeberContainer}>
        <MemberInfoItem memberData={memberData}></MemberInfoItem>
      </div>
      <div className={ProjectInfoContainer}>
        <ProjectInfoItem
          project_name={project_name}
          projectStack={projectStack}
        ></ProjectInfoItem>
        <div className={ProjectInfoBottomContainer}>
          <AddStackButton setProjectStack={setProjectStack}></AddStackButton>
          <div>
            <IssueList issues={issues}></IssueList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoComponent;
