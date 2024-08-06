import React, { useState, useEffect } from "react";

interface User {
  user_id: string;
}

function UserSelection() {
  const [teamName, setTeamName] = useState<string>("");
  const [leaders, setLeaders] = useState<User[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<User | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [teamDescription, setTeamDescription] = useState<string>("");

  useEffect(() => {
    const fetchLeadersAndMembers = async () => {
      try {
        const [leadersResponse, membersResponse] = await Promise.all([
          fetch("http://localhost:3001/getUser/leaders"),
          fetch("http://localhost:3001/getUser/members"),
        ]);

        const leadersData = await leadersResponse.json();
        const membersData = await membersResponse.json();

        console.log("Leaders:", leadersData); // 데이터 확인
        console.log("Members:", membersData); // 데이터 확인

        setLeaders(leadersData);
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchLeadersAndMembers();
  }, []);

  const addLeader = (user: User) => {
    setSelectedLeader(user);
  };

  const removeLeader = () => {
    setSelectedLeader(null);
  };

  const addMember = (user: User) => {
    if (!selectedMembers.some((member) => member.user_id === user.user_id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
  };

  const removeMember = (user: User) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.user_id !== user.user_id)
    );
  };

  const fetchTeam = async () => {
    const teamData = {
      team_name: teamName,
      description: teamDescription,
      teamLeader: selectedLeader
        ? {
            user_id: selectedLeader.user_id,
          }
        : null,
      teamMembers: selectedMembers.map((member) => ({
        user_id: member.user_id,
      })),
    };

    try {
      const response = await fetch("http://localhost:3001/getUser/saveTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      const result = await response.json();
      console.log(result.message || "팀 정보 저장 성공");
    } catch (error) {
      console.error("Error saving team data:", error);
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

      <div>팀장: {selectedLeader ? selectedLeader.user_id : "없음"}</div>
      <div>
        <ul>
          {leaders.map((user) => (
            <li key={user.user_id}>
              <strong>ID:</strong> {user.user_id}
              <button onClick={() => addLeader(user)}>추가</button>
              {selectedLeader && selectedLeader.user_id === user.user_id && (
                <button onClick={removeLeader}>삭제</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        팀원:{" "}
        {selectedMembers.map((member) => member.user_id).join(", ") || "없음"}
      </div>
      <div>
        <ul>
          {members.map((user) => (
            <li key={user.user_id}>
              {user.user_id}
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
        <textarea
          id="teamDescription"
          name="teamDescription"
          value={teamDescription}
          onChange={(e) => setTeamDescription(e.target.value)}
        />
      </div>
      <button onClick={fetchTeam}>전송</button>
    </div>
  );
}

export default UserSelection;
