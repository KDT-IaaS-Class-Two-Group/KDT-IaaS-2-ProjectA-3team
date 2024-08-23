// src/components/molecule/teamList/TeamList.tsx
import React from "react";
import TeamListItem from "./team_li";

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
