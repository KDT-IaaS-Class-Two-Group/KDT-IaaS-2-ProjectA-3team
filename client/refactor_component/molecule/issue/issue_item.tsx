/**
 * @file issue_item.tsx
 * @brief 이슈 항목 컴포넌트
 * @details 이 컴포넌트는 개별 이슈의 정보를 표시하는 컴포넌트이다.
 *          `Issue` 인터페이스로 정의된 이슈 객체를 받아서, 관련 정보를 HTML 요소로 렌더링한다.
 *          스타일은 외부 CSS 모듈을 통해 적용된다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import React from "react";
import { Issue } from "./props/issue.interface";
import { IssueContainer } from "client/components/project_info/style/projectInfoContainer.css";

interface IssueItemProps {
  issue: Issue; // 표시할 이슈 정보 객체
}

/**
 * @brief 이슈 항목 컴포넌트
 * @details `issue` 속성으로 전달된 이슈 정보를 화면에 표시하는 컴포넌트이다.
 *          이 컴포넌트는 이슈의 이름, 상태, 프로젝트 이름, 사용자 ID를 렌더링하며, 스타일은 외부 CSS 모듈을 통해 제공된다.
 * @param {IssueItemProps} props 표시할 이슈 정보를 포함하는 속성
 * @return 이슈 정보를 포함한 JSX 요소
 */
const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  return (
    <div key={issue.issue_id} className={IssueContainer}>
      <h2>{issue.issue_name.value}</h2> {/* 이슈 이름 */}
      <p>Status: {issue.status.value}</p> {/* 이슈 상태 */}
      <p>Project: {issue.project_name.value}</p> {/* 프로젝트 이름 */}
      <p>User ID: {issue.user_id || "N/A"}</p>{" "}
      {/* 사용자 ID, 없는 경우 "N/A" 표시 */}
    </div>
  );
};

export default IssueItem;
