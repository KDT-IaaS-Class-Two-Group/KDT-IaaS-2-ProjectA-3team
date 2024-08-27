// templates/ProjectCheckPage.tsx
import React, { useEffect, useState } from "react";
import fetchCheckProject from "../../organism/projectList/service/fetch_check_project";
import ProjectList from "../../organism/projectList/project_list";
import  ProjectData  from "../../atom/date/props/date.props";
import  ProjectCheckPageProps  from "../../organism/projectList/props/project_session.props"; // Organism에서 인터페이스 가져오기

const ProjectCheckPage: React.FC<ProjectCheckPageProps> = ({
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
    <div>
      <ProjectList projects={projectData} onMenuItemClick={onMenuItemClick} />
      
    </div>
  );
};

export default ProjectCheckPage;
