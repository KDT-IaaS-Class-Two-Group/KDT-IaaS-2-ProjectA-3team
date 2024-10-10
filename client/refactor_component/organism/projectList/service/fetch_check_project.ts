import { Dispatch, SetStateAction } from "react";
export interface ProjectData {
  project_id: number;
  project_name: string;
  project_start_date: string;
  project_end_date: string;
  team_name: string;
}
const fetchCheckProject = async (
  id: string | string[] | undefined,
  setProjectData: Dispatch<SetStateAction<ProjectData[]>>
) => {
  const response = await fetch(`http://localhost:3001/project/check/${id}`);
  const data = await response.json();
  setProjectData(data);
};

export default fetchCheckProject;
