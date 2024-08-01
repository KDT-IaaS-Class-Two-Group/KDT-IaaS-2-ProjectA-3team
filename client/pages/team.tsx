import React, { useState } from "react";
const Team: React.FC = () => {
  return (
    <div>
      <div>
        <label htmlFor="teamName">팀 이름:</label>
        <input type="text" id="teamName" name="teamName" />
      </div>
      <div>팀장 : </div>
      <div>
        <ul></ul>
      </div>
      <div>팀원 : </div>
      <div>
        <ul></ul>
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
