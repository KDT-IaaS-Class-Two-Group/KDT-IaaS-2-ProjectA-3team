import React, { useState, useEffect } from "react";
import getProjectData from "client/components/project_table/service/fetchGetProjectData";
import {
  projectHeader,
  projectTitle,
  proceedingButton,
  participantAvatars,
  participantAvatar,
  allTasksContainer,
  allTasksButton,
  dropdownButton,
  externalLinkButton,
} from "../../../styles/admin/admindashboard.css";
import {
  projectitletext,
  projectTable,
  projectTableCell,
  projectTableHeader,
  projectTableRow,
} from "client/styles/admin/project/project.css";

const Project: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjectData(); // 서버에서 프로젝트 데이터를 가져옵니다.
        setProjects(data.slice(0, 5)); // 상위 5개의 프로젝트만 가져옵니다.
      } catch (error) {
        console.error("Failed to fetch projects:", error); // 에러가 발생할 경우 콘솔에 출력합니다.
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateProgress = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = now.getTime() - startDate.getTime();
    return `${Math.min((elapsedDuration / totalDuration) * 100, 100).toFixed(0)}%`;
  };

  return (
    <div>
      <table className={projectTable}>
        <thead>
          <tr>
            <th className={projectTableHeader}>#</th>
            <th className={projectTableHeader}>Team Name</th>
            <th className={projectTableHeader}>Project Name</th>
            <th className={projectTableHeader}>Period</th>
            <th className={projectTableHeader}>Progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <tr key={index} className={projectTableRow}>
                <td className={projectTableCell}>{index + 1}</td>
                <td className={projectTableCell}>
                  {project.team_name || "N/A"}
                </td>
                <td className={projectTableCell}>{project.project_name}</td>
                <td className={projectTableCell}>
                  {`${formatDate(project.project_start_date)} - ${formatDate(project.project_end_date)}`}
                </td>
                <td className={projectTableCell}>
                  {calculateProgress(
                    project.project_start_date,
                    project.project_end_date
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={projectTableCell}>
                No projects available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Project;
