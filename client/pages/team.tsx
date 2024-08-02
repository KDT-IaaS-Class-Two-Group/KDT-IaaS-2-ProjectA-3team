import React, { useState, useEffect } from "react";

// 팀장과 팀원 인터페이스
interface User {
  user_id: string;
  username: string;
}

const Team: React.FC = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<User | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);

  // 서버에서 팀장과 팀원 목록을 가져오는 함수
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3001/getUser/all");
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    fetchUsers();
  }, []);

  // 팀장 추가 함수
  const addLeader = (user: User) => {
    console.log("Adding leader:", user);
    setSelectedLeader(user);
  };

  // 팀장 삭제 함수
  const removeLeader = () => {
    setSelectedLeader(null);
  };

  // 팀원 추가 함수
  const addMember = (user: User) => {
    console.log("Adding member:", user);
    setSelectedMembers((prev) => [...prev, user]);
  };

  // 팀원 삭제 함수
  const removeMember = (user: User) => {
    setSelectedMembers((prev) =>
      prev.filter((member) => member.user_id !== user.user_id)
    );
  };

  return (
    <div>
      <div>
        <label htmlFor="teamName">팀 이름:</label>
        <input
          type="text"
          id="teamName"
          name="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>

      <div>팀장 : {selectedLeader ? selectedLeader.username : "없음"}</div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <strong>이름:</strong> {user.username}
              <button onClick={() => addLeader(user)}>추가</button>
              {selectedLeader && selectedLeader.user_id === user.user_id && (
                <button onClick={removeLeader}>삭제</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        팀원 :{" "}
        {selectedMembers.map((member) => member.username).join(", ") || "없음"}
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              {user.username}
              <button onClick={() => addMember(user)}>추가</button>
              {selectedMembers.some(
                (member) => member.user_id === user.user_id
              ) && <button onClick={() => removeMember(user)}>삭제</button>}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label htmlFor="teamDescription">팀 특징 서술:</label>
        <textarea id="teamDescription" name="teamDescription"></textarea>
      </div>
      <button onClick={fetchTeam()}>전송</button>
    </div>
  );
};
function fetchTeam() {
  // try {
  //   const response = await fetch("http://localhost:3001/getUser/all");
  //   const data = await response.json();
  //   console.log(data);
  //   setUsers(data);
  // } catch (error) {
  //   console.error("Failed to fetch users:", error);
  // }
}
export default Team;
