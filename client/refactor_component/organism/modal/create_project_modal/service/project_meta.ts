import Project from "client/ts/Interface/project.interface"
export const projectMeta = (projectData: Project) => {
  return {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify(projectData)
  }
}