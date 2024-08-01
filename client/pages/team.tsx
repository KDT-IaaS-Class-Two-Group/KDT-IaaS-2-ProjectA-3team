import React from "react";

function insertTeam() {
  //e.value가 li jsx로 만들어져서 상단 상태 팀장에 추가
}

function deleteTeam() {
  //e.value가 li jsx로 만들어져서 li를 ��제
}
const Team: React.FC = () => {
  return (
    <div>
      <div>
        <label htmlFor="teamName">팀 이름:</label>
        <input type="text" id="teamName" name="teamName" />
      </div>
      <div>팀장 : </div>
      <div>
        <li onClick={insertTeam}>팀장1</li>
        <li onClick={insertTeam}>팀장2</li>
      </div>
      <div>팀원 : </div>
      <div>
        <li onClick={insertTeam}>팀원1</li>
        <li onClick={insertTeam}>팀원2</li>
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
