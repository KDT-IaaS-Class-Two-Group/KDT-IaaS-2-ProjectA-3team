import { Project } from "../interface/ProjectData.interface"
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import { POST_PROJECT_META } from "../config/POST_PROJECT_META";

export const fetchProjectData = async (projectData : Project) => {
  const response = await fetch(REQUEST_URL.__CREATE_PROJECT, POST_PROJECT_META(projectData)); 
  if (response.status === 200){ 
    return true;
  }else{
    return false;
  }
}