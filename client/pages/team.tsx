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

  // 팀 정보 전송 함수
  const fetchTeam = async () => {
    try {
      const response = await fetch("http://localhost:3001/team/create", {
        // URL 수정
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName,
          leader: selectedLeader,
          members: selectedMembers,
          description:
            (document.getElementById("teamDescription") as HTMLTextAreaElement)
              ?.value || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Team successfully created:", result);
      alert("팀이 성공적으로 생성되었습니다!");
    } catch (error) {
      console.error("Failed to create team:", error);
      alert("팀 생성에 실패했습니다.");
    }
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
      <button onClick={fetchTeam}>전송</button>
    </div>
  );
};

export default Team;
