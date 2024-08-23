import { useState } from "react";
import * as styles from "../../styles/sideproject/sideproject.css";
import Side from "client/components/userMainPage/basicDesign/userLeftContent";
import { useEffect } from "react";
import ProjectTableComponent from "client/components/project_table/project_table";
import getProjectData from "client/components/project_table/service/fetchGetProjectData";
import {
  ResponseProject,
  ResponseProject_WithTeam,
} from "client/components/project_table/interface/project.interface";
import CreateProjectModal from "../modal/createProject_Modal/createProject.modal";
import {
  pagemaincontainer,
  pagemainmain,
  pagemaintext,
} from "client/styles/team/teampage.css";

const ProjectView: React.FC = () => {
  const [data, setData] = useState<ResponseProject_WithTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const projectData = await getProjectData();
      setData(projectData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProjectCreation = async () => {
    await fetchData();
  };

  return (
    <div className={pagemainmain}>
      <div className={pagemaincontainer}>
        <div className={pagemaintext}>프로젝트 조회</div>
        <CreateProjectModal onProjectCreated={handleProjectCreation} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ProjectTableComponent data={data} />
        )}
      </div>
    </div>
  );
};

export default ProjectView;
