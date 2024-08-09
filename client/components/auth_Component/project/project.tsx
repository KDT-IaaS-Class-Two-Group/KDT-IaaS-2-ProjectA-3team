import React from "react";
import {
  projectHeader,
  projectTitle,
  proceedingButton,
  projectTable,
  projectTableHeader,
  projectTableRow,
  projectTableCell,
  participantAvatars,
  participantAvatar,
  allTasksContainer,
  allTasksButton,
  dropdownButton,
  externalLinkButton,
} from "client/styles/admin/dashboardStyles.css";

const Project: React.FC<{ projects: any[] }> = ({ projects }) => {
  const calculatePeriod = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `${daysDiff} days`;
  };

  const calculateProgress = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = now.getTime() - startDate.getTime();
    const progress = Math.min((elapsedDuration / totalDuration) * 100, 100);
    return `${Math.floor(progress)}%`;
  };

  return (
    <div>
      <div className={projectHeader}>
        <div className={projectTitle}>
          <span>project</span>
        </div>
      </div>
      <table className={projectTable}>
        <thead>
          <tr>
            <th className={projectTableHeader}>#</th>
            <th className={projectTableHeader}>project name</th>
            <th className={projectTableHeader}>necessary period</th>
            <th className={projectTableHeader}>participants</th>
            <th className={projectTableHeader}>progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className={projectTableRow}>
              <td className={projectTableCell}>{index + 1}</td>
              <td className={projectTableCell}>{project.project_name}</td>
              <td className={projectTableCell}>
                {calculatePeriod(
                  project.project_start_date,
                  project.project_end_date
                )}
              </td>
              <td className={projectTableCell}>
                <div className={participantAvatars}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className={participantAvatar}></div>
                  ))}
                </div>
              </td>
              <td className={projectTableCell}>
                {calculateProgress(
                  project.project_start_date,
                  project.project_end_date
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Project;
