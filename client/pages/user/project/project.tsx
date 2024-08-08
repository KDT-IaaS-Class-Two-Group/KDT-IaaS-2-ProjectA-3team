import { useState } from "react";
import * as style from "client/styles/project/root.css";
import Side from "client/components/userMainPage/userLeftContent";
import CreateProjectModal from "client/components/modal/createProject_Modal/createProject.modal";
import REQUEST_URL from "client/ts/enum/REQUEST_URL.ENUM";
import { useEffect } from "react";
import ProjectTableComponent from "client/components/project_table/project_table";
import getProjectData from "client/components/project_table/service/fetchGetProjectData";
import { ResponseProject } from "client/components/project_table/interface/project.interface";

const ProjectView: React.FC = () => {
  const [data, setData] = useState<ResponseProject[]>([]);
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
    <div className={style.root}>
      <Side />
      <div>
        <h1>프로젝트 View</h1>
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
