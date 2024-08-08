import React from "react";

interface ProjectProps {
  projectName: string;
  necessaryPeriod: string;
  team: string;
}

const Project: React.FC<ProjectProps> = ({
  projectName,
  necessaryPeriod,
  team,
}) => {
  return (
    <div>
      <div>
        <p>project</p>
        <button>크게 보기</button>
      </div>
      <div>
        <p>{projectName}</p>
        <p>{necessaryPeriod}</p>
        <p>{team}</p>
      </div>
      <div>{/* 프로젝트 하나씩 나오게 */}</div>
    </div>
  );
};

export default Project;
