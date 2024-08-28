/**
 * @file TeamList.tsx
 * @brief 팀 목록 컴포넌트 파일
 * @details 이 파일은 팀 목록을 표시하는 `TeamList` 컴포넌트를 정의한다.
 *          `TeamList` 컴포넌트는 팀 목록을 받아서 각각의 팀을 `TeamListItem` 컴포넌트를 통해 표시하며,
 *          팀 선택 시 호출되는 함수도 제공한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import React from "react";
import TeamListItem from "./team_list_item"; // 팀 목록 아이템 컴포넌트 가져오기

/**
 * @brief 팀 목록 컴포넌트
 * @details 팀 목록을 받아서 `TeamListItem` 컴포넌트를 통해 각 팀을 표시하고,
 *          팀을 선택할 수 있는 기능을 제공하는 컴포넌트이다.
 * @param {TeamListProps} props - 컴포넌트에 전달되는 속성들
 * @param {any[]} props.teams - 팀 목록을 포함하는 배열
 * @param {(team_name: string) => void} props.onSelectTeam - 팀을 선택할 때 호출되는 함수
 * @return {JSX.Element} 팀 목록을 표시하는 JSX 요소
 */
export interface TeamListProps {
  teams: any[];
  onSelectTeam: (team_name: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onSelectTeam }) => {
  return (
    <ul>
      {teams.map((team: any, index: number) => (
        <TeamListItem
          key={index}
          team_name={team.team_name}
          description={team.description}
          onSelect={() => onSelectTeam(team.team_name)}
        />
      ))}
    </ul>
  );
};

export default TeamList;
