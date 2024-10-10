import { Project } from "../interface/ProjectData.interface";

export const POST_PROJECT_META = (projectData: Project) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials,
    body: JSON.stringify(projectData), // 이 부분이 서버에서 처리 가능한 데이터 형식인지 확인
  };
};
