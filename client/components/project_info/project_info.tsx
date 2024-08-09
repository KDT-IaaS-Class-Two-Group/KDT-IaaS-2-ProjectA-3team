import { useEffect, useState } from "react";

interface props {
  project_name : string
}
const ProjectInfoComponent: React.FC<props> = ({project_name}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/project/getTeamMember/${project_name}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const res_data = await res.json();
        console.log(res_data)
        setData(res_data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <p></p>
    </div>
  );
};

export default ProjectInfoComponent;
