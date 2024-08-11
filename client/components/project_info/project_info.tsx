import { useEffect, useState } from "react";
import MemberInfoItem from "./item/membeList";
import ProjectInfoItem from "./item/projectContent";
import { MemberList } from "./style/memberList.css";
import { ProjectInfoSection } from "./style/projectInfoSection.css";
import { MemeberContainer } from "./style/memberListContainer.css";
import { ProjectInfoContainer } from "./style/projectInfoContainer.css";
interface props {
  project_name: string;
}

const ProjectInfoComponent: React.FC<props> = ({ project_name }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/project/getTeamMember/${project_name}`
        );
        if (!res.ok) {
          throw new Error("Fetch ERROR - Response Failed");
        }
        const res_data = await res.json();
        setData(res_data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className={ProjectInfoSection}>
      <div className={MemeberContainer}>
        {data.map((value: { [key: string]: string }, index) => {
          return (
            <MemberInfoItem
              user_name={value.username}
              className={MemberList}
            ></MemberInfoItem>
          );
        })}
      </div>

      <div className={ProjectInfoContainer}>
        <ProjectInfoItem project_name={project_name}></ProjectInfoItem>
      </div>
    </div>
  );
};

export default ProjectInfoComponent;
