// src/components/organism/projectSetTeam/ProjectSetTeam.tsx
import React, { useState, useEffect } from "react";
import { bold32Text } from "client/styles/standardtextsize.css";
import { flexrowcontainer } from "client/styles/standardcontainer.css";
import Button from "client/refactor_component/atom/button/button";

import { Dispatch, SetStateAction } from "react";
import fetchTeamList from "../../service/fetch_get_team";
import TeamList from "client/refactor_component/molecule/team_list/team_list";

export interface ProjectSetTeamProps {
  handleNext: () => void;
  setTeam: Dispatch<SetStateAction<string>>;
  team: string;
}

const ProjectSetTeam: React.FC<ProjectSetTeamProps> = ({
  handleNext,
  setTeam,
  team,
}) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTeamList();
        setData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className={bold32Text}>팀 할당</div>
      <TeamList teams={data} onSelectTeam={setTeam} />
      <div className={flexrowcontainer}>
        <div className="">현재 선택된 팀 : {team}</div>
        <Button button_text="다음" button_style="" onClick={handleNext} />
      </div>
    </div>
  );
};

export default ProjectSetTeam;
