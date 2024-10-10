import { Dispatch, SetStateAction, Key, useEffect, useState } from "react";
import fetchCheckProject from "./service/fetchCheckProject";
import { ProjectCheckProps } from "./interface/props/ProjectCheckProps.interface";
import Link from "next/link";
import ProjectView from "../project/info";
import ProjectTestComponent from "../project/project_info.component";
import {
  pagemaincontainer,
  pagemainmain,
} from "client/styles/team/teampage.css";
import { HeaderContainer, itemContainer } from "./style/itemStyle.css";
import { formatDate } from "./service/formatDate";
import ProjectInfoComponent from "../project_info/project_info";
import { blueButton } from "client/styles/templatebutton.css";
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
