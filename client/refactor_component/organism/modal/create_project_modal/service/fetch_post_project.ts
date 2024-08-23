import Project from "client/ts/Interface/project.interface";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { projectMeta } from "./project_meta";

export const fetchProjectData = async (projectData: Project) => {
  const response = await fetch(REQUEST_URL.__CREATE_PROJECT, projectMeta(projectData));
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}