import React, { useState } from "react";
const Team: React.FC = () => {
  const [teamLeader, setTeamLeader] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  /**
   * * Function : insertTeam
   * 작성자 : @dalramjwi / 2024-08-01
   * 편집자 : @dalramjwi / 2024-08-01
   * Issue :
   * @function insertTeam
   * @description
   * ?li 요소를 클릭했을 때 호출되며 클릭된 요소의 텍스트 값을 가져와 팀장 또는 팀원 목록에 추가하는 역할
   * @param e: React.MouseEvent<HTMLLIElement>
   * @param type: leader | member
   */
  const insertTeam = (
    e: React.MouseEvent<HTMLLIElement>,
    type: "leader" | "member",
  ) => {
    const member = e.currentTarget.textContent || "";
    if (type === "leader") {
      setTeamLeader(member);
    } else if (type === "member") {
      if (!teamMembers.includes(member)) {
        setTeamMembers([...teamMembers, member]);
      }
    }
  };
  /**
   * * Function : deleteTeam
   * 작성자 : @dalramjwi / 2024-08-01
   * 편집자 : @dalramjwi / 2024-08-01
   * Issue :
   * @function deleteTeam
   * @description
   * ?선택된 팀장을 초기화하거나 선택된 팀원을 목록에서 제거하는 역할
   * @param member: string
   * @param type: leader | member
   */
  const deleteTeam = (member: string, type: "leader" | "member") => {
    if (type === "leader" && teamLeader === member) {
      setTeamLeader("");
    } else if (type === "member") {
      setTeamMembers(teamMembers.filter((m) => m !== member));
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="teamName">팀 이름:</label>
        <input type="text" id="teamName" name="teamName" />
      </div>
      <div>팀장 : {teamLeader}</div>
      <div>
        <ul>
          <li onClick={(e) => insertTeam(e, "leader")}>팀장1</li>
          <li onClick={(e) => insertTeam(e, "leader")}>팀장2</li>
        </ul>
      </div>
      <div>팀원 : </div>
      <div>
        <ul>
          <li onClick={(e) => insertTeam(e, "member")}>팀원1</li>
          <li onClick={(e) => insertTeam(e, "member")}>팀원2</li>
        </ul>
      </div>

      <div>
        <label htmlFor="teamDescription">팀 특징 서술:</label>
        <textarea id="teamDescription" name="teamDescription"></textarea>
      </div>
      <button>전송</button>
    </div>
  );
};

export default Team;
