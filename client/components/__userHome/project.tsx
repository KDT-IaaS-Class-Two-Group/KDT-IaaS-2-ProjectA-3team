import { Dispatch, SetStateAction, Key, useEffect, useState } from "react";
import fetchCheckProject from "./service/fetchCheckProject";
import { ProjectCheckProps } from "./interface/props/ProjectCheckProps.interface";
import Link from "next/link";
export interface ProjectData {
  project_id: number;
  project_name: string;
  project_start_date: string;
  project_end_date: string; 
  team_name: string;
}



const ProjectCheckComponent: React.FC<ProjectCheckProps> = ({
  sessionData,
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
      {projectData.map((projectGroup, index) => (
        <div key={index}>
          {Object.values(projectGroup).flat().map((item : ProjectData, subIndex) => (
            <div key={subIndex}>
              <Link href={`/user/[id].tsx`} as={`${item.project_name}`}><h1>{item.project_name}</h1></Link>
              <h2>{item.team_name}</h2>
              <p>{item.project_start_date} / {item.project_end_date}</p>
              <p>-----------------</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectCheckComponent;
