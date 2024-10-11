import { useEffect, useState } from "react";
import {
  pagemaincontainer,
  pagemainmain,
} from "client/styles/team/teampage.css";
import ProjectInfoComponent from "../project_info/project_info";
import fetchCheckProject from "./service/fetchCheckProject";
import { ProjectCheckProps } from "./interface/props/ProjectCheckProps.interface";
import { HeaderContainer, itemContainer } from "./style/itemStyle.css";
import { formatDate } from "./service/formatDate";
export interface ProjectData {
  project_id: number;
  project_name: string;
  project_start_date: string;
  project_end_date: string;
  team_name: string;
}

const ProjectCheckComponent: React.FC<ProjectCheckProps> = ({
  sessionData,
  onMenuItemClick,
}) => {
  const [projectData, setProjectData] = useState<ProjectData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (sessionData?.user_id) {
        await fetchCheckProject(sessionData.user_id, setProjectData);
      }
    };

    loadData();
  }, [sessionData?.user_id]);

  return (
    <div className={pagemainmain}>
      {projectData.map((projectGroup, index) => (
        <div key={index} className={pagemaincontainer}>
          {Object.values(projectGroup)
            .flat()
            .map((item: ProjectData, subIndex) => (
              <div key={subIndex} className={itemContainer}>
                <h1
                  className={HeaderContainer}
                  onClick={() => {
                    onMenuItemClick(
                      <ProjectInfoComponent project_name={item.project_name} />
                    );
                  }}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="button" // 버튼 역할 추가
                  tabIndex={0} // 키보드 포커스 가능하게 설정
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onMenuItemClick(
                        <ProjectInfoComponent
                          project_name={item.project_name}
                        />
                      );
                    }
                  }}
                >
                  {item.project_name}
                </h1>
                <h2>Team | {item.team_name}</h2>
                <p>프로젝트 시작일 : {formatDate(item.project_start_date)}</p>
                <p>프로젝트 마감일 : {formatDate(item.project_end_date)}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectCheckComponent;
