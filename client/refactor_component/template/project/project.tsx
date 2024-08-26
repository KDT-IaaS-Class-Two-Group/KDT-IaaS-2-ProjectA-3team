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
} from "client/styles/admin/project/project.css";
import { formatDate } from "../../organism/project/utils/date_utils";
import { calculateProgress } from "../../organism/project/utils/progressUtils";

/**
 * @function Project
 * @brief 프로젝트 목록을 표시하는 컴포넌트
 * @description 이 컴포넌트는 서버에서 프로젝트 데이터를 가져와 상위 5개의 프로젝트를 테이블 형식으로 표시합니다. 각 프로젝트는 팀 이름, 프로젝트 이름, 기간, 그리고 진행 상황을 포함합니다.
 *
 * @author @zoeznm
 * @date 2024-08-25
 *
 * @component
 * @returns {JSX.Element} 프로젝트 목록을 포함하는 JSX 엘리먼트
 *
 * @example
 * // Project 컴포넌트를 렌더링하는 예제
 * <Project />
 */
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
              <tr key={index}>
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
