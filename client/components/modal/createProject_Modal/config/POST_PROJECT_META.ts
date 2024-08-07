import { Project } from "../interface/ProjectData.interface"

export const POST_PROJECT_META = (projectData : Project)=>{
  return {
    method : "POST", 
    headers : {
      'Content-Type' : 'application/json'
    },
    credentials : 'include' as RequestCredentials,
    body : JSON.stringify(projectData)
  }
}