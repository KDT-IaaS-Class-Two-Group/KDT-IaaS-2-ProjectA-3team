import React from "react";

const Team: React.FC = () => {
  return (
    <div>
      <div>
        <label htmlFor="teamName">팀 이름:</label>
        <input type="text" id="teamName" name="teamName" />
      </div>

      <div>
        <label htmlFor="teamLeader">팀장 선택:</label>
        <select id="teamLeader" name="teamLeader">
          <option value="">팀장 선택</option>
          <option value="leader1">팀장 1</option>
          <option value="leader2">팀장 2</option>
        </select>
      </div>

      <div>
        <label htmlFor="teamMembers">팀원 선택:</label>
        <select id="teamMembers" name="teamMembers" multiple>
          <option value="member1">팀원 1</option>
          <option value="member2">팀원 2</option>
        </select>
      </div>

      <div>
        <label htmlFor="teamDescription">팀 특징 서술:</label>
        <textarea id="teamDescription" name="teamDescription"></textarea>
      </div>
    </div>
  );
};

export default Team;
