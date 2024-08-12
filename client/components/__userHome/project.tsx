import { SessionData } from "client/ts/Interface/SessionData.interface";
import { ProjectCheckProps } from "./interface/props/ProjectCheckProps.interface";
import { useEffect } from "react";
import fetchCheckProject from "./service/fetchCheckProject";
import { useRouter } from "next/router";

const ProjectCheckComponent: React.FC<ProjectCheckProps> = ({
  sessionData,
}) => {

  useEffect(()=>{
    fetchCheckProject(sessionData?.user_id);
  })
  return <div>야호</div>;
};

export default ProjectCheckComponent;