import { useEffect, useState } from "react";
import MemberInfoItem from "./item/membeList";
import ProjectInfoItem from "./item/projectContent";
import { MemberList } from "./style/memberList.css";
import { ProjectInfoSection } from "./style/projectInfoSection.css";
import { MemeberContainer } from "./style/memberListContainer.css";
import {
  ListContainer,
  ProjectHeaderContainer,
  ProjectInfoContainer,
} from "./style/projectInfoContainer.css";
import AddStackButton from "./item/addStackButton";
import ProjectInfo from "./interface/project_info.interface";
import fetchProjectInfo from "./service/fetchProjectInfo";
import ProjectInfoProps from "./interface/props/projectInfo.props";
import ProjectInfoBottomContainer from "./style/projectInfoBottom.css";
import Issue from "./interface/issue.interface";
import IssueList from "./item/issueList";
import { StackResult } from "./interface/stackResult.interface";
// import IssueComponent from "../issue/issue";
import IssueComponent from "client/refactor_component/template/issue/issue_item";

const ProjectInfoComponent: React.FC<ProjectInfoProps> = ({ project_name }) => {
  const [memberData, setMemberData] = useState([]);
  const [projectStack, setProjectStack] = useState<StackResult[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchProjectInfo(project_name);
        if (res !== undefined) {
          await setMemberData(res.member);
          await setProjectStack(res.stack);
        }
      } catch (error) {
        console.error("프로젝트 동기 실패:", error);
      }
    };

    loadData();
  }, [project_name, isOpen]);

  return (
    <div className={ProjectInfoSection}>
      <div className={MemeberContainer}>
        <MemberInfoItem memberData={memberData}></MemberInfoItem>
      </div>

      <div className={ProjectInfoContainer}>
        <div className={ProjectHeaderContainer}>
          <h1>{project_name}</h1>
        </div>

        <div className={ProjectInfoBottomContainer}>
          <div className={ListContainer}>
            <AddStackButton
              stack={projectStack}
              setProjectStack={setProjectStack}
              project_name={project_name}
              onClose={onClose}
              onOpen={onOpen}
              isOpen={isOpen}
            ></AddStackButton>
            {projectStack.map((stack, index) => {
              return <p>{stack.stack_name}</p>;
            })}
          </div>

          <div>
            <IssueComponent project_name={project_name}></IssueComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoComponent;
