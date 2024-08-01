import React from "react";

const Team: React.FC = () => {
  return (
    <div>
      <div>
        <label htmlFor="teamName">팀 이름:</label>
        <input type="text" id="teamName" name="teamName" />
      </div>
<div>팀장 : </div>
      <div>
        <li onClick={이 리스트의 text를 팀장 div에 list 형식으로 삽입}>팀장1</li>
        <li>팀장2</li>
      </div>
      <div>팀원 : </div>

      <div>
        <lionClick={이 리스트의 text를 팀원 div에 list 형식으로 삽입}>팀원1</lionClick=>
        <li>팀원2</li>
      </div>

      <div>
        <label htmlFor="teamDescription">팀 특징 서술:</label>
        <textarea id="teamDescription" name="teamDescription"></textarea>
      </div>
      <div>추가</div>
      <div>삭제</div>
      <button>전송</button>
    </div>
  );
};

export default Team;
