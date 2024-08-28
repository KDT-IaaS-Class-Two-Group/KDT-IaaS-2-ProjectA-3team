import React, { useEffect, useState } from "react";
import ProjectGroup from "client/refactor_component/organism/projectList/project_list";
import ProjectInfoComponent from "client/components/project_info/project_info";
import fetchCheckProject from "client/refactor_component/organism/projectList/service/fetch_check_project";
import {
  pagemainmain,
} from "client/styles/team/teampage.css";
import { ProjectData } from "client/refactor_component/organism/projectList/service/fetch_check_project";

interface ProjectTemplateProps {
  onMenuItemClick: (component: React.ReactNode) => void;
  sessionData: {
    user_id: string;
    role_name: string;
  } | null;
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ sessionData, onMenuItemClick }) => {
  const [projectData, setProjectData] = useState<ProjectData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (sessionData?.user_id) {
        await fetchCheckProject(sessionData.user_id, setProjectData);
      }
    };

    loadData();
  }, [sessionData?.user_id]);

  // 팀 이름을 기준으로 프로젝트를 그룹화합니다.
  const groupedProjects = projectData.reduce((acc, project) => {
    const { team_name } = project;
    if (!acc[team_name]) {
      acc[team_name] = [];
    }
    acc[team_name].push(project);
    return acc;
  }, {} as Record<string, ProjectData[]>);

  return (
    <div className={pagemainmain}>
      {Object.entries(groupedProjects).map(([teamName, projects]) => (
        <ProjectGroup
          key={teamName} // 팀 이름을 키로 사용합니다.
          projectGroup={projects} // 프로젝트 배열을 넘깁니다.
          onClick={(item) =>
            onMenuItemClick(<ProjectInfoComponent project_name={item.project_name} />)
          }
        />
      ))}
    </div>
  );
};

export default ProjectTemplate;
