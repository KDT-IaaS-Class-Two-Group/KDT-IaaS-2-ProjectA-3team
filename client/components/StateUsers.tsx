import React from "react";

interface StateUsers {
  img: string;
  StateUsers: string;
  state: string;
}

const StateUsers: React.FC<StateUsers> = ({ img, StateUsers, state }) => {
  return (
    <div>
      <div>
        <p>Edit Requests</p>
        <button>크게 보기</button>
      </div>
      <div>
        <p>{img}</p>
        <p>{StateUsers}</p>
        <p>{state}</p>
      </div>
      <div>{/* 프로젝트 하나씩 나오게 */}</div>
    </div>
  );
};

export default StateUsers;
