// pages/team.tsx
import React, { useState, useEffect } from "react";

// 팀장과 팀원 인터페이스
interface User {
  id: number;
  name: string;
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
        const response = await fetch("/api/getUser/all");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    fetchUsers();
  }, []);

  // 팀장 추가 함수
  const addLeader = (user: User) => {
    setSelectedLeader(user);
  };

  // 팀장 삭제 함수
  const removeLeader = () => {
    setSelectedLeader(null);
  };

  // 팀원 추가 함수
  const addMember = (user: User) => {
    setSelectedMembers((prev) => [...prev, user]);
  };

  // 팀원 삭제 함수
  const removeMember = (user: User) => {
    setSelectedMembers((prev) =>
      prev.filter((member) => member.id !== user.id),
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

      <div>팀장 : {selectedLeader ? selectedLeader.name : "없음"}</div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => addLeader(user)}>추가</button>
              {selectedLeader && selectedLeader.id === user.id && (
                <button onClick={removeLeader}>삭제</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        팀원 :{" "}
        {selectedMembers.map((member) => member.name).join(", ") || "없음"}
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => addMember(user)}>추가</button>
              {selectedMembers.some((member) => member.id === user.id) && (
                <button onClick={() => removeMember(user)}>삭제</button>
              )}
            </li>
          ))}
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
