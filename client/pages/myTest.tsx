import ProjectInfoComponent from "client/components/project_info/project_info";
import { useState } from "react";
const MyTest: React.FC = () => {
  return (
    <div>
      <ProjectInfoComponent project_name="MyProjectTest" />
    </div>
  );
};

export default MyTest;
