/**
 * @file project_info_component.tsx
 * @brief 프로젝트 정보 컴포넌트 파일
 * @details 이 파일은 특정 프로젝트의 정보를 표시하는 `ProjectInfoComponent`를 정의한다.
 *          이 컴포넌트는 프로젝트의 이름, 팀 이름, 시작일, 마감일 등을 렌더링하며,
 *          제목을 클릭하면 해당 프로젝트에 대한 추가 정보를 표시하는 이벤트 핸들러를 호출한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import React from "react";
import {
  itemContainer,
  HeaderContainer,
} from "client/refactor_component/atom/date/style/Data.css";
import { formatDate } from "client/refactor_component/atom/date/date";
import ProjectInfoProps from "./props/project.props";

/**
 * @brief 프로젝트 정보 컴포넌트
 * @details 프로젝트의 이름, 팀 이름, 시작일, 마감일을 표시하며,
 *          제목을 클릭하면 `onMenuItemClick` 핸들러를 통해 추가 정보를 표시한다.
 * @param {ProjectInfoProps} props 컴포넌트에 전달되는 속성들
 * @param {Object} props.project - 프로젝트 정보 객체
 * @param {string} props.project.project_name - 프로젝트 이름
 * @param {string} props.project.team_name - 팀 이름
 * @param {Date} props.project.project_start_date - 프로젝트 시작일
 * @param {Date} props.project.project_end_date - 프로젝트 마감일
 * @param {function} props.onMenuItemClick - 메뉴 아이템 클릭 시 호출되는 함수
 * @return {JSX.Element} 프로젝트 정보를 포함하는 JSX 요소
 */
const ProjectInfoComponent: React.FC<ProjectInfoProps> = ({
  project,
  onMenuItemClick,
}) => {
  return (
    <div className={itemContainer}>
      <h1
        className={HeaderContainer}
        onClick={() =>
          onMenuItemClick(
            <ProjectInfoComponent
              project={project}
              onMenuItemClick={onMenuItemClick}
            />
          )
        }
      >
        {project.project_name}
      </h1>
      <h2>Team | {project.team_name}</h2>
      <p>프로젝트 시작일: {formatDate(project.project_start_date)}</p>
      <p>프로젝트 마감일: {formatDate(project.project_end_date)}</p>
    </div>
  );
};

export default ProjectInfoComponent;
